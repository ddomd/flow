import { ButtonHTMLAttributes } from 'react';

export default function DangerButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `rounded-md px-4 py-2 bg-red-400 border-2 border-black font-semibold text-xs uppercase tracking-widest -translate-y-1 -translate-x-1 shadow-slanted-sm hover:translate-y-0 hover:translate-x-0 hover:shadow-none transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
