import clsx from "clsx";
import { ComponentProps } from "react";

interface PaginationBarProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Pagination({children, className}: PaginationBarProps & ComponentProps<"button">) {
    return (
        <nav aria-label="Page navigation example" className={className || ""}>
            <ul className="inline-flex -space-x-px text-sm">
                {children}
            </ul>
        </nav>
    );
}