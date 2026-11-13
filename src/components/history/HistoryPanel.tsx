import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Draft, ContentCategory } from '../../types';
import { getStoredDrafts, deleteDraft, clearAllDrafts } from '../../services/storage/historyStorage';
import { DraftItem } from './DraftItem';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { EmptyState } from '../common/EmptyState';
import { useWriting } from '../../context/WritingContext';
import { useToast } from '../../context/ToastContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';

export const HistoryPanel: React.FC = () => {
  const navigate = useNavigate();
  const { loadDraft } = useWriting();
  const { success, info } = useToast();

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const refreshDrafts = () => {
    setDrafts(getStoredDrafts());
  };

  useEffect(() => {
    refreshDrafts();
  }, []);

  const handleOpenDraft = (draft: Draft) => {
    loadDraft(draft);
    navigate('/workspace');
  };

  const handleDeleteDraft = (id: string) => {
    deleteDraft(id);
    refreshDrafts();
    info('Draft removed.');
  };

  const handleClearAll = () => {
    clearAllDrafts();
    refreshDrafts();
    setShowClearConfirm(false);
    success('All drafts cleared permanently.');
  };

  // Filter drafts
  const filteredDrafts = drafts.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.generatedContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.rawInput.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#777D89] dark:text-[#9699A5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search saved drafts by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-white dark:bg-[#181A20] text-[#17191F] dark:text-[#F4F4F5] placeholder-[#777D89] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
          />
        </div>

        {/* Category Filter & Clear Button */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-white dark:bg-[#181A20] text-[#17191F] dark:text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
          >
            <option value="all">All Categories ({drafts.length})</option>
            {Object.values(CATEGORIES_DATA).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.shortName}
              </option>
            ))}
          </select>

          {drafts.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
              onClick={() => setShowClearConfirm(true)}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Drafts List / Grid */}
      {drafts.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No Saved Drafts Yet"
          description="Every post you generate in the Writing Studio will automatically be preserved here in local browser storage."
          actionLabel="Go to Writing Studio"
          onAction={() => navigate('/workspace')}
        />
      ) : filteredDrafts.length === 0 ? (
        <div className="p-8 text-center text-xs text-[#777D89] dark:text-[#9699A5] bg-white dark:bg-[#181A20] rounded-2xl border border-[#E8EAF0] dark:border-[#292B33]">
          No drafts match your current search or category filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredDrafts.map((draft) => (
            <DraftItem
              key={draft.id}
              draft={draft}
              onOpen={handleOpenDraft}
              onDelete={handleDeleteDraft}
            />
          ))}
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Clear All Saved Drafts?"
        description="This action will permanently delete all drafts stored locally in this browser. This cannot be undone."
        maxWidth="sm"
      >
        <div className="space-y-4 pt-1">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 text-xs text-rose-700 dark:text-rose-400">
            You are about to delete <strong>{drafts.length} drafts</strong>. Since Prosely operates locally without cloud servers, these drafts cannot be recovered after deletion.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button size="sm" variant="ghost" onClick={() => setShowClearConfirm(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="danger" onClick={handleClearAll}>
              Delete Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
