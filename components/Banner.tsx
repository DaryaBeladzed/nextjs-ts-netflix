import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/movie'
import { Movie } from '../typing'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  console.log(movie)

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[70vh] lg:justify-end lg:pb-12 2xl:h-[65vh]">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-xl 2xl:max-w-2xl 2xl:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bunnerBtn bg-white text-black">
          <FaPlay className="h-4 w-4 md:h-5 md:w-5 2xl:h-7 2xl:w-7" />
          Play
        </button>
        <button className="bunnerBtn bg-[gray]/70">
          More info
          <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner
