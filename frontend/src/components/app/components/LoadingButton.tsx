import { ReactNode } from "react";
import { ComponentProps } from "react";
import Spinner from "@/components/site/ui/typography/Spinner";

interface LoadingButtonProps {
    isLoading: boolean,
    children: ReactNode,
}

export default function LoadingButton({isLoading, children, ...props}: LoadingButtonProps &  ComponentProps<"button">) {
    return (

            <button {...props} disabled={isLoading || props.disabled} className="inline-flex items-center justify-center rounded-md border border-meta-3 py-4 px-10 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">
            { isLoading && 
                <>
                    <Spinner/>
                </>
            }
            {children}
            </button>


    );
}