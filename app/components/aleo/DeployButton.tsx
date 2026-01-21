'use client';

import { useState } from 'react';
import { useAleoWallet } from '@/app/lib/aleo/AleoProvider';
import { AleoDeployment } from '@provablehq/aleo-wallet-standard';

interface DeployButtonProps {
    programName?: string;
    sourceCode: string;
}

export default function DeployButton({ programName = 'hello_leo.aleo', sourceCode }: DeployButtonProps) {
    const { connected, connect, publicKey, wallet } = useAleoWallet() as any;

    const [isDeploying, setIsDeploying] = useState(false);
    const [txId, setTxId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDeploy = async () => {
        if (!connected || !wallet?.adapter) {
            alert('Please connect your Leo Wallet first!');
            return;
        }

        if (!publicKey) {
            alert('Could not get wallet address!');
            return;
        }

        setIsDeploying(true);
        setError(null);
        setTxId(null);

        try {
            // Create deployment object
            const deployment: AleoDeployment = {
                program: sourceCode, // The source code of the program
                priorityFee: 0.1,    // Example fee
                privateFee: false,   // Public fee
                address: publicKey, // Use publicKey from useAleoWallet
            };

            // Ensure the adapter has the method
            if (!wallet.adapter.executeDeployment) {
                throw new Error('Wallet does not support deployment');
            }

            const result = await (wallet.adapter as any).executeDeployment(deployment);
            setTxId(result.transactionId);
            console.log('Deployment successful:', result);

            // Notify success (could use a toast)
            alert(`Deployment successful! Transaction ID: ${result.transactionId}`);

        } catch (err: any) {
            console.error('Deployment failed:', err);
            setError(err.message || 'Deployment failed');
            alert(`Deployment failed: ${err.message}`);
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors
          ${isDeploying ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
        `}
            >
                {isDeploying ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Deploying...
                    </span>
                ) : (
                    'Deploy to Aleo'
                )}
            </button>

            {txId && (
                <div className="text-xs text-green-600 break-all">
                    Tx: {txId}
                </div>
            )}
            {error && (
                <div className="text-xs text-red-600">
                    Error: {error}
                </div>
            )}
        </div>
    );
}
