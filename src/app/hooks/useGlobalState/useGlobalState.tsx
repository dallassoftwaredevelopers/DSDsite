'use client';
import Toast from '@/app/components/toast/toast';
import Spinner from '../../components/spinner/spinner';

import { useQuery } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type ActionLinks = {
  linkName: string;
  link: string;
  active: boolean;
};

type ToastState = {
  message: string;
  type: 'success' | 'error';
};

type GlobalState = {
  actionLinks: Array<ActionLinks> | null;
  toast: ToastState | null;
  setToast: (toast: ToastState | null) => void;
  clearToast: () => void;
};

const GlobalStateContext = createContext<GlobalState>({
  actionLinks: null,
  toast: null,
  setToast: () => {},
  clearToast: () => {},
});

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [actionLinks, setActionLinks] = useState<Array<ActionLinks> | null>(
    null
  );
  const [toast, setToast] = useState<ToastState | null>(null);

  const { data: actionLinksResponse, isLoading } = useQuery({
    queryKey: ['actionLinks'],
    queryFn: async () => {
      const response = await fetch('/api/actionLinks', { cache: 'no-store' });
      return response.json();
    },
  });

  const clearToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (actionLinksResponse) {
      setActionLinks(actionLinksResponse);
    }
  }, [actionLinksResponse]);

  if (isLoading) return <Spinner />;

  return (
    <GlobalStateContext.Provider
      value={{ actionLinks, toast, setToast, clearToast }}
    >
      {children}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => clearToast()}
        />
      )}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
