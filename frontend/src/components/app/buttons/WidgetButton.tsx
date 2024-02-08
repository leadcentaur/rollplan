import Button from "@/components/site/ui/typography/Button";
import { ComponentProps } from "react";

interface WidgetButtonProps {
    className?: string;
    buttonTitle: string;
    onClick?: () => void;
}

export default function WidgetButton({className, buttonTitle, onClick, ...props}: WidgetButtonProps & ComponentProps<"button">) {
    return (
        <button
        {...props}
        className={!className ? `inline-flex items-center rounded-full bg-red-400 opacity-90 text-white-500 py-1 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10` : `${className}`}
      >
        <span className="font-semibold">
            {buttonTitle}
        </span>
      </button>
    );
}