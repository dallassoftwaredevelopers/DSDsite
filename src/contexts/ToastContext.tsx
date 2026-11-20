'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import Toast from '@/components/toast/toast';
import { LABELS } from '@/app/labels';

import type { Message } from '@/types';

interface ToastState extends Message {
  id: string;
}

interface ToastContextType {
  showToast: (message: string, type: Message['type']) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [activeToasts, setActiveToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: Message['type']) => {
    const toastId = crypto.randomUUID();
    setActiveToasts((previousToasts) => [
      ...previousToasts,
      { id: toastId, message, type },
    ]);
  }, []);

  const hideToast = useCallback((toastId: string) => {
    setActiveToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id !== toastId)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {activeToasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}
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
