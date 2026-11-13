import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useWriting } from '../../context/WritingContext';
import { cn } from '../../utils/cn';

export const GenerateButton: React.FC = () => {
  const { generateContent, isGenerating, rawInput } = useWriting();

  const isDisabled = isGenerating || !rawInput.trim();

  return (
    <button
      onClick={() => generateContent()}
      disabled={isDisabled}
      className={cn(
        'w-full py-3 px-5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2.5 shadow-card transition-all duration-200 select-none active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isDisabled
          ? 'bg-[#E8EAF0] dark:bg-[#20232B] text-[#777D89] dark:text-[#9699A5] cursor-not-allowed opacity-60 shadow-none'
          : 'bg-[#6558D3] hover:bg-[#5648C4] text-white dark:bg-[#8B80FF] dark:hover:bg-[#796DF6] dark:text-[#101114] shadow-[#6558D3]/20 hover:shadow-elevated'
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Transforming Hinglish to LinkedIn Post...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Generate Professional Post</span>
          <kbd className="hidden sm:inline-block ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/15 dark:bg-white/20">
            ⌘ + Enter
          </kbd>
        </>
      )}
    </button>
  );
};
