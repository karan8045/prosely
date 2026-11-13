import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { ThemeMode } from '../../types';

export const ThemeToggle: React.FC<{ showLabel?: boolean }> = ({ showLabel = false }) => {
  const { theme, setTheme } = useTheme();

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { mode: 'system', label: 'System', icon: <Monitor className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="inline-flex items-center p-0.5 rounded-lg border border-[#E8EAF0] dark:border-[#292B33] bg-[#F2F4F8] dark:bg-[#181A20]">
      {options.map((opt) => {
        const isActive = theme === opt.mode;
        return (
          <button
            key={opt.mode}
            onClick={() => setTheme(opt.mode)}
            title={`Set theme to ${opt.label}`}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all',
              isActive
                ? 'bg-white dark:bg-[#252830] text-[#17191F] dark:text-[#F4F4F5] shadow-subtle'
                : 'text-[#777D89] dark:text-[#9699A5] hover:text-[#17191F] dark:hover:text-[#F4F4F5]'
            )}
          >
            {opt.icon}
            {showLabel && <span>{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
};
