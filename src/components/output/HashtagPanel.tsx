import React, { useState } from 'react';
import { Hash, Plus, X, Copy, Check } from 'lucide-react';
import { useWriting } from '../../context/WritingContext';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Button } from '../ui/Button';

export const HashtagPanel: React.FC = () => {
  const { hashtags, removeHashtag, addHashtag } = useWriting();
  const { isCopied, copy } = useCopyToClipboard();
  const [newTagInput, setNewTagInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    addHashtag(newTagInput.trim());
    setNewTagInput('');
    setIsAdding(false);
  };

  const copyAll = () => {
    if (hashtags.length === 0) return;
    copy(hashtags.join(' '), 'Copied all hashtags!');
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Hash className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
          <h4 className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
            Targeted Hashtags ({hashtags.length})
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {hashtags.length > 0 && (
            <button
              onClick={copyAll}
              className="text-[11px] text-[#6558D3] dark:text-[#8B80FF] hover:underline flex items-center gap-1 font-medium"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? 'Copied' : 'Copy All'}</span>
            </button>
          )}

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="text-[11px] text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] flex items-center gap-1 px-2 py-0.5 rounded border border-[#E8EAF0] dark:border-[#292B33] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Tag</span>
          </button>
        </div>
      </div>

      {/* Add tag form */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="flex items-center gap-2 pt-1">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#777D89]">#</span>
            <input
              type="text"
              placeholder="e.g. FullStackDevelopment"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value.replace(/^#/, ''))}
              autoFocus
              className="w-full text-xs pl-6 pr-3 py-1.5 rounded-lg border border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB] dark:bg-[#101114] text-[#17191F] dark:text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
            />
          </div>
          <Button size="xs" variant="primary" type="submit">
            Add
          </Button>
          <Button size="xs" variant="ghost" type="button" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
        </form>
      )}

      {/* Tags list */}
      <div className="flex flex-wrap items-center gap-1.5">
        {hashtags.length === 0 ? (
          <p className="text-xs text-[#777D89] dark:text-[#9699A5] italic">
            No hashtags generated for this post mode. Click "Add Tag" to add custom tags.
          </p>
        ) : (
          hashtags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F2F4F8] dark:bg-[#20232B] text-[#17191F] dark:text-[#F4F4F5] border border-[#E8EAF0] dark:border-[#292B33] group hover:border-[#6558D3]/30 transition-colors"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeHashtag(tag)}
                className="text-[#777D89] hover:text-rose-500 rounded p-0.5 ml-0.5"
                title={`Remove ${tag}`}
                aria-label={`Remove ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
};
