import React from 'react';
import { useWriting } from '../../context/WritingContext';
import { TONE_OPTIONS } from '../../data/toneAndLengthData';
import { WritingTone } from '../../types';
import { cn } from '../../utils/cn';
import {
  Briefcase,
  Smile,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  BookOpen,
  Cpu,
  Zap
} from 'lucide-react';

export const ToneSelector: React.FC = () => {
  const { tone, setTone } = useWriting();

  const iconMap: Record<WritingTone, React.ReactNode> = {
    professional: <Briefcase className="w-3.5 h-3.5" />,
    natural: <Smile className="w-3.5 h-3.5" />,
    confident: <ShieldCheck className="w-3.5 h-3.5" />,
    humble: <HeartHandshake className="w-3.5 h-3.5" />,
    enthusiastic: <Sparkles className="w-3.5 h-3.5" />,
    storytelling: <BookOpen className="w-3.5 h-3.5" />,
    technical: <Cpu className="w-3.5 h-3.5" />,
    concise: <Zap className="w-3.5 h-3.5" />
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
          Writing Tone
        </label>
        <span className="text-[11px] text-[#777D89] dark:text-[#9699A5]">
          {TONE_OPTIONS.find((t) => t.id === tone)?.tagline}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {TONE_OPTIONS.map((item) => {
          const isSelected = tone === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTone(item.id)}
              className={cn(
                'flex items-center gap-2 p-2 rounded-xl text-left border transition-all',
                isSelected
                  ? 'bg-[#EEECFD] dark:bg-[#252342] border-[#6558D3] dark:border-[#8B80FF] text-[#6558D3] dark:text-[#8B80FF] shadow-subtle font-medium'
                  : 'bg-white dark:bg-[#181A20] border-[#E8EAF0] dark:border-[#292B33] text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B]'
              )}
            >
              <div
                className={cn(
                  'p-1 rounded-md shrink-0',
                  isSelected
                    ? 'bg-[#6558D3] text-white dark:bg-[#8B80FF] dark:text-[#101114]'
                    : 'bg-[#F2F4F8] dark:bg-[#20232B] text-[#777D89] dark:text-[#9699A5]'
                )}
              >
                {iconMap[item.id]}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium truncate">{item.label}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
