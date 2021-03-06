import type { NextPage } from 'next'
import Head from 'next/head'
import { Room } from '../types/app';
import Auth from '../components/Auth';
import { Logo } from '../components/Branding';
import { useRouter } from 'next/dist/client/router';

type IProps = {}

const Home: NextPage<IProps> = () => {
  const router = useRouter();
  return (
    <div className='bg-adhdPurple min-h-screen'>
      <Head>
        <title>Leader sign in - ADHD Together</title>
        <meta name="description" content="Session rooms for ADHD Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='max-w-5xl mx-auto p-5 space-y-4 py-7'>
        <header className='text-center'>
          <span className='inline-block'><Logo /></span>
        </header>
        <Auth redirectTo={'/'} />
      </main>
    </div>
  )
}

export default Home
