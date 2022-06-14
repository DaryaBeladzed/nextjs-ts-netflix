import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

type asyncF = (email: string, password: string) => Promise<void>

interface Props {
  signIn: asyncF,
  signUp: asyncF
}

const LoginForm = ({ signIn, signUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const [login, setLogin] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
    >
      <h1 className="text-4xl font-semibold">Sign In</h1>
      <div className="space-y-4">
        <label className="inline-block w-full">
          <input
            // type="email"
            className="custInput"
            placeholder="Email"
            aria-errormessage={errors.email ? "emailErrorId" : undefined}
            aria-invalid={errors.email ? true : false}
            {...register('email', {
              required: {
                value: true,
                message: "Email is a required field."
              }, pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })}
          />
          {errors.email && (
            <span id="emailErrorId" className="errorP">
              {/* Please enter a valid email. */}
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="inline-block w-full">
          <input
            type="password"
            className="custInput"
            placeholder="Password"
            aria-errormessage={errors.password ? "passwordErrorId" : undefined}
            aria-invalid={errors.password ? true : false}
            {...register('password', {
              required: {
                value: true,
                message: "Your password must contain between 6 and 60 characters."
              },
              minLength: {
                value: 6,
                message: "Password min length is 6"
              },
              maxLength: {
                value: 60,
                message: "Password max length is 60"
              }
            })}
          />
          {errors.password && (
            <span id="passwordErrorId" className="errorP">
              {/* Your password must contain between 6 and 60 characters. */}
              {errors.password.message}
            </span>
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
  )
}

export default LoginForm