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
import Text from '@/components/site/ui/typography/Text';
import Link from 'next/link';
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

  const router = useRouter();
  useOnboardingRedirect();

  return  (
    <>
      <Head>
        <title>Roll Plan - roll with confidence</title>
        <meta name="description" content="A content management system built specificfully for ju-jitsu academies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://rollplanbjj.com/social_media_review_image.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>

        <div className={jakarta.className}>
          <NextNprogress color='#AA4A44' height={5}/>
          <NavBar/>

          <main>
              <Component {...pageProps} />
          </main>

          { router.pathname === "/" &&
             <footer className='m-5'>
              <div className="mt-6 text-center">
                <Text size="sm" variant="muted">
                  <Link className='text-sm' href="/tos">
                    Terms of Service
                  </Link>
                  {' · '}
                  <Link className="text-sm" href="/privacy">
                    Privacy Policy
                  </Link>
                </Text>

                <Text size="sm" className='m-2' variant="muted">
                  Rollplan {new Date().getFullYear()} © 
                </Text>
              </div>
            </footer>
         } 
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

  const { user, userLoading } = useAuthenticatedUser();
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    if (!userLoading && !user && router.pathname.includes("/app")) {
      router.push("/login")
    }

    if (user && !user.username && router.pathname !== "/onboarding")  {
      router.push("/onboarding?returnTo=" + router.asPath)
    }
  }, [user, router])

}
