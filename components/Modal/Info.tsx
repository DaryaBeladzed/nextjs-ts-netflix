import { useRecoilValue } from 'recoil'
import { modalGenresState, modalMovieState } from '../../atoms/modalAtoms'

const Info = () => {
  const currentMovie = useRecoilValue(modalMovieState)
  const genres = useRecoilValue(modalGenresState)

  return (
    <div className="flex flex-col space-y-6 rounded-b-md bg-[#181818] px-10 py-8 text-lg">
      <div className="flex items-center space-x-2 text-sm">
        <p className="font-semibold text-green-400">
          {currentMovie!.vote_average * 10}% Match
        </p>
        <p className="font-light">
          {currentMovie?.release_date || currentMovie?.first_air_date}
        </p>
        <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
          HD
        </div>
      </div>
      <div className="flex flex-col gap-y-4 gap-x-3 font-light md:flex-row">
        <p className="w-5/6">{currentMovie?.overview}</p>
        <div className="flex flex-col space-y-3 text-sm">
          <div>
            <span className="text-[gray]">Genres:</span>{' '}
            {genres.map((genre) => genre.name).join(', ')}
          </div>

          <div>
            <span className="text-[gray]">Original language:</span>{' '}
            {currentMovie?.original_language}
          </div>

          <div>
            <span className="text-[gray]">Total votes:</span>{' '}
            {currentMovie?.vote_count}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
