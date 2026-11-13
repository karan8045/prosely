import React from 'react';
import { HistoryPanel } from '../components/history/HistoryPanel';

export const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-4 pb-12">
      <div className="border-b border-[#E8EAF0] dark:border-[#292B33] pb-4">
        <h2 className="text-xl font-bold text-[#17191F] dark:text-[#F4F4F5]">
          Content Drafts History
        </h2>
        <p className="text-xs text-[#777D89] dark:text-[#9699A5] mt-1">
          Review, copy, or reopen previous iterations. Stored 100% locally in your browser.
        </p>
      </div>

      <HistoryPanel />
    </div>
  );
};
