import { useState, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const { success, error } = useToast();

  const copy = useCallback(
    async (text: string, label = 'Copied to clipboard!') => {
      if (!text) return false;

      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for non-secure or older contexts
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        setIsCopied(true);
        success(label);
        setTimeout(() => setIsCopied(false), timeout);
        return true;
      } catch (err) {
        console.error('Copy failed:', err);
        error('Failed to copy text. Please select and copy manually.');
        return false;
      }
    },
    [success, error, timeout]
  );

  return { isCopied, copy };
}
