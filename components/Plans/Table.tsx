import { CheckIcon } from '@heroicons/react/outline'
import { Product } from '@stripe/firestore-stripe-payments'
import { useRecoilValue } from 'recoil'
import { activePlanState } from '../../atoms/paymentAtoms'
import { PLAN_PROPS } from '../../constants/plans'

interface Props {
  plans: Product[]
}

const Table = ({ plans }: Props) => {
  const activePlan = useRecoilValue(activePlanState(null))

  return (
    <table className="w-full">
      <tbody className="divide-y divide-[gray]">
        {PLAN_PROPS.map((prop) => (
          <tr key={prop.prop} className="flex flex-wrap font-medium">
            <td className="w-full p-2.5 text-center text-sm font-normal text-white md:w-[40%] md:text-left  md:text-base">
              {prop.label}
            </td>
            {plans.map((plan) => {
              switch (prop.prop) {
                case 'price': {
                  return (
                    <td
                      key={plan.id}
                      className={`tableCell ${
                        activePlan?.id === plan.id
                          ? 'text-[#E50914]'
                          : 'text-[gray]'
                      }`}
                    >
                      {plan.prices[0].currency.toUpperCase()}
                      {plan.prices[0].unit_amount! / 100}
                    </td>
                  )
                }
                case 'portability': {
                  return (
                    <td key={plan.id} className={`tableCell`}>
                      {plan.metadata[prop.prop] && (
                        <CheckIcon
                          className={`mx-auto h-6 w-6 ${
                            activePlan?.id === plan.id
                              ? 'text-[#E50914]'
                              : 'text-[gray]'
                          }`}
                        />
                      )}
                    </td>
                  )
                }
                default: {
                  return (
                    <td
                      key={plan.id}
                      className={`tableCell ${
                        activePlan?.id === plan.id
                          ? 'text-[#E50914]'
                          : 'text-[gray]'
                      }`}
                    >
                      {plan.metadata[prop.prop]}
                    </td>
                  )
                }
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
