// import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Row from '../components/Category/Row'
import Header from '../components/Header'
import { categories } from '../constants/movie'
import { Category } from '../typing'

interface Props {
  data: Category[]
}

const Home = ({ data }: Props) => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:pl-16">
        <Banner
          netflixOriginals={data.filter((cat) => cat.title === '')[0].movies}
        />
        <section className='md:space-y-24 lg:mt-10 xl:mt-20'>
          {data
            .filter((cat) => cat.title !== '')
            .map((cat) => (
              <Row key={cat.title} title={cat.title} movies={cat.movies} />
            ))}
        </section>
      </main>

      <footer className=""></footer>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
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
