import React, { CSSProperties } from 'react';
import cx from 'clsx';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconType } from 'react-icons/lib';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IconProps extends FontAwesomeIconProps {
	className?: string;
	style?: CSSProperties;
}

export default function Icon({ className, style, ...props }: IconProps) {
	return (
		<span className={cx(`inline-block`, className)} aria-hidden="true" style={style}>
			<FontAwesomeIcon {...props} />
		</span>
	);
}

export function PackageIcon({ className, style, ...props }: IconProps) {
	return (
		<span>
			<FontAwesomeIcon {...props} className='m-2 p-3 text-red-500 h-24 w-24 rounded-md  border-gray-200 object-cover object-center'/>
		</span>
	);
}