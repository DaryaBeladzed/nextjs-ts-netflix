import { CheckIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { activePlanState } from '../../atoms/paymentAtoms'
import { TICKS } from '../../constants/plans'
import { loadCheckout } from '../../utils/stripe'
import LogoutHeader from '../Headers/LogoutHeader'
import Loader from '../Loader'
import PlansTable from './PlansTable'

const PlansPage = () => {
  const [isBillingLoading, setBillingLoading] = useState(false)
  const activePlan = useRecoilValue(activePlanState(null))
  
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogoutHeader />
      <main className="mx-auto max-w-5xl px-5 pt-20 pb-12 transition-all md:px-10 md:pt-28">
        <div>
          <h1 className="mb-3 text-xl font-medium md:text-2xl 2xl:text-3xl">
            Choose the plan that's right for you
          </h1>
          <ul>
            {TICKS.map((tick, ind) => (
              <li
                key={ind}
                className="flex items-center gap-x-2 text-base 2xl:text-lg"
              >
                <CheckIcon className="inline-block h-7 w-7 text-[#E50914]" />
                {tick}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col space-y-5 md:mt-4">
          <PlansTable />
          <button
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-3 text-xl shadow hover:bg-[#f6121d] md:w-[420px] 2xl:py-4 ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={() => {
              setBillingLoading(true)
              loadCheckout(activePlan.prices[0].id)
            }}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

export default PlansPage
