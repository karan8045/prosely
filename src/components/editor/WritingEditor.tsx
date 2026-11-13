import React, { useState } from 'react';
import { useWriting } from '../../context/WritingContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { Sparkles, Trash2, HelpCircle, FormInput, FileText } from 'lucide-react';
import { Button } from '../ui/Button';

export const WritingEditor: React.FC = () => {
  const {
    rawInput,
    setRawInput,
    category,
    applySampleInput
  } = useWriting();

  const [useStructuredMode, setUseStructuredMode] = useState(false);
  const [structuredFields, setStructuredFields] = useState<Record<string, string>>({});

  const catData = CATEGORIES_DATA[category];

  // Word and character counts
  const trimmed = rawInput.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charCount = rawInput.length;
  const estimatedReadingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleFieldChange = (fieldId: string, val: string) => {
    const updated = { ...structuredFields, [fieldId]: val };
    setStructuredFields(updated);

    // Compose back into rawInput for unified model processing
    const combined = Object.entries(updated)
      .filter(([_, v]) => v.trim())
      .map(([k, v]) => {
        const fieldMeta = catData?.fields?.find((f) => f.id === k);
        return `${fieldMeta?.label || k}: ${v}`;
      })
      .join('\n\n');
    setRawInput(combined);
  };

  return (
    <div className="bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] rounded-2xl shadow-card overflow-hidden flex flex-col transition-colors">
      {/* Editor Header Bar */}
      <div className="px-4 py-3 border-b border-[#E8EAF0] dark:border-[#292B33] flex items-center justify-between bg-[#F8F9FB]/50 dark:bg-[#101114]/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
            Raw Thoughts & Hinglish Notes
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF] font-medium hidden sm:inline">
            Accepts mixed language
          </span>
        </div>

        <div className="flex items-center gap-2">
          {catData?.fields && catData.fields.length > 0 && (
            <button
              onClick={() => setUseStructuredMode(!useStructuredMode)}
              className="text-xs text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] flex items-center gap-1 px-2 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Toggle guided question form"
            >
              {useStructuredMode ? (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Freeform Text</span>
                </>
              ) : (
                <>
                  <FormInput className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Guided Fields</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={applySampleInput}
            className="text-xs text-[#6558D3] dark:text-[#8B80FF] hover:underline flex items-center gap-1 font-medium px-2 py-1 rounded-md hover:bg-[#EEECFD]/50 dark:hover:bg-[#252342]/50 transition-colors"
            title="Load sample Hinglish content for this mode"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Hinglish</span>
          </button>

          {rawInput && (
            <button
              onClick={() => setRawInput('')}
              className="text-xs text-[#777D89] hover:text-rose-500 p-1 rounded-md transition-colors"
              title="Clear input"
              aria-label="Clear input"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 flex-1">
        {useStructuredMode && catData?.fields ? (
          <div className="space-y-3">
            {catData.fields.map((f) => (
              <div key={f.id} className="space-y-1">
                <label className="text-xs font-medium text-[#17191F] dark:text-[#F4F4F5] flex items-center gap-1.5">
                  <span>{f.label}</span>
                  {f.helper && (
                    <span className="text-[10px] text-[#777D89] dark:text-[#9699A5]">({f.helper})</span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={structuredFields[f.id] || ''}
                  onChange={(e) => handleFieldChange(f.id, e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB] dark:bg-[#101114] text-[#17191F] dark:text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
                />
              </div>
            ))}
          </div>
        ) : (
          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder={catData?.placeholder || 'Write your thoughts in Hinglish or rough English here...'}
            rows={8}
            className="w-full resize-none bg-transparent text-sm leading-relaxed text-[#17191F] dark:text-[#F4F4F5] placeholder-[#777D89]/60 dark:placeholder-[#9699A5]/60 focus:outline-none border-none p-0"
          />
        )}
      </div>

      {/* Editor Footer / Stats Bar */}
      <div className="px-4 py-2.5 border-t border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB]/30 dark:bg-[#101114]/30 flex items-center justify-between text-[11px] text-[#777D89] dark:text-[#9699A5]">
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
          {wordCount > 0 && (
            <>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">~{estimatedReadingTime} min read</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[10px]">Press ⌘+Enter to generate</span>
        </div>
      </div>
    </div>
  );
};
