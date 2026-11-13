import React from 'react';
import { useWriting } from '../../context/WritingContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { ContentCategory } from '../../types';
import { cn } from '../../utils/cn';
import {
  PenTool,
  Trophy,
  User,
  Briefcase,
  Layers,
  Megaphone,
  Rocket,
  MessageSquare,
  UserPlus
} from 'lucide-react';

export const CategorySelector: React.FC = () => {
  const { category, setCategory } = useWriting();

  const iconMap: Record<ContentCategory, React.ReactNode> = {
    'linkedin-post': <PenTool className="w-3.5 h-3.5" />,
    'achievement': <Trophy className="w-3.5 h-3.5" />,
    'experience-about': <User className="w-3.5 h-3.5" />,
    'internship': <Briefcase className="w-3.5 h-3.5" />,
    'project': <Layers className="w-3.5 h-3.5" />,
    'announcement': <Megaphone className="w-3.5 h-3.5" />,
    'launch-update': <Rocket className="w-3.5 h-3.5" />,
    'comment-reply': <MessageSquare className="w-3.5 h-3.5" />,
    'connection-message': <UserPlus className="w-3.5 h-3.5" />
  };

  const categories = Object.values(CATEGORIES_DATA);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
          Content Mode
        </label>
        <span className="text-[11px] text-[#777D89] dark:text-[#9699A5]">
          {CATEGORIES_DATA[category]?.shortName}
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isSelected = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all border',
                isSelected
                  ? 'bg-[#6558D3] border-[#6558D3] text-white shadow-subtle dark:bg-[#8B80FF] dark:border-[#8B80FF] dark:text-[#101114]'
                  : 'bg-white dark:bg-[#181A20] border-[#E8EAF0] dark:border-[#292B33] text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B]'
              )}
            >
              <span>{iconMap[cat.id]}</span>
              <span>{cat.shortName}</span>
              {cat.badge && (
                <span
                  className={cn(
                    'text-[9px] px-1 py-0.2 rounded font-semibold uppercase',
                    isSelected
                      ? 'bg-white/20 text-white dark:bg-black/20 dark:text-[#101114]'
                      : 'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]'
                  )}
                >
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
