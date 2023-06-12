import React from 'react'
import clsx from 'clsx'
import Link from 'next/link';


export interface CTAProps {
	children: React.ReactNode;
	href: string;
	color?: string;
}

export default function CTA({ children, href, color }: CTAProps) {
	return (
		<Link
			href={href}
			className={clsx(
				'inline-flex px-3 py-2 sm:px-3 mt-5 sm:py-2 rounded-md bg-red-500 text-white-500 transition duration-200 hover:text-white-500 hover:scale-105 md:text-lg',
				color ?? 'bg-red-500',
			)}
		>
			{children}
		</Link>
	);
}
