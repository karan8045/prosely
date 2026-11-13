import React from 'react';
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Variation } from '../../types';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export interface VariationCardProps {
  variation: Variation;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

export const VariationCard: React.FC<VariationCardProps> = ({
  variation,
  isSelected = false,
  onSelect
}) => {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <div
      className={cn(
        'p-4 rounded-2xl border transition-all flex flex-col justify-between',
        isSelected
          ? 'bg-[#EEECFD]/40 dark:bg-[#252342]/40 border-[#6558D3] dark:border-[#8B80FF] shadow-subtle'
          : 'bg-white dark:bg-[#181A20] border-[#E8EAF0] dark:border-[#292B33] hover:border-[#6558D3]/40 dark:hover:border-[#8B80FF]/40'
      )}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
                {variation.label}
              </span>
              {isSelected && (
                <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-[#6558D3] text-white dark:bg-[#8B80FF] dark:text-[#101114]">
                  Active
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] mt-0.5">
              {variation.style}
            </p>
          </div>

          <button
            onClick={() => copy(variation.content, `Copied "${variation.label}" variation!`)}
            className="p-1.5 text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
            title="Copy this variation"
            aria-label="Copy this variation"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Content Preview */}
        <div className="text-xs leading-relaxed text-[#17191F] dark:text-[#F4F4F5] whitespace-pre-line line-clamp-6 bg-[#F8F9FB] dark:bg-[#101114] p-3 rounded-xl border border-[#E8EAF0]/60 dark:border-[#292B33]/60 mb-3 font-mono text-[11.5px]">
          {variation.content}
        </div>
      </div>

      {/* Footer / Selection CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60 text-[11px]">
        <span className="text-[#777D89] dark:text-[#9699A5] truncate max-w-[170px]">
          {variation.summary}
        </span>

        <Button
          size="xs"
          variant={isSelected ? 'subtle' : 'outline'}
          rightIcon={<ArrowRight className="w-3 h-3" />}
          onClick={() => onSelect(variation.id)}
        >
          {isSelected ? 'In Editor' : 'Apply to Post'}
        </Button>
      </div>
    </div>
  );
};
