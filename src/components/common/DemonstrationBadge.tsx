import React, { useState } from 'react';
import { ShieldCheck, Info, Sparkles, Server } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export const DemonstrationBadge: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EEECFD]/80 dark:bg-[#252342]/80 border border-[#6558D3]/30 dark:border-[#8B80FF]/30 text-[#6558D3] dark:text-[#8B80FF]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6558D3] dark:bg-[#8B80FF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6558D3] dark:bg-[#8B80FF]"></span>
        </span>
        <span className="font-semibold">Local Demonstration Engine</span>
        <span className="text-[#777D89] dark:text-[#9699A5] hidden sm:inline">• Rule-based • 100% Private</span>
        <button
          onClick={() => setShowDetails(true)}
          className="text-[#6558D3] dark:text-[#8B80FF] hover:underline flex items-center gap-0.5 ml-1 font-normal"
          aria-label="View engine details"
        >
          <Info className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Details</span>
        </button>
      </div>

      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Prosely Architecture & Privacy Notice"
        description="Transparent overview of how content is transformed and preserved."
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs leading-relaxed text-[#777D89] dark:text-[#9699A5]">
          <div className="p-3.5 rounded-xl bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0] dark:border-[#292B33] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-[#17191F] dark:text-[#F4F4F5] mb-1">
                Zero Data Transmission
              </h4>
              <p>
                All text transformations run 100% client-side in your browser using deterministic
                natural language processing rules. No drafts, keystrokes, or profile data are ever
                sent over the network or saved to remote databases.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0] dark:border-[#292B33] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#6558D3] dark:text-[#8B80FF] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-[#17191F] dark:text-[#F4F4F5] mb-1">
                Rule-Based Transformation Engine
              </h4>
              <p>
                In accordance with product guidelines, this version uses an intelligent local rule
                engine rather than live paid AI API inference. It recognizes Hinglish patterns, detects
                tech stacks, restructures thoughts into LinkedIn-ready formats, and respects your factual inputs without hallucinating.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F9FB] dark:bg-[#101114] border border-[#E8EAF0] dark:border-[#292B33] flex items-start gap-3">
            <Server className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-[#17191F] dark:text-[#F4F4F5] mb-1">
                Pluggable Provider Architecture
              </h4>
              <p>
                The codebase implements the <code className="text-[#6558D3] dark:text-[#8B80FF]">AIProvider</code> interface.
                When ready, production LLM providers (OpenAI GPT-4o, Google Gemini, Anthropic Claude, or custom backend proxies) can be plugged in seamlessly via environment variables or backend endpoints without rewriting UI components.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setShowDetails(false)}>
              Understood
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
