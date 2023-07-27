import '@/styles/global.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Plus_Jakarta_Sans } from 'next/font/google'
import NavBar from '@/components/site/NavBar'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextNprogress from "nextjs-progressbar"; 

import { faFaceRelieved } from '@fortawesome/pro-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useEffect, useState } from 'react';
import { User } from '@/models/user';
import { GetServerSideProps } from 'next';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import SideBar from '@/components/app/components/SideBar';
import * as UsersApi from "../network/api/users";
import { useRouter } from 'next/router';
config.autoAddCss = false

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps<GlobalAppProps> = async ({params}) => {
  const username = params?.username?.toString();
  if (!username) throw Error("username missing");

  const user = await UsersApi.getUserByUsername(username);
  console.log("The username: " + user.username);
  return {
    props: { user }
  }
}
  
interface GlobalAppProps {
  user: User,
}

export default function App({ Component, pageProps }: AppProps) {

  useOnboardingRedirect();

  return  (
    <>
      <Head>
        <title>Rollplan</title>
        <meta name="description" content="Rollplan roll with confidence" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={jakarta.className}>
          <NextNprogress color='#AA4A44' height={5}/>
          <NavBar/>

          <main>
              <Component {...pageProps} />
          </main>
        </div>
    </>
  )
}

function isPublicUrl(pathname: string) {
    let publicPaths = ['/login','/signup','/blog','/privacy'];
    if (publicPaths.includes(pathname)) {
      console.log(pathname + " is a public url")
      return true;
    } else {
      return false;
    }
}

function useOnboardingRedirect() {

  const { user } = useAuthenticatedUser();
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    if (!user && router.pathname.includes("/app")) {
      router.push("/login")
    }

    if (user && !user.username && router.pathname !== "/onboarding")  {
      router.push("/onboarding?returnTo=" + router.asPath)
    }
  }, [user, router])

}
