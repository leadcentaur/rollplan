import React from "react";
import cx from 'clsx'
import { TextElement, TextSize } from "./Text";

export type LinkLocations = '/features' | '/about' | '/home' | '/community' | '/login' | '/product'
export type LinkVariant = 'navbar' | 'cta' | 'getstarted' | 'login'

export interface LinkProps { 
    size?: TextSize;
    linkvariant?: LinkVariant;
    href: string;
    children: React.ReactNode;
    className?: string;
}

const variants: Record<LinkVariant, string> = {
    navbar: "hover:text-red-400 transition ease-in-out delay-20 transition-duration-20 text-white-200 font-jakarta-sans",
    cta: "inline-flex px-3 py-2 sm:px-3 mt-5 sm:py-2 rounded-md bg-red-500 text-white-500 hover:text-white-500 hover:scale-105 md:text-lg ",
    getstarted: "mr-3 font-jakarta-sans hidden p-3 px-6 pt-2 text-white-200 bg-red-500 rounded-lg hover:bg-brightRedLight md:block",
    login: "mr-3 font-jakarta-sans hidden p-3 px-6 pt-2 text-white-200 bg-gray-800 rounded-lg hover:bg-brightRedLight md:block"
}

export default function Link({linkvariant = 'cta', href, children}: LinkProps) {
    return (
        <a href={href}  className={variants[linkvariant]}>
            {children}
        </a>
    );
}