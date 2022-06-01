import { Subscription } from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import { useState } from 'react'
import { goToBillingPortal } from '../utils/stripe'
import Loader from './Loader'

const MembershipBlock = ({
  subscription,
  user,
}: {
  subscription: Subscription | null
  user: User | null
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="accountBlock mt-6 gap-y-4 gap-x-4">
      <div className="space-y-2 self-start">
        <h4 className="text-[gray]">Membership & Billing</h4>
        <button
          className="h-10 w-full max-w-[200] bg-gray-300 py-1.5 px-5 text-xs font-semibold text-black shadow-md hover:bg-gray-200"
          disabled={isLoading || !subscription}
          onClick={() => {
            setIsLoading(true)
            goToBillingPortal()
          }}
        >
          {isLoading ? (
            <Loader color="fill-[#e50914]" />
          ) : (
            'Cancel Membership'
          )}
        </button>
      </div>
      <div className="w-full space-y-3 divide-y divide-[gray] divide-opacity-20 md:w-[70%]">
        <div className="accountInfoBlock">
          <div>
            <b className="font-medium text-white">{user?.email}</b>
            <p className="text-[gray]">Password: ********</p>
          </div>
          <div className="flex flex-col md:items-end">
            <p className="blueLink">Change email</p>
            <p className="blueLink">Change password</p>
          </div>
        </div>
        <div className="accountInfoBlock pt-3">
          <p>
            {subscription?.cancel_at_period_end
              ? 'Your membership will end on'
              : 'Your next billing date is'}{' '}
            {subscription?.current_period_end}
          </p>
          <div className="flex flex-col md:items-end md:text-right">
            <p className="blueLink">Manage payment info</p>
            <p className="blueLink">Add backup payment method</p>
            <p className="blueLink">Billing Details</p>
            <p className="blueLink">Chnage billing date</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembershipBlock
