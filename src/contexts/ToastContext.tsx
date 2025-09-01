'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast from '@/app/components/toast/toast';
import { LABELS } from '@/app/labels';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [activeToasts, setActiveToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const toastId = crypto.randomUUID();
    setActiveToasts(previousToasts => [...previousToasts, { id: toastId, message, type }]);
  }, []);

  const hideToast = useCallback((toastId: string) => {
    setActiveToasts(previousToasts => previousToasts.filter(toast => toast.id !== toastId));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="toast-container">
        {activeToasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(LABELS.errorHandling.genericErrorMessage);
  }
  return context;
}
