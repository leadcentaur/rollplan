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
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
config.autoAddCss = false

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {

  const { user, userLoading, userLoadingError, mutateUser } = useAuthenticatedUser();

  return (
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
        
        <main className=''>
        {user?.username}
            <Component {...pageProps} />
        </main>
      </div>

  </>
  );
}
