import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { getAllRooms, useRooms } from '../data/room';
import { Room, RoomPermissionType } from '../types/app';
import RoomList from '../components/Rooms';
import Auth from '../components/Auth';
import { useUser } from '../data/auth';
import { Header, Loading } from '../components/Layout';
import { Fragment, useState } from 'react';
import CreateRoomModal from '../components/CreateRoom';
import Link from 'next/link';

type IProps = {
  rooms: Room[]
}

type IQuery = {}

const About: NextPage<IProps> = ({ rooms }) => {
  const { user, isLoggedIn, profile, permissions, signIn } = useUser()
  const [roomOpen, setRoomOpen] = useState(false)
  const _rooms = useRooms(rooms)

  return (
    <div className='bg-gray-100 min-h-screen w-screen'>
      <Head>
        <title>ADHD Together</title>
        <meta name="description" content="Session rooms for ADHD Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
            <h1></h1>
<center><h1>About Us</h1></center>
      <main className='max-w-lg mx-auto py-5 relative space-y-5'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic blanditiis voluptatem suscipit nostrum! Molestiae ex quaerat ratione unde nesciunt, beatae sed asperiores suscipit dolorem reiciendis fuga facere, quisquam, enim quam.
        <img src="https://www.optimizely.com/contentassets/d40102e25ce745e19315e89748354bf2/hero-image-example.png"/>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio molestiae harum non voluptatem explicabo repellat perferendis nesciunt ullam qui quibusdam assumenda illum dolor error reiciendis necessitatibus, doloremque odit. Ea, debitis!
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IProps, IQuery> = async (context) => {
  return {
    props: {
      rooms: await getAllRooms()
    }
  }
}

export default About