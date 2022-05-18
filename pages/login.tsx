import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { firebaseAdmin } from '../firebaseAdmin'

interface Inputs {
  email: string
  password: string
}

const login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              className="custInput"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="errorP">Please enter a valid email.</p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              className="custInput"
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 60,
              })}
            />
            {errors.password && (
              <p className="errorP">
                Your password must contain between 6 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          type="submit"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            className="font-semibold text-white hover:underline"
            type="submit"
            onClick={() => setLogin(false)}
          >
            Sign Up now
          </button>
        </div>
      </form>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)
    await firebaseAdmin.auth().verifyIdToken(cookies.token)
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
