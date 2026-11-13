import React from 'react';
import {
  RotateCcw,
  CheckCheck,
  Briefcase,
  Smile,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  BookmarkPlus
} from 'lucide-react';
import { useWriting } from '../../context/WritingContext';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { ImprovementAction } from '../../types';

export const QuickActionsBar: React.FC = () => {
  const {
    editableContent,
    improveContent,
    isGenerating,
    saveCurrentDraft,
    resetWorkspace
  } = useWriting();

  const { isCopied, copy } = useCopyToClipboard();

  const actions: { id: ImprovementAction; label: string; icon: React.ReactNode }[] = [
    { id: 'rewrite', label: 'Rewrite', icon: <RotateCcw className="w-3.5 h-3.5" /> },
    { id: 'grammar', label: 'Fix Grammar', icon: <CheckCheck className="w-3.5 h-3.5" /> },
    { id: 'professional', label: 'More Professional', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'natural', label: 'More Natural', icon: <Smile className="w-3.5 h-3.5" /> },
    { id: 'shorten', label: 'Shorten', icon: <Minimize2 className="w-3.5 h-3.5" /> },
    { id: 'expand', label: 'Expand', icon: <Maximize2 className="w-3.5 h-3.5" /> }
  ];

  const hasContent = Boolean(editableContent.trim());

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-subtle">
      <span className="text-[11px] font-semibold text-[#777D89] dark:text-[#9699A5] px-2">
        Quick Polish:
      </span>

      <div className="flex flex-wrap items-center gap-1 flex-1">
        {actions.map((act) => (
          <button
            key={act.id}
            disabled={!hasContent || isGenerating}
            onClick={() => improveContent(act.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-[#17191F] dark:text-[#F4F4F5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] disabled:opacity-40 disabled:cursor-not-allowed border border-transparent hover:border-[#E8EAF0] dark:hover:border-[#292B33] transition-colors"
          >
            <span>{act.icon}</span>
            <span>{act.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 border-l border-[#E8EAF0] dark:border-[#292B33] pl-2 ml-auto">
        <button
          disabled={!hasContent}
          onClick={() => saveCurrentDraft()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] disabled:opacity-40 transition-colors"
          title="Save to Drafts History"
        >
          <BookmarkPlus className="w-3.5 h-3.5 text-[#6558D3] dark:text-[#8B80FF]" />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          disabled={!hasContent}
          onClick={() => copy(editableContent, 'Copied full post!')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF] hover:bg-[#E3E0FC] dark:hover:bg-[#302D56] disabled:opacity-40 transition-colors"
          title="Copy Post to Clipboard (⌘+Shift+C)"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{isCopied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};
