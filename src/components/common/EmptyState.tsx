import React from 'react';
import { LucideIcon, PenTool } from 'lucide-react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PenTool,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-[#E8EAF0] dark:border-[#292B33] bg-[#FFFFFF]/50 dark:bg-[#181A20]/50 my-auto">
      <div className="w-12 h-12 rounded-xl bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF] flex items-center justify-center mb-3.5 shadow-subtle">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-[#17191F] dark:text-[#F4F4F5] mb-1">
        {title}
      </h3>
      <p className="text-xs text-[#777D89] dark:text-[#9699A5] max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex items-center gap-2">
          {actionLabel && onAction && (
            <Button size="sm" variant="primary" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button size="sm" variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
