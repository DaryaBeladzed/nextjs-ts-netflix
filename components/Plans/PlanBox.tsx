import { Product } from '@stripe/firestore-stripe-payments'
import { useRecoilState } from 'recoil'
import { activePlanState } from '../../atoms/paymentAtoms'

interface Props {
  plan: Product
}

const PlanBox = ({ plan }: Props) => {
  const [activePlan, setActivePlan] = useRecoilState(activePlanState(null))
 
  return (
    <div
      className={`planBox ${
        activePlan?.id === plan.id ? 'opacity-100' : 'opacity-60'
      }`}
      onClick={() => setActivePlan(plan)}
    >
      {plan.name}
    </div>
  )
}

export default PlanBox
