import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#6558D3] hover:bg-[#5648C4] text-white shadow-subtle focus-visible:ring-[#6558D3] dark:bg-[#8B80FF] dark:hover:bg-[#796DF6] dark:text-[#101114]',
      secondary:
        'bg-[#FFFFFF] hover:bg-[#F2F4F8] text-[#17191F] border border-[#E8EAF0] shadow-subtle dark:bg-[#181A20] dark:hover:bg-[#20232B] dark:text-[#F4F4F5] dark:border-[#292B33]',
      outline:
        'border border-[#E8EAF0] hover:bg-[#F2F4F8] text-[#17191F] dark:border-[#292B33] dark:text-[#F4F4F5] dark:hover:bg-[#20232B]',
      ghost:
        'text-[#777D89] hover:text-[#17191F] hover:bg-black/5 dark:text-[#9699A5] dark:hover:text-[#F4F4F5] dark:hover:bg-white/5',
      danger:
        'bg-rose-500 hover:bg-rose-600 text-white shadow-subtle focus-visible:ring-rose-500',
      subtle:
        'bg-[#EEECFD] hover:bg-[#E3E0FC] text-[#6558D3] dark:bg-[#252342] dark:hover:bg-[#302D56] dark:text-[#8B80FF]'
    };

    const sizes = {
      xs: 'text-xs px-2.5 py-1 gap-1.5',
      sm: 'text-xs px-3 py-1.5 gap-2',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2.5'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
