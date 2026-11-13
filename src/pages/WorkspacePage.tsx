import React from 'react';
import { CategorySelector } from '../components/editor/CategorySelector';
import { ToneSelector } from '../components/editor/ToneSelector';
import { LengthSelector } from '../components/editor/LengthSelector';
import { WritingEditor } from '../components/editor/WritingEditor';
import { GenerateButton } from '../components/editor/GenerateButton';
import { OutputPanel } from '../components/output/OutputPanel';
import { useWriting } from '../context/WritingContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

export const WorkspacePage: React.FC = () => {
  const { generateContent, editableContent, hashtags } = useWriting();
  const { copy } = useCopyToClipboard();

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onGenerate: () => {
      generateContent();
    },
    onCopy: () => {
      if (editableContent) {
        const full = hashtags.length > 0 ? `${editableContent}\n\n${hashtags.join(' ')}` : editableContent;
        copy(full, 'Copied post to clipboard!');
      }
    }
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Category Horizontal Selector */}
      <CategorySelector />

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input, Tone, Length & Action (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <WritingEditor />
          <ToneSelector />
          <LengthSelector />
          <GenerateButton />
        </div>

        {/* Right Column: Output, LinkedIn Preview & Variations (7 cols on lg) */}
        <div className="lg:col-span-7">
          <OutputPanel />
        </div>
      </div>
    </div>
  );
};
