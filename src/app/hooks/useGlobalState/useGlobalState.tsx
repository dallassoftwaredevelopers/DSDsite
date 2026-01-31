'use client';
import Spinner from '@/components/spinner/spinner';

import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, ReactNode } from 'react';
import { ActionLink } from '@/types';

type GlobalState = {
  actionLinks: Array<ActionLink> | null;
};

const GlobalStateContext = createContext<GlobalState>({
  actionLinks: null,
});

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const { data: actionLinks = null, isLoading } = useQuery({
    queryKey: ['actionLinks'],
    queryFn: async () => {
      const response = await fetch('/api/actionLinks', { cache: 'no-store' });
      return response.json();
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <GlobalStateContext.Provider value={{ actionLinks }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
