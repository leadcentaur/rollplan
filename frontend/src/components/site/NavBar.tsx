import React, { useState } from 'react';
import cx, { clsx } from 'clsx';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { User } from '@/models/user';
import profilePicPlaceholder from "@/assets/images/profile-pic-placeholder.png";
import * as UsersApi from "@/network/api/users"
import Button from './ui/typography/Button';

function routeGuard(router: NextRouter): boolean {
	if (!router.pathname.includes("app")) {
		return true;
	}
	return false
}

export default function NavBar() {
	
	const router = useRouter();
	const { user } = useAuthenticatedUser();
    const [mobileMenuSate, setMobileMenuState] = useState(false);

    return routeGuard(router) ? (
        <nav className="sticky top-0 z-50 overflow relative px-5 py-5 flex justify-between items-center bg-black-500">
					<Link href='/' className='text-3xl  font-bold leading-none mt-1 mr-1 pr-1'>
                        <Image
                            src="https://i.imgur.com/akxtDmO.png"
                            alt="Flow Blog logo"
                            className='lg:ml-r-5l mb-1 lg:absolute lg:-translate-y-8'
                            width={200}
                            height={100}
                        />
					</Link>
				<div className="lg:hidden lg:inline-block ml-auto">
					<button className="navbar-burger flex items-center p-3">
						<svg fill='red' className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<title>Mobile menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</button>
				</div>
				<ul className="relative hidden transform -translate-y-0 translate-x-24 pl-20 overflow-hidden lg:flex lg:ml-10 lg:flex lg:space-x-2">

					<li><Link href='/support' className='hover:text-red-400 transition ease-in-out delay-20 transition-duration-20 text-white-200'>Support</Link></li>
					<li className="text-gray-300">
						
					</li>
					<li><Link href='/privacy' className='hover:text-red-400 transition ease-in-out delay-20 transition-duration-20 text-white-200'>Privacy</Link></li>
					<li><Link href='/blog' className='hover:text-red-400 transition ease-in-out delay-20 transition-duration-20 text-white-200'>Blog</Link></li>

				</ul>
				
				{user ? <NavBarLoggedInview user={user}/> : <NavBarLoggedOutView/>}
                   
			</nav>
    ) :
	null
}

interface LoggedInViewProps {
	user: User
}

function NavBarLoggedInview({user}: LoggedInViewProps){

	const router = useRouter();
	const { mutateUser } = useAuthenticatedUser();

	async function logout() {
		try {
			await UsersApi.logout();
			mutateUser(null);
			router.push("/");

		} catch (error) {
			
		}
	}

	return (
		<div className='lg:inline-block lg:ml-auto shrink-0 flex-none'>
			<Link href="#" className='hidden lg:inline-block py-2 px-6 bg-siteGray-800 hover:bg-siteGray-600 text-sm text-white-500 font-jakarta-sans rounded-xl transition duration-200' onClick={logout}>Logout</Link>
		</div>

	);
}

function NavBarLoggedOutView() {
	return (
		<div className='lg:inline-block lg:ml-auto shrink-0 flex-none'>
			<Link className='hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white-500 font-jakarta-sans rounded-xl transition duration-200' href="/signup">Get started</Link>
			<Link className='hidden lg:inline-block py-2 px-6 bg-siteGray-800 hover:bg-siteGray-600 text-sm text-white-500 font-jakarta-sans rounded-xl transition duration-200' href="/login">Login</Link>
		</div>
	);
}