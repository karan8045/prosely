import { useEffect } from 'react';

interface KeyboardShortcutOptions {
  onGenerate?: () => void;
  onCopy?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({ onGenerate, onCopy, onEscape }: KeyboardShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // Cmd/Ctrl + Enter: Generate
      if (isCmdOrCtrl && e.key === 'Enter') {
        if (onGenerate) {
          e.preventDefault();
          onGenerate();
        }
      }

      // Cmd/Ctrl + Shift + C: Copy
      if (isCmdOrCtrl && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
        if (onCopy) {
          e.preventDefault();
          onCopy();
        }
      }

      // Escape: Close
      if (e.key === 'Escape') {
        if (onEscape) {
          onEscape();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onGenerate, onCopy, onEscape]);
}
