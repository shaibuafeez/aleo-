import React, { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cardVariants = cva(
    "rounded-xl transition-all duration-300 overflow-hidden",
    {
        variants: {
            variant: {
                default: "glass-panel",
                solid: "bg-aleo-dark-gray border border-white/5",
                ghost: "bg-transparent border-none",
                interactive: "glass-panel hover:border-aleo-green/30 hover:shadow-[0_0_20px_rgba(0,255,153,0.1)] hover:-translate-y-1 cursor-pointer",
                clean: "bg-white border border-gray-200 text-black shadow-sm hover:border-aleo-green hover:shadow-md transition-all duration-300",
            },
            padding: {
                none: "p-0",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "default",
        },
    }
);

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> { }

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={twMerge(clsx(cardVariants({ variant, padding, className })))}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card, cardVariants };
