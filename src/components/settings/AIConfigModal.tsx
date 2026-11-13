import React, { useState } from 'react';
import { Cpu, Check, ShieldAlert, Key, Globe, ShieldCheck, Info } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useSettings } from '../../context/SettingsContext';
import { aiService } from '../../services/ai/AIService';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../utils/cn';

export interface AIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConfigModal: React.FC<AIConfigModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const { success, info } = useToast();
  const [selectedProviderId, setSelectedProviderId] = useState(settings.activeProviderId || 'mock-local');

  const providers = aiService.getAvailableProviders();

  const handleApplyProvider = () => {
    updateSettings({ activeProviderId: selectedProviderId });
    aiService.setActiveProvider(selectedProviderId);
    success(`Active provider set to: ${providers.find((p) => p.id === selectedProviderId)?.name}`);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Provider Architecture"
      description="Configure your transformation engine or view integration instructions for production LLMs."
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Architecture Note */}
        <div className="p-3.5 rounded-xl bg-[#EEECFD]/60 dark:bg-[#252342]/60 border border-[#6558D3]/30 dark:border-[#8B80FF]/30 text-xs text-[#6558D3] dark:text-[#8B80FF] flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Prosely is architected using a decoupled <strong>AIProvider</strong> interface. The
            application ships with a robust local demonstration engine that runs offline with zero external API fees.
          </p>
        </div>

        {/* Providers List */}
        <div className="space-y-2">
          {providers.map((p) => {
            const isSelected = selectedProviderId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProviderId(p.id)}
                className={cn(
                  'p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3',
                  isSelected
                    ? 'bg-[#EEECFD]/40 dark:bg-[#252342]/40 border-[#6558D3] dark:border-[#8B80FF] shadow-subtle'
                    : 'bg-[#F8F9FB] dark:bg-[#101114] border-[#E8EAF0] dark:border-[#292B33] hover:border-[#6558D3]/40'
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#17191F] dark:text-[#F4F4F5]">
                      {p.name}
                    </span>
                    {p.isLocal ? (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                        Active Local Engine
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                        External Integration
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="shrink-0 mt-1">
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border flex items-center justify-center transition-colors',
                      isSelected
                        ? 'border-[#6558D3] dark:border-[#8B80FF] bg-[#6558D3] dark:bg-[#8B80FF] text-white dark:text-[#101114]'
                        : 'border-[#E8EAF0] dark:border-[#292B33]'
                    )}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Guide Box */}
        <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-[#E8EAF0] dark:border-[#292B33] text-[11px] text-[#777D89] dark:text-[#9699A5] space-y-2">
          <div className="font-semibold text-[#17191F] dark:text-[#F4F4F5] flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5" />
            <span>How to connect real AI providers in future releases</span>
          </div>
          <p>
            To integrate an external LLM (e.g. OpenAI or Gemini) without leaking credentials in
            client-side bundles, configure an environment variable or deploy a light backend proxy:
          </p>
          <pre className="p-2 rounded bg-black/5 dark:bg-black/40 font-mono text-[10px] text-[#17191F] dark:text-[#F4F4F5] overflow-x-auto">
{`# Optional: Set in your local .env file
VITE_OPENAI_API_KEY=sk-demo-optional
VITE_GEMINI_API_KEY=AIzaSy-demo-optional`}
          </pre>
          <p>
            When no key is supplied, Prosely automatically uses the high-precision rule-based engine, ensuring the app runs flawlessly out-of-the-box everywhere.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button size="sm" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" variant="primary" onClick={handleApplyProvider}>
            Save & Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};
