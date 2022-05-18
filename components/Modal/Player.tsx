import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { modalGenresState, modalMovieState } from '../../atoms/modalAtoms'
import { VideoType } from '../../typing'
import { API_KEY, BASE_URL } from '../../utils/requests'

const Player = () => {
  const [muted, setMuted] = useState(false)
  const [trailer, setTrailer] = useState(null)
  const currentMovie = useRecoilValue(modalMovieState)
  const setGenres = useSetRecoilState(modalGenresState)

  useEffect(() => {
    const fetchCurrentMovie = async () => {
      const res = await axios.get(
        `${BASE_URL}/${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'}/${
          currentMovie?.id
        }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      )

      setTrailer(
        res.data?.videos.results.find(
          (video: VideoType) => video.type === 'Trailer'
        )?.key
      )

      setGenres(res.data?.genres)
    }

    fetchCurrentMovie()
  }, [])

  return (
    <div className="relative pt-[56.25%]">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer}`}
        muted={muted}
        className="absolute top-0 left-0"
        playing
        width="100%"
        height="100%"
      />
      <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
        <div className="flex space-x-2">
          <button className="bunnerBtn bg-white text-black">
            <FaPlay className="h-4 w-4 md:h-5 md:w-5 2xl:h-7 2xl:w-7" />
            Play
          </button>
          <button className="modalBtn">
            <PlusIcon className="h-7 w-7" />
          </button>
          <button className="modalBtn">
            <ThumbUpIcon className="h-6 w-6" />
          </button>
        </div>
        <button
          className="modalBtn"
          onClick={() => setMuted((prevState) => !prevState)}
        >
          {muted ? (
            <VolumeOffIcon className="h-6 w-6" />
          ) : (
            <VolumeUpIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Player
