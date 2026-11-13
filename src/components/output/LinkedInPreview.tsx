import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Globe,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useWriting } from '../../context/WritingContext';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Button } from '../ui/Button';

export const LinkedInPreview: React.FC = () => {
  const { settings } = useSettings();
  const { editableContent, hashtags, category } = useWriting();
  const { isCopied, copy } = useCopyToClipboard();
  const [isExpanded, setIsExpanded] = useState(false);

  // Author details from settings or fallback
  const authorName = settings.authorName || 'Alex Sharma';
  const authorHeadline = settings.authorHeadline || 'Software Engineer • Building modern web architectures';
  const authorInitials = authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const formattedHashtags = hashtags.length > 0 ? hashtags.join(' ') : '';
  const fullPostText = formattedHashtags
    ? `${editableContent}\n\n${formattedHashtags}`
    : editableContent;

  // Truncation logic: preview ~250 characters before "...see more"
  const needsTruncation = editableContent.length > 280;
  const displayContent = !isExpanded && needsTruncation
    ? editableContent.slice(0, 260) + '...'
    : editableContent;

  return (
    <div className="bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] rounded-2xl shadow-card overflow-hidden transition-colors">
      {/* LinkedIn Post Header */}
      <div className="p-4 flex items-start justify-between border-b border-[#E8EAF0]/60 dark:border-[#292B33]/60 bg-[#F8F9FB]/40 dark:bg-[#101114]/40">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#6558D3] to-indigo-400 dark:from-[#8B80FF] dark:to-indigo-500 text-white font-semibold flex items-center justify-center text-sm shadow-subtle shrink-0">
            {authorInitials || 'P'}
          </div>

          {/* User info */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5] truncate">
                {authorName}
              </span>
              <span className="text-[10px] text-[#777D89] dark:text-[#9699A5]">• 1st</span>
            </div>
            <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] truncate leading-tight mt-0.5">
              {authorHeadline}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-[#777D89] dark:text-[#9699A5] mt-1">
              <span>Just now</span>
              <span>•</span>
              <Globe className="w-3 h-3 text-[#777D89] dark:text-[#9699A5]" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="xs"
            variant="subtle"
            leftIcon={isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            onClick={() => copy(fullPostText, 'Copied post to clipboard!')}
          >
            {isCopied ? 'Copied' : 'Copy Post'}
          </Button>

          <button
            className="p-1 text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] rounded"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Post Text Body */}
      <div className="p-4 sm:p-5 text-xs sm:text-[13px] leading-relaxed text-[#17191F] dark:text-[#F4F4F5] whitespace-pre-line font-normal">
        {displayContent}

        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#6558D3] dark:text-[#8B80FF] hover:underline font-medium ml-1.5 inline-block focus:outline-none"
          >
            {isExpanded ? 'see less' : '...see more'}
          </button>
        )}

        {/* Hashtags display */}
        {hashtags.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60 flex flex-wrap gap-1.5">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="text-[#6558D3] dark:text-[#8B80FF] hover:underline font-medium text-xs cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats Mock */}
      <div className="px-4 py-2 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60 flex items-center justify-between text-[11px] text-[#777D89] dark:text-[#9699A5]">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px]">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
              👏
            </span>
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px]">
              ❤️
            </span>
          </div>
          <span className="ml-1 font-medium text-[#17191F] dark:text-[#F4F4F5]">48</span>
        </div>
        <div className="flex items-center gap-3">
          <span>12 comments</span>
          <span>•</span>
          <span>4 reposts</span>
        </div>
      </div>

      {/* Interaction Bar */}
      <div className="px-2 py-1.5 border-t border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB]/30 dark:bg-[#101114]/30 grid grid-cols-4 gap-1 text-[11px] font-medium text-[#777D89] dark:text-[#9699A5]">
        <button className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5] transition-colors">
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>Like</span>
        </button>
        <button className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5] transition-colors">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Comment</span>
        </button>
        <button className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5] transition-colors">
          <Repeat2 className="w-3.5 h-3.5" />
          <span>Repost</span>
        </button>
        <button className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5] transition-colors">
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
