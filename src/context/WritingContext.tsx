import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  ContentCategory,
  Draft,
  ImprovementAction,
  RewriteResult,
  Template,
  WritingLength,
  WritingTone
} from '../types';
import { aiService } from '../services/ai/AIService';
import { useSettings } from './SettingsContext';
import { useToast } from './ToastContext';
import { saveDraft, updateDraft } from '../services/storage/historyStorage';
import { CATEGORIES_DATA } from '../data/categoriesData';

interface WritingContextType {
  rawInput: string;
  setRawInput: (text: string) => void;
  category: ContentCategory;
  setCategory: (category: ContentCategory) => void;
  tone: WritingTone;
  setTone: (tone: WritingTone) => void;
  length: WritingLength;
  setLength: (length: WritingLength) => void;
  isGenerating: boolean;
  result: RewriteResult | null;
  editableContent: string;
  setEditableContent: (text: string) => void;
  selectedVariationId: string | null;
  activeDraftId: string | null;
  hashtags: string[];
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
  removeHashtag: (tag: string) => void;
  addHashtag: (tag: string) => void;

  // Actions
  generateContent: (inputOverride?: string) => Promise<void>;
  improveContent: (action: ImprovementAction) => Promise<void>;
  selectVariation: (variationId: string) => void;
  resetWorkspace: () => void;
  saveCurrentDraft: () => Draft | null;
  loadDraft: (draft: Draft) => void;
  loadTemplate: (template: Template) => void;
  applySampleInput: () => void;
}

const WritingContext = createContext<WritingContextType | undefined>(undefined);

export const WritingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useSettings();
  const { success, error, info } = useToast();

  const [rawInput, setRawInput] = useState<string>('');
  const [category, setCategoryState] = useState<ContentCategory>('linkedin-post');
  const [tone, setTone] = useState<WritingTone>(settings.defaultTone || 'professional');
  const [length, setLength] = useState<WritingLength>(settings.defaultLength || 'medium');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<RewriteResult | null>(null);
  const [editableContent, setEditableContent] = useState<string>('');
  const [selectedVariationId, setSelectedVariationId] = useState<string | null>(null);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);

  // Update defaults if settings change
  useEffect(() => {
    if (!result) {
      setTone(settings.defaultTone);
      setLength(settings.defaultLength);
    }
  }, [settings.defaultTone, settings.defaultLength, result]);

  const setCategory = useCallback((newCat: ContentCategory) => {
    setCategoryState(newCat);
    const catData = CATEGORIES_DATA[newCat];
    if (catData) {
      setTone(catData.defaultTone);
      setLength(catData.defaultLength);
    }
  }, []);

  const removeHashtag = useCallback((tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const addHashtag = useCallback((tag: string) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    setHashtags((prev) => (prev.includes(formatted) ? prev : [...prev, formatted]));
  }, []);

  const generateContent = useCallback(
    async (inputOverride?: string) => {
      const textToTransform = (inputOverride !== undefined ? inputOverride : rawInput).trim();
      if (!textToTransform) {
        info('Please enter some text or thoughts before generating.');
        return;
      }

      setIsGenerating(true);
      try {
        const res = await aiService.rewrite(textToTransform, {
          category,
          tone,
          length,
          includeHashtags: settings.autoIncludeHashtags,
          generateVariations: true
        });

        setResult(res);
        setEditableContent(res.content);
        setSelectedVariationId(null);
        setHashtags(res.hashtags);

        // Auto-save draft or update existing draft
        const draftTitle = textToTransform.slice(0, 40) + (textToTransform.length > 40 ? '...' : '');
        if (activeDraftId) {
          updateDraft(activeDraftId, {
            title: draftTitle,
            rawInput: textToTransform,
            generatedContent: res.content,
            category,
            tone,
            length,
            hashtags: res.hashtags,
            wordCount: res.wordCount
          });
        } else {
          const newDraft = saveDraft({
            title: draftTitle,
            rawInput: textToTransform,
            generatedContent: res.content,
            category,
            tone,
            length,
            hashtags: res.hashtags,
            wordCount: res.wordCount
          });
          setActiveDraftId(newDraft.id);
        }

        if (settings.autoCopyOnGenerate && navigator.clipboard) {
          navigator.clipboard.writeText(res.content);
          success('Generated & copied to clipboard!', 'Demonstration transformation applied.');
        } else {
          success('Professional LinkedIn post created!', 'Rule-based demonstration output ready.');
        }
      } catch (err) {
        console.error('Generation failed:', err);
        error('Failed to generate content. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    },
    [rawInput, category, tone, length, settings.autoIncludeHashtags, settings.autoCopyOnGenerate, activeDraftId, success, error, info]
  );

  const improveContent = useCallback(
    async (action: ImprovementAction) => {
      if (!editableContent.trim()) {
        info('No generated content to improve yet.');
        return;
      }

      setIsGenerating(true);
      try {
        const improved = await aiService.improve(editableContent, action, {
          category,
          tone,
          length
        });

        setEditableContent(improved);
        if (result) {
          setResult({
            ...result,
            content: improved,
            wordCount: improved.trim().split(/\s+/).filter(Boolean).length
          });
        }

        if (activeDraftId) {
          updateDraft(activeDraftId, {
            generatedContent: improved,
            wordCount: improved.trim().split(/\s+/).filter(Boolean).length
          });
        }

        const actionLabels: Record<ImprovementAction, string> = {
          rewrite: 'Regenerated',
          grammar: 'Grammar and punctuation cleaned',
          professional: 'Made more professional',
          natural: 'Made more natural and conversational',
          shorten: 'Shortened post',
          expand: 'Expanded with further insights'
        };
        success(actionLabels[action] || 'Post updated!');
      } catch (err) {
        console.error('Failed to improve content:', err);
        error('Failed to update content.');
      } finally {
        setIsGenerating(false);
      }
    },
    [editableContent, category, tone, length, result, activeDraftId, success, error, info]
  );

  const selectVariation = useCallback(
    (variationId: string) => {
      if (!result) return;
      const variation = result.variations.find((v) => v.id === variationId);
      if (variation) {
        setEditableContent(variation.content);
        setSelectedVariationId(variationId);
        success(`Applied "${variation.label}" variation to output.`);
      }
    },
    [result, success]
  );

  const resetWorkspace = useCallback(() => {
    setRawInput('');
    setResult(null);
    setEditableContent('');
    setSelectedVariationId(null);
    setActiveDraftId(null);
    setHashtags([]);
  }, []);

  const saveCurrentDraft = useCallback(() => {
    if (!editableContent && !rawInput) {
      info('Nothing to save as a draft yet.');
      return null;
    }

    const title = (rawInput || editableContent).slice(0, 45) + '...';
    const draft = saveDraft({
      title,
      rawInput,
      generatedContent: editableContent,
      category,
      tone,
      length,
      hashtags,
      wordCount: editableContent.trim().split(/\s+/).filter(Boolean).length
    });

    setActiveDraftId(draft.id);
    success('Draft saved to history!');
    return draft;
  }, [editableContent, rawInput, category, tone, length, hashtags, success, info]);

  const loadDraft = useCallback((draft: Draft) => {
    setRawInput(draft.rawInput);
    setCategoryState(draft.category);
    setTone(draft.tone);
    setLength(draft.length);
    setEditableContent(draft.generatedContent);
    setHashtags(draft.hashtags || []);
    setActiveDraftId(draft.id);
    setResult({
      content: draft.generatedContent,
      variations: [],
      hashtags: draft.hashtags || [],
      estimatedReadTime: `${Math.max(1, Math.ceil((draft.wordCount || 100) / 200))} min read`,
      wordCount: draft.wordCount || 0,
      characterCount: draft.generatedContent.length,
      engineUsed: 'Stored Draft',
      isMock: true,
      transformationNotes: ['Loaded saved draft from browser storage.']
    });
  }, []);

  const loadTemplate = useCallback(
    (template: Template) => {
      setRawInput(template.hinglishExample || template.promptTemplate);
      setCategory(template.category);
      setTone(template.defaultTone);
      setLength(template.defaultLength);
      setResult(null);
      setEditableContent('');
      setSelectedVariationId(null);
      setActiveDraftId(null);
      success(`Loaded template: "${template.title}"`);
    },
    [setCategory, success]
  );

  const applySampleInput = useCallback(() => {
    const catData = CATEGORIES_DATA[category];
    if (catData?.sampleInput) {
      setRawInput(catData.sampleInput);
      info('Inserted sample Hinglish input.');
    }
  }, [category, info]);

  return (
    <WritingContext.Provider
      value={{
        rawInput,
        setRawInput,
        category,
        setCategory,
        tone,
        setTone,
        length,
        setLength,
        isGenerating,
        result,
        editableContent,
        setEditableContent,
        selectedVariationId,
        activeDraftId,
        hashtags,
        setHashtags,
        removeHashtag,
        addHashtag,
        generateContent,
        improveContent,
        selectVariation,
        resetWorkspace,
        saveCurrentDraft,
        loadDraft,
        loadTemplate,
        applySampleInput
      }}
    >
      {children}
    </WritingContext.Provider>
  );
};

export const useWriting = () => {
  const context = useContext(WritingContext);
  if (!context) throw new Error('useWriting must be used within WritingProvider');
  return context;
};
