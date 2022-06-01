import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil'
import { modalModeState, modalMovieState } from '../../atoms/modalAtoms'
import { Movie } from '../../typing'

interface Props {
  movie: Movie | DocumentData
}

const Thumbnail = ({ movie }: Props) => {
  const setModalMode = useSetRecoilState(modalModeState)
  const setModalMovie = useSetRecoilState(modalMovieState)

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setModalMode(true)
        setModalMovie(movie)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        className="rounded-sm object-cover md:rounded"
        // objectFit="cover"
      />
    </div>
  )
}

export default Thumbnail
