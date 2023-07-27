import Image from "next/image";
import Link from "next/link";


export default function MemberSignUpForm() {
    return (
        <section className="bg-gradient-to-b from-slate-900 to-slate-600 h-screen overflow-hidden scrollbar-hide">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className=""
        >
          <Image
            src="https://i.imgur.com/akxtDmO.png"
            alt="Flow Blog logo"
            className="rounded-xl p-1 m-3"
            width={200}
            height={100}
          />
        </Link>
      <div className="w-full bg-white-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Join Academy
              </h1>


          </div>
      </div>
  </div>
    </section>
    );
}