import React, { useState } from 'react';
import { Eye, Edit3, Sparkles, Layers, Info, Check } from 'lucide-react';
import { useWriting } from '../../context/WritingContext';
import { LinkedInPreview } from './LinkedInPreview';
import { VariationCard } from './VariationCard';
import { HashtagPanel } from './HashtagPanel';
import { QuickActionsBar } from '../editor/QuickActionsBar';
import { EmptyState } from '../common/EmptyState';
import { LoadingState } from '../common/LoadingState';
import { cn } from '../../utils/cn';

export const OutputPanel: React.FC = () => {
  const {
    editableContent,
    setEditableContent,
    result,
    isGenerating,
    selectedVariationId,
    selectVariation,
    generateContent,
    applySampleInput
  } = useWriting();

  const [viewMode, setViewMode] = useState<'preview' | 'editor'>('preview');

  if (isGenerating) {
    return <LoadingState />;
  }

  if (!editableContent && !result) {
    return (
      <EmptyState
        title="Ready to Transform Your Thoughts"
        description="Write or paste your raw notes, Hinglish thoughts, or project details in the left editor, then click Generate to create a polished LinkedIn post."
        actionLabel="Insert Sample Hinglish"
        onAction={applySampleInput}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* View Switcher and Quick Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="inline-flex items-center p-0.5 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-white dark:bg-[#181A20] shadow-subtle shrink-0">
          <button
            onClick={() => setViewMode('preview')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              viewMode === 'preview'
                ? 'bg-[#6558D3] text-white dark:bg-[#8B80FF] dark:text-[#101114] shadow-subtle'
                : 'text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Feed Preview</span>
          </button>
          <button
            onClick={() => setViewMode('editor')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              viewMode === 'editor'
                ? 'bg-[#6558D3] text-white dark:bg-[#8B80FF] dark:text-[#101114] shadow-subtle'
                : 'text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
            )}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Output</span>
          </button>
        </div>

        {/* Engine and Word Count indicator */}
        <div className="flex items-center gap-2 text-[11px] text-[#777D89] dark:text-[#9699A5]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#6558D3] dark:text-[#8B80FF]" />
            <span>{result?.wordCount || editableContent.trim().split(/\s+/).filter(Boolean).length} words</span>
          </span>
          <span>•</span>
          <span className="truncate max-w-[200px]">{result?.engineUsed || 'Local Demonstration Engine'}</span>
        </div>
      </div>

      {/* Quick Polish Bar */}
      <QuickActionsBar />

      {/* Main View Area: Feed Preview vs Direct Editable Textarea */}
      {viewMode === 'preview' ? (
        <LinkedInPreview />
      ) : (
        <div className="bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] rounded-2xl shadow-card p-4 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              Direct Text Editor (Changes reflect in Live Preview)
            </label>
            <span className="text-[11px] text-[#777D89] dark:text-[#9699A5]">
              Full editing control
            </span>
          </div>
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            rows={12}
            className="w-full resize-none bg-[#F8F9FB] dark:bg-[#101114] text-xs sm:text-sm leading-relaxed text-[#17191F] dark:text-[#F4F4F5] p-3.5 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
          />
        </div>
      )}

      {/* Hashtag Management */}
      <HashtagPanel />

      {/* Multiple Variations Cards (Section 4.E) */}
      {result?.variations && result.variations.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
              <h4 className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
                Alternative Angles & Variations ({result.variations.length})
              </h4>
            </div>
            <span className="text-[11px] text-[#777D89] dark:text-[#9699A5]">
              Click to replace active post
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {result.variations.map((v) => (
              <VariationCard
                key={v.id}
                variation={v}
                isSelected={selectedVariationId === v.id}
                onSelect={selectVariation}
              />
            ))}
          </div>
        </div>
      )}

      {/* Transformation Notes */}
      {result?.transformationNotes && result.transformationNotes.length > 0 && (
        <div className="p-3.5 rounded-xl bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0] dark:border-[#292B33] text-[11px] text-[#777D89] dark:text-[#9699A5] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              Transformation Transparency
            </div>
            <ul className="list-disc pl-4 space-y-0.5">
              {result.transformationNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
