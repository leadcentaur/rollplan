import React from "react";
import cx from 'clsx';

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    label: string;
    href?: string;
    onClick?: () => void;
    id?: string;
    size?: 'df' | 'lg';
}

export default function Button({
	className,
	disabled,
	label,
	href,
	onClick,
	id,
	size,
}: ButtonProps) {

    const isLink = !!href;
    const Tag = isLink ? 'a' : 'button';

    return(
        <Tag
            className={cx(
            'mr-3 font-jakarta-sans hidden p-3 px-6 pb-2 pt-2 text-white-200 bg-gray-800 rounded-lg hover:bg-brightRedLight md:block',
            disabled
                ? 'opacity-60'
                : 'hover:text-white hover:bg-blurple-500 dark:hover:bg-purple-500 cursor-pointer',
            size === 'lg' ? 'py-2' : 'py-1',
            className,
        )}
        disabled={disabled}
        id={id}
        {...(isLink ? { href, target: '_blank' } : { onClick, type: 'button' })}
        >
            {label}
            </Tag>
    );

}