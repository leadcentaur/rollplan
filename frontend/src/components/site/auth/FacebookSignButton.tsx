

export default function FacebookSignButton() {
    return (
        <a href={process.env.NEXT_PUBLIC_BACKEND_URL + "/users/login/facebook"}>
            <button className="text-black-500 flex w-full items-center justify-center gap-3.5 rounded-lg  bg-siteGray-100  p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-siteGray-100">
            <span>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className=""
                fill="#4267B2"
                height={24}
                width={23}

                viewBox="0 0 512 512"
                >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
            </span>
            Sign in with Facebook
            </button>
        </a>
    );
}