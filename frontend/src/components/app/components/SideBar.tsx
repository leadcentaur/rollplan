import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
  }

export default function SideBar({sidebarOpen, setSidebarOpen}: SidebarProps) {


    return (
        <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-red-500 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
            <Link href="/">
                        <Image
                            src="https://i.imgur.com/akxtDmO.png"
                            alt="Flow Blog logo"
                            className='lg:ml-r-5l mb-1 lg:absolute lg:-translate-y-8'
                            width={30}
                            height={30}
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