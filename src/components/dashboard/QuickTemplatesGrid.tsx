import React from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES_DATA } from '../../data/templatesData';
import { useWriting } from '../../context/WritingContext';
import { Template } from '../../types';
import { CATEGORIES_DATA } from '../../data/categoriesData';

export const QuickTemplatesGrid: React.FC = () => {
  const navigate = useNavigate();
  const { loadTemplate } = useWriting();

  // Pick 4 popular templates for dashboard quick start
  const quickTemplates = TEMPLATES_DATA.slice(0, 4);

  const handleUse = (tmpl: Template) => {
    loadTemplate(tmpl);
    navigate('/workspace');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
          <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
            Quick-Start Templates
          </h3>
        </div>
        <button
          onClick={() => navigate('/templates')}
          className="text-xs text-[#6558D3] dark:text-[#8B80FF] hover:underline flex items-center gap-1 font-medium"
        >
          <span>View all {TEMPLATES_DATA.length}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickTemplates.map((tmpl) => {
          const catMeta = CATEGORIES_DATA[tmpl.category];
          return (
            <div
              key={tmpl.id}
              onClick={() => handleUse(tmpl)}
              className="p-4 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-subtle hover:shadow-card hover:border-[#6558D3]/40 dark:hover:border-[#8B80FF]/40 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F2F4F8] dark:bg-[#20232B] text-[#777D89] dark:text-[#9699A5]">
                    {catMeta?.shortName || tmpl.category}
                  </span>
                  {tmpl.badge && (
                    <span className="text-[10px] font-medium text-[#6558D3] dark:text-[#8B80FF]">
                      {tmpl.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5] group-hover:text-[#6558D3] dark:group-hover:text-[#8B80FF] transition-colors mb-1">
                  {tmpl.title}
                </h4>
                <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60 flex items-center justify-between text-[11px] text-[#6558D3] dark:text-[#8B80FF] font-medium mt-3">
                <span>Start writing</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
