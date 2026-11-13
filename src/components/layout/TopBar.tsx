import React, { useState } from 'react';
import { Menu, Sparkles, Keyboard, BookOpen, PenTool } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../settings/ThemeToggle';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useWriting } from '../../context/WritingContext';
import { CATEGORIES_DATA } from '../../data/categoriesData';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, resetWorkspace } = useWriting();
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Determine title based on route
  const getHeaderInfo = () => {
    if (location.pathname === '/') {
      return {
        title: 'Writing Overview',
        subtitle: 'Turn everyday thoughts into authentic, professional LinkedIn presence.'
      };
    }
    if (location.pathname === '/templates') {
      return {
        title: 'Curated Templates',
        subtitle: 'Structured starters for achievements, certifications, projects, and outreach.'
      };
    }
    if (location.pathname === '/history') {
      return {
        title: 'Drafts History',
        subtitle: 'Locally stored posts and iterations. 100% private in browser storage.'
      };
    }
    if (location.pathname === '/settings') {
      return {
        title: 'Workspace Settings',
        subtitle: 'Customize profile defaults, writing tone, and provider configurations.'
      };
    }

    const catData = CATEGORIES_DATA[category];
    return {
      title: catData ? catData.name : 'Writing Studio',
      subtitle: catData?.description || 'Convert rough Hinglish notes into polished LinkedIn posts.'
    };
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <>
      <header className="h-16 px-4 sm:px-6 bg-white/80 dark:bg-[#181A20]/80 backdrop-blur-md border-b border-[#E8EAF0] dark:border-[#292B33] flex items-center justify-between sticky top-0 z-30 transition-colors">
        {/* Left Section: Mobile Menu & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5] truncate leading-tight">
              {title}
            </h1>
            <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] truncate hidden sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setShowShortcuts(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] border border-[#E8EAF0] dark:border-[#292B33] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] transition-colors"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Shortcuts</span>
          </button>

          {location.pathname !== '/templates' && (
            <button
              onClick={() => navigate('/templates')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] border border-[#E8EAF0] dark:border-[#292B33] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Templates</span>
            </button>
          )}

          <ThemeToggle />

          {location.pathname !== '/workspace' ? (
            <Button
              size="sm"
              variant="primary"
              leftIcon={<PenTool className="w-3.5 h-3.5" />}
              onClick={() => {
                resetWorkspace();
                navigate('/workspace');
              }}
            >
              <span className="hidden sm:inline">Open </span>Studio
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={resetWorkspace}
            >
              Clear
            </Button>
          )}
        </div>
      </header>

      {/* Shortcuts Modal */}
      <Modal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        title="Keyboard Shortcuts"
        description="Boost your productivity with quick keyboard controls."
        maxWidth="sm"
      >
        <div className="space-y-3 py-1">
          <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#E8EAF0] dark:border-[#292B33]">
            <span className="text-[#17191F] dark:text-[#F4F4F5]">Generate / Transform Content</span>
            <kbd className="px-2 py-1 rounded bg-[#F2F4F8] dark:bg-[#20232B] border border-[#E8EAF0] dark:border-[#292B33] font-mono text-[11px]">
              ⌘ + Enter
            </kbd>
          </div>
          <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#E8EAF0] dark:border-[#292B33]">
            <span className="text-[#17191F] dark:text-[#F4F4F5]">Copy Output Post</span>
            <kbd className="px-2 py-1 rounded bg-[#F2F4F8] dark:bg-[#20232B] border border-[#E8EAF0] dark:border-[#292B33] font-mono text-[11px]">
              ⌘ + Shift + C
            </kbd>
          </div>
          <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#E8EAF0] dark:border-[#292B33]">
            <span className="text-[#17191F] dark:text-[#F4F4F5]">Close Modal / Popover</span>
            <kbd className="px-2 py-1 rounded bg-[#F2F4F8] dark:bg-[#20232B] border border-[#E8EAF0] dark:border-[#292B33] font-mono text-[11px]">
              Esc
            </kbd>
          </div>
        </div>
      </Modal>
    </>
  );
};
