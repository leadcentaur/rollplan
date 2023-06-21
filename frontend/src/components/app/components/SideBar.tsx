import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
  }

export default function SideBar({sidebarOpen, setSidebarOpen}: SidebarProps) {

    const router = useRouter();

    return (
        <aside
        className={`absolute left-0 top-0 z-9999 w-72.5 flex h-screen flex-col overflow-y-hidden bg-gradient-to-b from-slate-900 to-slate-600 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        
        <div className="flex items-center justify-between gap-2 px-7 py-5.5 lg:py-6.5">
            <Link href="/app">
                        <Image
                            src="https://i.imgur.com/akxtDmO.png"
                            alt="Flow Blog logo"
                            className='lg:ml-r-5l mb-1 mt-5 lg:absolute lg:-translate-y-8'
                            width={220}
                            height={100}
                        />
            </Link>
            
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white-500">
              MENU
            </h3>
        </div>
        </nav>
        </div>
      </aside>
    );
}