import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  PenTool,
  Trophy,
  User,
  Briefcase,
  Layers,
  Megaphone,
  Rocket,
  MessageSquare,
  UserPlus,
  Clock,
  Settings,
  Sparkles,
  BookOpen,
  LayoutDashboard,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useWriting } from '../../context/WritingContext';
import { ContentCategory } from '../../types';
import { DemonstrationBadge } from '../common/DemonstrationBadge';

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCategory, category: activeCategory, resetWorkspace } = useWriting();

  const handleCategoryClick = (categoryKey: ContentCategory) => {
    setCategory(categoryKey);
    if (location.pathname !== '/workspace') {
      navigate('/workspace');
    }
    if (onClose) onClose();
  };

  const handleNewWriting = () => {
    resetWorkspace();
    navigate('/workspace');
    if (onClose) onClose();
  };

  const navCategories: { id: ContentCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'linkedin-post', label: 'LinkedIn Posts', icon: <PenTool className="w-4 h-4" /> },
    { id: 'achievement', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'experience-about', label: 'Experience & About', icon: <User className="w-4 h-4" /> },
    { id: 'internship', label: 'Internships', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'project', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
    { id: 'announcement', label: 'Announcements', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'launch-update', label: 'Launches & Updates', icon: <Rocket className="w-4 h-4" /> },
    { id: 'comment-reply', label: 'Comments & Replies', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'connection-message', label: 'Connection Messages', icon: <UserPlus className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-[#181A20] border-r border-[#E8EAF0] dark:border-[#292B33] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0 shadow-elevated' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#E8EAF0] dark:border-[#292B33] flex items-center justify-between">
          <button
            onClick={() => {
              navigate('/');
              if (onClose) onClose();
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#6558D3] dark:bg-[#8B80FF] text-white dark:text-[#101114] flex items-center justify-center font-bold text-base shadow-subtle group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-[#17191F] dark:text-[#F4F4F5]">
                  Prosely
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]">
                  Studio
                </span>
              </div>
              <p className="text-[10px] text-[#777D89] dark:text-[#9699A5] leading-none">
                Hinglish to LinkedIn
              </p>
            </div>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="p-3">
          <button
            onClick={handleNewWriting}
            className="w-full flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-[#6558D3] hover:bg-[#5648C4] text-white dark:bg-[#8B80FF] dark:hover:bg-[#796DF6] dark:text-[#101114] font-medium text-xs shadow-subtle transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Writing</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] opacity-75 font-mono px-1 py-0.5 rounded bg-black/15 dark:bg-white/20">
              ⌘N
            </kbd>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="px-2.5 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#777D89] dark:text-[#9699A5]">
              Overview
            </div>
            <div className="space-y-0.5">
              <NavLink
                to="/"
                onClick={onClose}
                end
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]'
                      : 'text-[#777D89] dark:text-[#9699A5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
                  )
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/workspace"
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]'
                      : 'text-[#777D89] dark:text-[#9699A5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
                  )
                }
              >
                <PenTool className="w-4 h-4" />
                <span>Writing Studio</span>
              </NavLink>

              <NavLink
                to="/templates"
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]'
                      : 'text-[#777D89] dark:text-[#9699A5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
                  )
                }
              >
                <BookOpen className="w-4 h-4" />
                <span>Templates</span>
              </NavLink>

              <NavLink
                to="/history"
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]'
                      : 'text-[#777D89] dark:text-[#9699A5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
                  )
                }
              >
                <Clock className="w-4 h-4" />
                <span>Drafts History</span>
              </NavLink>
            </div>
          </div>

          {/* Categories Quick Switcher */}
          <div>
            <div className="px-2.5 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#777D89] dark:text-[#9699A5]">
              Writing Modes
            </div>
            <div className="space-y-0.5">
              {navCategories.map((cat) => {
                const isSelected = location.pathname === '/workspace' && activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left',
                      isSelected
                        ? 'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF] font-semibold'
                        : 'text-[#777D89] dark:text-[#9699A5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
                    )}
                  >
                    <span className="shrink-0">{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System & Settings */}
          <div>
            <div className="px-2.5 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#777D89] dark:text-[#9699A5]">
              Preferences
            </div>
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]'
                    : 'text-[#777D89] dark:text-[#9699A5] hover:bg-[#F2F4F8] dark:hover:bg-[#20232B] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
                )
              }
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>

        {/* Footer info & Demonstration notice */}
        <div className="p-3 border-t border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB]/50 dark:bg-[#101114]/50">
          <DemonstrationBadge />
        </div>
      </aside>
    </>
  );
};
