import React from 'react'
import { useRecoilValue } from 'recoil'
import { plansState } from '../../atoms/paymentAtoms'
import PlanBox from './PlanBox'
import Table from './Table'

const PlansTable = React.memo(() => {
  const plans = useRecoilValue(plansState)

  return (
    <>
      <div
        className={`flex w-full justify-between self-end md:w-[60%] md:justify-around`}
      >
        {plans.map((plan) => (
          <PlanBox key={plan.id} plan={plan} />
        ))}
      </div>
      <Table plans={plans} />
    </>
  )
})

export default PlansTable
