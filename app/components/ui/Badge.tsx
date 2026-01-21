import React, { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono uppercase tracking-wider",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-aleo-green text-aleo-black shadow-[0_0_10px_rgba(0,255,153,0.3)]",
                secondary:
                    "border-transparent bg-white/20 text-white",
                destructive:
                    "border-transparent bg-red-500/10 text-red-500 border-red-500/20",
                outline: "text-foreground border-white/20",
                glass: "bg-white/10 border-white/10 backdrop-blur-sm",
                success: "border-transparent bg-green-500/10 text-green-500 border-green-500/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={twMerge(clsx(badgeVariants({ variant }), className))} {...props} />
    );
}

export { Badge, badgeVariants };
