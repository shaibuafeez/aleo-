'use client';

import { useCurrentAccount, useDisconnectWallet, useSuiClientQuery } from '@mysten/dapp-kit';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectModal } from '@mysten/dapp-kit';

export default function ConnectWallet() {
    const currentAccount = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Fetch balance
    const { data: balance } = useSuiClientQuery(
        'getBalance',
        { owner: currentAccount?.address || '' },
        { enabled: !!currentAccount }
    );

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatBalance = (balance: string | undefined) => {
        if (!balance) return '0';
        const sui = Number(balance) / 1_000_000_000;
        return sui.toFixed(2);
    };

    if (!currentAccount) {
        return (
            <>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-black/90 transition-all shadow-lg shadow-black/10"
                >
                    Connect Wallet
                </motion.button>

                <ConnectModal
                    trigger={<div />}
                    open={showModal}
                    onOpenChange={(open) => setShowModal(open)}
                />
            </>
        );
    }

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-4 py-2 bg-black/5 backdrop-blur-md text-black rounded-full text-sm font-medium hover:bg-black/10 transition-all flex items-center gap-2 border border-black/5"
            >
                <span className="hidden sm:inline">{formatAddress(currentAccount.address)}</span>
                <span className="sm:hidden">{currentAccount.address.slice(0, 4)}...</span>
            </motion.button>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-14 right-0 w-64 p-3 bg-white/95 backdrop-blur-xl border border-black/5 rounded-2xl shadow-2xl shadow-black/10"
                    >
                        {/* Balance */}
                        <div className="px-4 py-3 bg-black/5 rounded-xl mb-2">
                            <div className="text-xs text-black/50 font-medium mb-1">Balance</div>
                            <div className="text-2xl font-bold text-black">
                                {formatBalance(balance?.totalBalance)} SUI
                            </div>
                        </div>

                        {/* Address */}
                        <div className="px-4 py-2 mb-2">
                            <div className="text-xs text-black/50 font-medium mb-1">Address</div>
                            <div className="text-sm font-mono text-black/70">
                                {formatAddress(currentAccount.address)}
                            </div>
                        </div>

                        {/* Disconnect Button */}
                        <button
                            onClick={() => {
                                disconnect();
                                setShowDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 bg-red-500/10 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-all"
                        >
                            Disconnect
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Click outside to close */}
            {showDropdown && (
                <div
                    onClick={() => setShowDropdown(false)}
                    className="fixed inset-0 z-[-1]"
                />
            )}
        </div>
    );
}
