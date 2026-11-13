import React, { useState } from 'react';
import {
  User,
  Sliders,
  Palette,
  Clipboard,
  Trash2,
  RotateCcw,
  Cpu,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';
import { ThemeToggle } from './ThemeToggle';
import { TONE_OPTIONS, LENGTH_OPTIONS } from '../../data/toneAndLengthData';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { WritingLength, WritingTone } from '../../types';
import { AIConfigModal } from './AIConfigModal';

export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings, clearHistory } = useSettings();
  const { success, error, info } = useToast();

  const [authorName, setAuthorName] = useState(settings.authorName);
  const [authorHeadline, setAuthorHeadline] = useState(settings.authorHeadline);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      authorName,
      authorHeadline
    });
    success('Profile defaults updated for LinkedIn preview!');
  };

  const handleClearHistory = () => {
    clearHistory();
    setShowClearModal(false);
    success('All local drafts deleted.');
  };

  const handleResetSettings = () => {
    resetSettings();
    setAuthorName('Alex Sharma');
    setAuthorHeadline('Software Engineer • Building modern web architectures');
    setShowResetModal(false);
    success('All preferences restored to default.');
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* 1. Profile for LinkedIn Preview */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E8EAF0] dark:border-[#292B33] pb-3">
          <User className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
          <div>
            <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              LinkedIn Preview Profile
            </h3>
            <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
              These details appear on the simulated LinkedIn card in your workspace.
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#17191F] dark:text-[#F4F4F5]">
                Full Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Priyesh Patel"
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB] dark:bg-[#101114] text-[#17191F] dark:text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#17191F] dark:text-[#F4F4F5]">
                Professional Headline
              </label>
              <input
                type="text"
                value={authorHeadline}
                onChange={(e) => setAuthorHeadline(e.target.value)}
                placeholder="e.g. SDE at FinTech • React & Go"
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB] dark:bg-[#101114] text-[#17191F] dark:text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Button size="sm" variant="primary" type="submit">
              Save Profile Info
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Writing Defaults */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E8EAF0] dark:border-[#292B33] pb-3">
          <Sliders className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
          <div>
            <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              Default Writing Preferences
            </h3>
            <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
              Choose the baseline tone and length applied whenever you start a new draft.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#17191F] dark:text-[#F4F4F5]">
              Default Tone
            </label>
            <select
              value={settings.defaultTone}
              onChange={(e) => updateSettings({ defaultTone: e.target.value as WritingTone })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB] dark:bg-[#101114] text-[#17191F] dark:text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label} ({t.tagline})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#17191F] dark:text-[#F4F4F5]">
              Default Length
            </label>
            <select
              value={settings.defaultLength}
              onChange={(e) => updateSettings({ defaultLength: e.target.value as WritingLength })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#292B33] bg-[#F8F9FB] dark:bg-[#101114] text-[#17191F] dark:text-[#F4F4F5] focus:outline-none focus:ring-1 focus:ring-[#6558D3] dark:focus:ring-[#8B80FF]"
            >
              {LENGTH_OPTIONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label} ({l.wordCountTarget})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Appearance & Theme */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
          <div>
            <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              Theme & Color Mode
            </h3>
            <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
              Toggle between light, dark, or automatic system match.
            </p>
          </div>
        </div>

        <ThemeToggle showLabel />
      </div>

      {/* 4. Clipboard Preferences */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card space-y-3">
        <div className="flex items-center gap-2 border-b border-[#E8EAF0] dark:border-[#292B33] pb-3">
          <Clipboard className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
          <div>
            <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              Clipboard & Workflow Automation
            </h3>
            <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
              Fine-tune how generated content is copied and handled.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-[#17191F] dark:text-[#F4F4F5] cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoCopyOnGenerate}
              onChange={(e) => updateSettings({ autoCopyOnGenerate: e.target.checked })}
              className="rounded border-[#E8EAF0] dark:border-[#292B33] text-[#6558D3] focus:ring-[#6558D3]"
            />
            <span>Automatically copy generated post to clipboard upon generation</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-[#17191F] dark:text-[#F4F4F5] cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoIncludeHashtags}
              onChange={(e) => updateSettings({ autoIncludeHashtags: e.target.checked })}
              className="rounded border-[#E8EAF0] dark:border-[#292B33] text-[#6558D3] focus:ring-[#6558D3]"
            />
            <span>Generate and display targeted hashtags for applicable post modes</span>
          </label>
        </div>
      </div>

      {/* 5. AI Engine & Architecture */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card space-y-3">
        <div className="flex items-center justify-between border-b border-[#E8EAF0] dark:border-[#292B33] pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#6558D3] dark:text-[#8B80FF]" />
            <div>
              <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5]">
                AI Engine & Provider Architecture
              </h3>
              <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
                Current Engine: <strong>Local Demonstration (Rule-based)</strong>
              </p>
            </div>
          </div>

          <Button size="xs" variant="outline" onClick={() => setShowAIModal(true)}>
            Manage Providers
          </Button>
        </div>

        <div className="p-3 rounded-xl bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0] dark:border-[#292B33] text-xs text-[#777D89] dark:text-[#9699A5] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p>
            This installation is running in 100% offline local demonstration mode. No paid API key
            or server subscription is required.
          </p>
        </div>
      </div>

      {/* 6. Data Management & Reset */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181A20] border border-[#E8EAF0] dark:border-[#292B33] shadow-card space-y-4">
        <div className="border-b border-[#E8EAF0] dark:border-[#292B33] pb-2">
          <h3 className="text-sm font-semibold text-rose-600 dark:text-rose-400">
            Danger Zone
          </h3>
          <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
            Manage browser storage and reset configuration.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              Clear Local Content History
            </div>
            <div className="text-[11px] text-[#777D89] dark:text-[#9699A5]">
              Delete all locally saved drafts from browser storage.
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
            onClick={() => setShowClearModal(true)}
          >
            Clear History
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8EAF0]/60 dark:border-[#292B33]/60">
          <div>
            <div className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
              Reset All Workspace Settings
            </div>
            <div className="text-[11px] text-[#777D89] dark:text-[#9699A5]">
              Revert tones, lengths, and profile to default initial state.
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => setShowResetModal(true)}
          >
            Reset Settings
          </Button>
        </div>
      </div>

      {/* AI Configuration Modal */}
      <AIConfigModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} />

      {/* Clear History Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Local Content History"
        description="Are you sure you want to delete all stored post drafts?"
        maxWidth="sm"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
            This will permanently erase all drafts saved in your current browser. You will not be able to recover them.
          </p>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => setShowClearModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="danger" onClick={handleClearHistory}>
              Yes, Delete All
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Settings Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset All Settings"
        description="Restore factory default preferences?"
        maxWidth="sm"
      >
        <div className="space-y-4 pt-1">
          <p className="text-xs text-[#777D89] dark:text-[#9699A5]">
            This will reset your default writing tone, length, and profile mock data. Your saved drafts will remain intact.
          </p>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => setShowResetModal(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleResetSettings}>
              Reset to Defaults
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
