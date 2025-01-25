'use client';
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

class GlobalState {
  actionLinks: Array<ActionLinks> | null;

  constructor(actionLinks: Array<ActionLinks> | null) {
    this.actionLinks = actionLinks;
  }
}

const GlobalStateContext = createContext(new GlobalState(null));

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(() => new GlobalState(null));

  const { data: actionLinksResponse, isLoading } = useQuery({
    queryKey: ['actionLinks'],
    queryFn: async () => {
      const response = await fetch('/api/actionLinks', { cache: 'no-store' });
      return response.json();
    },
  });

  useEffect(() => {
    if (actionLinksResponse) {
      setState(new GlobalState(actionLinksResponse));
    }
  }, [actionLinksResponse]);

  if (isLoading) return <Spinner />;

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
