// import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Row from '../components/Category/Row'
import Header from '../components/Headers/Header'
import useAuth from '../hooks/useAuth'
import { Category, Movie } from '../typing'
import { GetServerSidePropsContext } from 'next'
import Modal from '../components/Modal/Modal'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { modalModeState } from '../atoms/modalAtoms'
import { Product } from '@stripe/firestore-stripe-payments'
import PlansPage from '../components/Plans/PlansPage'
import { plansState } from '../atoms/paymentAtoms'
import { useEffect } from 'react'
import useSubscription from '../hooks/useSubscription'
import { myListListener } from '../utils/api/myListApi'
import { myListState } from '../atoms/myListAtoms'
import { checkUser } from '../utils/api/authApi'
import { getCategories, getPlans } from '../utils/api/contentApi'

interface Props {
  data: Category<Movie[]>[]
  plans: Product[]
}

const Home = ({ data, plans }: Props) => {
  const { loading, user } = useAuth()
  const modalMode = useRecoilValue(modalModeState)
  const setPlans = useSetRecoilState(plansState)
  const subscription = useSubscription(user)
  const [myList, setMyList] = useRecoilState(myListState)

  useEffect(() => setPlans(plans), [])

  useEffect(() => {
    if (!user) return
    myListListener(user.uid, setMyList)
  }, [user])

  if (loading || subscription === null || !user) return null

  if (!subscription) return <PlansPage />

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        modalMode && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Netflix - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:pl-16">
        <Banner
          netflixOriginals={data.filter((cat) => cat.title === '')[0].movies}
        />
        <section className="md:space-y-24 lg:mt-10 xl:mt-20">
          {myList.length !== 0 && <Row title="My List" movies={myList} />}
          {data
            .filter((cat) => cat.title !== '')
            .map((cat) => (
              <Row key={cat.title} title={cat.title} movies={cat.movies} />
            ))}
        </section>
      </main>

      {modalMode && <Modal />}
    </div>
  )
}

export default Home

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

  // check subscription
  const plans = await getPlans()

  const data = await getCategories()

  return {
    props: {
      data,
      plans,
    },
  }
}
