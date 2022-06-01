import { Product } from '@stripe/firestore-stripe-payments'
import { atom, atomFamily, selector, selectorFamily } from 'recoil'

export const plansState = atom<Product[]>({
  key: 'paymentPlans',
  default: [],
})

export const activePlanState = atomFamily({
  key: 'activePlan',
  default: selectorFamily({
    key: 'activePlan/Default',
    get:
      () =>
      ({ get }) => {
        return get(plansState)[2]
      },
  }),
})
