import React from 'react';
import { useWriting } from '../../context/WritingContext';
import { LENGTH_OPTIONS } from '../../data/toneAndLengthData';
import { cn } from '../../utils/cn';

export const LengthSelector: React.FC = () => {
  const { length, setLength } = useWriting();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
          Target Length
        </label>
        <span className="text-[11px] text-[#777D89] dark:text-[#9699A5]">
          {LENGTH_OPTIONS.find((l) => l.id === length)?.wordCountTarget}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {LENGTH_OPTIONS.map((item) => {
          const isSelected = length === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setLength(item.id)}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-3 rounded-xl border text-center transition-all',
                isSelected
                  ? 'bg-[#EEECFD] dark:bg-[#252342] border-[#6558D3] dark:border-[#8B80FF] text-[#6558D3] dark:text-[#8B80FF] shadow-subtle'
                  : 'bg-white dark:bg-[#181A20] border-[#E8EAF0] dark:border-[#292B33] text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B]'
              )}
            >
              <span className="text-xs font-semibold">{item.label}</span>
              <span className="text-[10px] opacity-75">{item.wordCountTarget}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
