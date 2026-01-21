'use client';

import { ReactNode, useMemo } from 'react';
import { LeoWalletAdapter } from '@provablehq/aleo-wallet-adaptor-leo';
import { AleoWalletProvider } from '@provablehq/aleo-wallet-adaptor-react';
import { WalletModalProvider } from '@provablehq/aleo-wallet-adaptor-react-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Default styles for the wallet adapter
import '@provablehq/aleo-wallet-adaptor-react-ui/dist/styles.css';

const queryClient = new QueryClient();

export function AleoProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'Leo By Practice',
      }),
    ],
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AleoWalletProvider
        wallets={wallets}
        autoConnect
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </AleoWalletProvider>
    </QueryClientProvider>
  );
}

// Re-export hooks from the official adapter for use in the app
export { useWallet as useAleoWallet } from '@provablehq/aleo-wallet-adaptor-react';
