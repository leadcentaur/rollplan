import clsx from "clsx";
import { ComponentProps } from "react";

interface PaginationBarProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Pagination({children, className}: PaginationBarProps & ComponentProps<"button">) {
    return (
        <div className={className || ""}>
            {children}
        </div>
    );
}