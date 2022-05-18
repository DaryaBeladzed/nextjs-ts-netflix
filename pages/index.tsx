// import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Row from '../components/Category/Row'
import Header from '../components/Header'
import { categories } from '../constants/movie'
import useAuth from '../hooks/useAuth'
import { Category } from '../typing'
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { firebaseAdmin } from '../firebaseAdmin'
import Modal from '../components/Modal/Modal'
import { useRecoilValue } from 'recoil'
import { modalModeState } from '../atoms/modalAtoms'

interface Props {
  data: Category[]
}

const Home = ({ data }: Props) => {
  const { loading } = useAuth()
  const modalMode = useRecoilValue(modalModeState)

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      {loading && <p>Loading...</p>}
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
    const cookies = nookies.get(ctx)
    await firebaseAdmin.auth().verifyIdToken(cookies.token)
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const promises = Object.values(categories).map((category, ind) =>
    fetch(category.path)
      .then((res) => res.json())
      .then((data) => ({
        title: category.title,
        movies: data.results,
      }))
  )
  const data = await Promise.all(promises)

  return {
    props: {
      data,
    },
  }
}
