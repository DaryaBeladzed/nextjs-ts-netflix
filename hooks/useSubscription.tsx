import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import payments from '../utils/stripe'

const useSubscription = (user: User | null) => {
  const [subscribed, setSubscribed] = useState<Subscription | null>(null)

  useEffect(() => {
    if (!user) return
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscribed(
        snapshot.subscriptions.filter(
          (subscr) => subscr.status === 'active' || subscr.status === 'trialing'
        )[0]
      )
    })
  }, [user])

  return subscribed
}

export default useSubscription
