import Head from 'next/head'
import Image from 'next/image'
import { GetServerSidePropsContext } from 'next'
import { checkUser } from '../utils/api/authApi'
import LoginForm from '../components/Login/LoginForm'
import useAuth from '../hooks/useAuth'

const login = () => {
  const { signIn, signUp } = useAuth()
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img
        src="https://rb.gy/ulxxee"
        alt="logo"
        width={150}
        height={150}
        className="absolute top-4 left-4 cursor-pointer object-contain md:top-6 md:left-10"
      />

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 md:!block"
        objectFit="cover"
      />

      <LoginForm signIn={signIn} signUp={signUp} />
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    await checkUser(ctx)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } catch (err) {
    console.log(err)
  }

  return {
    props: {},
  }
}

export default login
