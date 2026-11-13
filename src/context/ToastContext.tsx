import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, message, description }: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      setToasts((prev) => [...prev, { id, type, message, description }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback((message: string, description?: string) => {
    showToast({ type: 'success', message, description });
  }, [showToast]);

  const error = useCallback((message: string, description?: string) => {
    showToast({ type: 'error', message, description });
  }, [showToast]);

  const info = useCallback((message: string, description?: string) => {
    showToast({ type: 'info', message, description });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`pointer-events-auto p-3.5 rounded-xl border shadow-card flex items-start gap-3 backdrop-blur-md transition-colors ${
                toast.type === 'success'
                  ? 'bg-white/95 dark:bg-[#181A20]/95 border-emerald-500/30 text-[#17191F] dark:text-[#F4F4F5]'
                  : toast.type === 'error'
                  ? 'bg-white/95 dark:bg-[#181A20]/95 border-rose-500/30 text-[#17191F] dark:text-[#F4F4F5]'
                  : 'bg-white/95 dark:bg-[#181A20]/95 border-prosely-light-border dark:border-prosely-dark-border text-[#17191F] dark:text-[#F4F4F5]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-prosely-light-accent dark:text-prosely-dark-accent" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium leading-tight">{toast.message}</p>
                {toast.description && (
                  <p className="text-[11px] text-[#777D89] dark:text-[#9699A5] mt-1 leading-normal">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#777D89] hover:text-[#17191F] dark:hover:text-[#F4F4F5] p-1 rounded transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
