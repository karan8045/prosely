import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'secondary' | 'outline' | 'success' | 'warning' | 'purple';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full select-none';

  const variants = {
    default:
      'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700',
    accent:
      'bg-[#EEECFD] dark:bg-[#252342] text-[#6558D3] dark:text-[#8B80FF] border border-[#6558D3]/20 dark:border-[#8B80FF]/30',
    secondary:
      'bg-[#F2F4F8] dark:bg-[#20232B] text-[#777D89] dark:text-[#9699A5] border border-[#E8EAF0] dark:border-[#292B33]',
    outline:
      'border border-[#E8EAF0] dark:border-[#292B33] text-[#777D89] dark:text-[#9699A5]',
    success:
      'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40',
    warning:
      'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40',
    purple:
      'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
