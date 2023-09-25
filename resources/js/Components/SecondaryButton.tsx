import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `rounded-md px-4 py-2 bg-orange-100 font-semibold text-xs text-black uppercase tracking-widest border-solid border-2 border-black -translate-y-1 -translate-x-1 shadow-slanted-sm hover:shadow-none hover:translate-y-0 hover:translate-x-0 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
