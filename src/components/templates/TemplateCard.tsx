import React from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { Template } from '../../types';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { Button } from '../ui/Button';

export interface TemplateCardProps {
  template: Template;
  onUse: (template: Template) => void;
  onPreview?: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUse, onPreview }) => {
  const categoryMeta = CATEGORIES_DATA[template.category];

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card hover:shadow-elevated hover:border-[#6558D3]/30 dark:hover:border-[#8B80FF]/30 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#F2F4F8] dark:bg-[#20232B] text-[#777D89] dark:text-[#9699A5] border border-[#E8EAF0] dark:border-[#292B33]">
            {categoryMeta?.shortName || template.category}
          </span>
          {template.badge && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]">
              {template.badge}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5] group-hover:text-[#6558D3] dark:group-hover:text-[#8B80FF] transition-colors mb-1.5">
          {template.title}
        </h3>
        <p className="text-xs text-[#777D89] dark:text-[#9699A5] leading-relaxed mb-3 line-clamp-2">
          {template.description}
        </p>

        {/* Hinglish Example Snippet */}
        <div className="p-2.5 rounded-xl bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0]/60 dark:border-[#292B33]/60 mb-3.5">
          <div className="text-[10px] font-medium text-[#777D89] dark:text-[#9699A5] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#6558D3] dark:text-[#8B80FF]" />
            <span>Hinglish Starter:</span>
          </div>
          <p className="text-[11px] text-[#17191F] dark:text-[#F4F4F5] italic line-clamp-2">
            "{template.hinglishExample}"
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60">
        <span className="text-[10px] text-[#777D89] dark:text-[#9699A5]">
          Tone: {template.defaultTone}
        </span>
        <Button
          size="xs"
          variant="primary"
          rightIcon={<ArrowRight className="w-3 h-3" />}
          onClick={() => onUse(template)}
        >
          Use Template
        </Button>
      </div>
    </div>
  );
};
