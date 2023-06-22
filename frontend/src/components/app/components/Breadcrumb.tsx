import Link from "next/link";

interface BreadCrumbProps {
    pageName: string,
}

export default function Breadcrumb({pageName}: BreadCrumbProps) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                {pageName}
            </h2>
            <nav>
                <ol className="flex items-center gap-2">
                <li>
                    <Link href="/app">Dashboard /</Link>
                </li>
                <li className="text-primary">{pageName}</li>
                </ol>
            </nav>
        </div>
    )
}