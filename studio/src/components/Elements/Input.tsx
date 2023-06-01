import clsx from 'clsx';
import React from 'react';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const className = props.className || '';
    return (
        <input
            {...props}
            className={clsx(className, 'bg-white bg-opacity-50 focus:bg-amber-100 outline-none')}
            onKeyDown={(e) => e.stopPropagation()}
            onKeyUp={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        />
    );
}
