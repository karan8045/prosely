import React from 'react';
import { Clock, ArrowRight, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Draft } from '../../types';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { useWriting } from '../../context/WritingContext';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Button } from '../ui/Button';

interface RecentDraftsListProps {
  drafts: Draft[];
}

export const RecentDraftsList: React.FC<RecentDraftsListProps> = ({ drafts }) => {
  const navigate = useNavigate();
  const { loadDraft } = useWriting();
  const { isCopied, copy } = useCopyToClipboard();

  const handleOpen = (draft: Draft) => {
    loadDraft(draft);
    navigate('/workspace');
  };

  const recent = drafts.slice(0, 3);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
          <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
            Recent Drafts
          </h3>
        </div>
        {drafts.length > 3 && (
          <button
            onClick={() => navigate('/history')}
            className="text-xs text-[#6558D3] dark:text-[#8B80FF] hover:underline flex items-center gap-1 font-medium"
          >
            <span>View all ({drafts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {drafts.length === 0 ? (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#181A20] border border-dashed border-[#E8EAF0] dark:border-[#292B33] text-center">
          <p className="text-xs text-[#777D89] dark:text-[#9699A5] mb-2">
            No drafts saved yet. Start writing in the studio to see your history here!
          </p>
          <Button size="xs" variant="primary" onClick={() => navigate('/workspace')}>
            Start First Post
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recent.map((draft) => {
            const catMeta = CATEGORIES_DATA[draft.category];
            const dateStr = new Date(draft.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric'
            });

            return (
              <div
                key={draft.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]">
                      {catMeta?.shortName || draft.category}
                    </span>
                    <span className="text-[10px] text-[#777D89] dark:text-[#9699A5]">
                      {dateStr}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5] mb-1 line-clamp-1">
                    {draft.title}
                  </h4>
                  <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] line-clamp-3 leading-relaxed mb-3">
                    {draft.generatedContent}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60 flex items-center justify-between">
                  <span className="text-[10px] text-[#777D89] dark:text-[#9699A5]">
                    {draft.wordCount} words
                  </span>
                  <Button
                    size="xs"
                    variant="outline"
                    rightIcon={<ArrowUpRight className="w-3 h-3" />}
                    onClick={() => handleOpen(draft)}
                  >
                    Open
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
