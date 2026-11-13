import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Crafting your professional LinkedIn post...',
  subMessage = 'Analyzing Hinglish context, structuring paragraphs, and applying tone...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-[#E8EAF0] dark:border-[#292B33] bg-[#FFFFFF] dark:bg-[#181A20] shadow-card">
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="w-14 h-14 rounded-2xl border-2 border-dashed border-[#6558D3] dark:border-[#8B80FF] flex items-center justify-center"
        />
        <div className="absolute inset-0 flex items-center justify-center text-[#6558D3] dark:text-[#8B80FF]">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5] mb-1.5">
        {message}
      </h3>
      <p className="text-xs text-[#777D89] dark:text-[#9699A5] max-w-sm mb-6">
        {subMessage}
      </p>

      {/* Animated Skeleton bars */}
      <div className="w-full max-w-md space-y-2.5">
        <div className="h-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-3/4 mx-auto" />
        <div className="h-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-full mx-auto" />
        <div className="h-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-5/6 mx-auto" />
        <div className="h-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-pulse w-1/2 mx-auto" />
      </div>
    </div>
  );
};
