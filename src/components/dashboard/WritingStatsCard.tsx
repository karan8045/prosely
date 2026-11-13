import React from 'react';
import { PenTool, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Draft } from '../../types';

interface WritingStatsCardProps {
  drafts: Draft[];
}

export const WritingStatsCard: React.FC<WritingStatsCardProps> = ({ drafts }) => {
  const totalDrafts = drafts.length;
  const totalWords = drafts.reduce((acc, curr) => acc + (curr.wordCount || 0), 0);
  const categoriesUsed = new Set(drafts.map((d) => d.category)).size;

  const stats = [
    {
      label: 'Saved Drafts',
      value: totalDrafts.toString(),
      helper: 'Stored in browser',
      icon: <PenTool className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
    },
    {
      label: 'Words Polished',
      value: totalWords > 0 ? totalWords.toLocaleString() : '0',
      helper: 'Clean English generated',
      icon: <Zap className="w-4 h-4 text-amber-500" />
    },
    {
      label: 'Modes Explored',
      value: `${categoriesUsed} / 9`,
      helper: 'LinkedIn categories',
      icon: <Layers className="w-4 h-4 text-indigo-500" />
    },
    {
      label: 'Privacy Guarantee',
      value: '100% Local',
      helper: 'Zero data transmission',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-subtle flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#777D89] dark:text-[#9699A5] font-medium">
              {stat.label}
            </span>
            <div className="p-1.5 rounded-lg bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0] dark:border-[#292B33]">
              {stat.icon}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-[#17191F] dark:text-[#F4F4F5]">
              {stat.value}
            </div>
            <div className="text-[11px] text-[#777D89] dark:text-[#9699A5] mt-0.5">
              {stat.helper}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
