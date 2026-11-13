import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Award,
  Briefcase,
  PenTool,
  Rocket
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { WritingStatsCard } from '../components/dashboard/WritingStatsCard';
import { QuickTemplatesGrid } from '../components/dashboard/QuickTemplatesGrid';
import { RecentDraftsList } from '../components/dashboard/RecentDraftsList';
import { getStoredDrafts } from '../services/storage/historyStorage';
import { Draft, ContentCategory } from '../types';
import { useWriting } from '../context/WritingContext';
import { CATEGORIES_DATA } from '../data/categoriesData';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCategory, resetWorkspace } = useWriting();
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    setDrafts(getStoredDrafts());
  }, []);

  const handleStartWriting = (cat?: ContentCategory) => {
    if (cat) {
      setCategory(cat);
    } else {
      resetWorkspace();
    }
    navigate('/workspace');
  };

  const popularCategories: { id: ContentCategory; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'achievement',
      label: 'Achievements & Certifications',
      desc: 'Announce AWS, Azure, degrees, and milestones with genuine credibility.',
      icon: <Award className="w-5 h-5 text-amber-500" />
    },
    {
      id: 'project',
      label: 'Projects & Capstones',
      desc: 'Showcase architectures, open-source repositories, and technical impact.',
      icon: <Layers className="w-5 h-5 text-[#6558D3] dark:text-[#8B80FF]" />
    },
    {
      id: 'internship',
      label: 'Internship Reflections',
      desc: 'Reflect on learnings, mentorship, and production deliverables.',
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />
    },
    {
      id: 'connection-message',
      label: 'Connection Notes',
      desc: 'High-converting personalized notes to founders, leads, and recruiters.',
      icon: <Rocket className="w-5 h-5 text-blue-500" />
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card">
        {/* Subtle accent background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#6558D3]/10 dark:from-[#8B80FF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>From raw thoughts to professional presence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#17191F] dark:text-[#F4F4F5] leading-tight">
            Your thoughts.{' '}
            <span className="text-[#6558D3] dark:text-[#8B80FF]">Your professional voice.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#777D89] dark:text-[#9699A5] leading-relaxed">
            Turn everyday Hinglish, rough notes, and unstructured ideas into natural, polished LinkedIn content that preserves your authenticity and technical credibility.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="md"
              variant="primary"
              leftIcon={<PenTool className="w-4 h-4" />}
              onClick={() => handleStartWriting()}
            >
              Start Writing
            </Button>
            <Button
              size="md"
              variant="outline"
              leftIcon={<BookOpen className="w-4 h-4" />}
              onClick={() => navigate('/templates')}
            >
              Explore Templates
            </Button>
          </div>
        </div>
      </div>

      {/* Writing Statistics */}
      <WritingStatsCard drafts={drafts} />

      {/* Popular Writing Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
            Popular Writing Categories
          </h3>
          <span className="text-xs text-[#777D89] dark:text-[#9699A5]">
            Select a mode to jump directly into the studio
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {popularCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleStartWriting(cat.id)}
              className="p-4 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-subtle hover:shadow-card hover:border-[#6558D3]/40 dark:hover:border-[#8B80FF]/40 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0] dark:border-[#292B33] flex items-center justify-center mb-3">
                  {cat.icon}
                </div>
                <h4 className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5] group-hover:text-[#6558D3] dark:group-hover:text-[#8B80FF] transition-colors mb-1">
                  {cat.label}
                </h4>
                <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60 flex items-center justify-between text-[11px] text-[#6558D3] dark:text-[#8B80FF] font-medium mt-3">
                <span>Open studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick-Start Templates */}
      <QuickTemplatesGrid />

      {/* Recent Drafts */}
      <RecentDraftsList drafts={drafts} />
    </div>
  );
};
