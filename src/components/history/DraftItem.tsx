import React from 'react';
import { Copy, Check, Trash2, ArrowUpRight, Calendar, Hash } from 'lucide-react';
import { Draft } from '../../types';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Button } from '../ui/Button';

export interface DraftItemProps {
  draft: Draft;
  onOpen: (draft: Draft) => void;
  onDelete: (id: string) => void;
}

export const DraftItem: React.FC<DraftItemProps> = ({ draft, onOpen, onDelete }) => {
  const { isCopied, copy } = useCopyToClipboard();
  const categoryMeta = CATEGORIES_DATA[draft.category];

  const formattedDate = new Date(draft.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]">
              {categoryMeta?.shortName || draft.category}
            </span>
            <span className="text-[10px] text-[#777D89] dark:text-[#9699A5] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => copy(draft.generatedContent, 'Copied draft content!')}
              className="p-1.5 text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Copy post content"
              aria-label="Copy post content"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => onDelete(draft.id)}
              className="p-1.5 text-[#777D89] hover:text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Delete draft"
              aria-label="Delete draft"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title & Preview */}
        <h4 className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5] mb-1.5 line-clamp-1">
          {draft.title}
        </h4>
        <p className="text-xs text-[#777D89] dark:text-[#9699A5] line-clamp-3 leading-relaxed mb-3 whitespace-pre-line">
          {draft.generatedContent}
        </p>

        {/* Hashtags preview */}
        {draft.hashtags && draft.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {draft.hashtags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-[#6558D3] dark:text-[#8B80FF]">
                {tag}
              </span>
            ))}
            {draft.hashtags.length > 3 && (
              <span className="text-[10px] text-[#777D89] dark:text-[#9699A5]">
                +{draft.hashtags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60 text-[11px] text-[#777D89] dark:text-[#9699A5]">
        <span>{draft.wordCount || 0} words • {draft.tone}</span>
        <Button
          size="xs"
          variant="outline"
          rightIcon={<ArrowUpRight className="w-3 h-3" />}
          onClick={() => onOpen(draft)}
        >
          Open in Studio
        </Button>
      </div>
    </div>
  );
};
