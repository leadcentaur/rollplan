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

  const { user, userLoading, userLoadingError, mutateUser } = useAuthenticatedUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <NavBar loggedInUser={user}/>

          <main>
              <Component {...pageProps} />
          </main>
        </div>
    </>
  )
}
