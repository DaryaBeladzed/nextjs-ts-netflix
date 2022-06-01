import { Product } from '@stripe/firestore-stripe-payments'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import LogoutHeader from '../components/Headers/LogoutHeader'
import MembershipBlock from '../components/MembershipBlock'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { goToBillingPortal } from '../utils/stripe'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { checkUser } from '../utils/api/authApi'
import { getPlans } from '../utils/api/contentApi'

interface Props {
  plans: Product[]
}

const Account = ({ plans }: Props) => {
  const { user, logout } = useAuth()
  const subscription = useSubscription(user)
  const router = useRouter()

  useEffect(() => {
    if (subscription === undefined) {
      router.replace('/')
    }
  }, [subscription])

  if (!subscription) return null

  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogoutHeader />
      <main className="px-4 pb-12">
        <div className="mx-auto mt-24 flex  w-full max-w-6xl flex-col md:w-[60%]">
          <div className="flex flex-col gap-x-2 gap-y-2 md:flex-row">
            <h1 className="text-3xl font-semibold">Account</h1>
            <p className='flex items-center text-xs text-[gray] before:h-7 before:w-7 before:content-[url("https://rb.gy/4vfk4r")]'>
              Member since: {subscription?.created}
            </p>
          </div>
          <MembershipBlock subscription={subscription} user={user} />
          <div className="accountBlock">
            <h4 className="text-[gray]">Plan Details</h4>
            <div className="accountInfoBlock w-full md:w-[70%]">
              <p>
                {plans.find((plan) => plan.id === subscription?.product)?.name}
              </p>
              <p className="blueLink" onClick={goToBillingPortal}>
                Change plan
              </p>
            </div>
          </div>
          <div className="accountBlock">
            <h4 className="text-[gray]">Settings</h4>
            <div className="accountInfoBlock w-full md:w-[70%]">
              <p className="blueLink" onClick={logout}>
                Sign out of all devices
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    await checkUser(ctx)
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const plans = await getPlans()

  // const sub = await getCurrentUserSubscriptions(payments)
  // console.log(sub)

  return {
    props: {
      plans,
    },
  }
}

export default Account
