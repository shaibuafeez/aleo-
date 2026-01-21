'use client';

import { WalletMultiButton } from '@provablehq/aleo-wallet-adaptor-react-ui';

export default function ConnectWallet() {
    return (
        <div className="relative z-50">
            <WalletMultiButton className="!bg-black hover:!bg-zinc-800 !text-white !font-bold !rounded-full !px-5 !py-2 !h-auto !text-xs !uppercase !tracking-widest !border !border-white/10 !shadow-none hover:!scale-105 transition-all duration-200" />
        </div>
    );
}
