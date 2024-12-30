'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export default function ReactQueryProvider({
  children,
}: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false } },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
