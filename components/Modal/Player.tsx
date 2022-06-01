import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player/lazy'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { modalGenresState, modalMovieState } from '../../atoms/modalAtoms'
import { myListState } from '../../atoms/myListAtoms'
import useAuth from '../../hooks/useAuth'
import { VideoType } from '../../typing'
import toast from 'react-hot-toast'
import {
  addToMyList,
  getModalMovie,
  removeFromMyList,
} from '../../utils/api/myListApi'

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '15px',
  borderRadius: '9999px',
  maxWidth: '1000px',
}

const Player = () => {
  const [muted, setMuted] = useState(false)
  const [trailer, setTrailer] = useState(null)
  const currentMovie = useRecoilValue(modalMovieState)
  const setGenres = useSetRecoilState(modalGenresState)
  const [isAddedToMyList, setIsAddedToMyList] = useState(false)
  const myList = useRecoilValue(myListState)
  const { user } = useAuth()

  useEffect(() => {
    const fetchCurrentMovie = async () => {
      const res = await getModalMovie(currentMovie!)

      setTrailer(
        res?.videos.results.find((video: VideoType) => video.type === 'Trailer')
          ?.key
      )

      setGenres(res?.genres)
    }

    fetchCurrentMovie()
  }, [])

  useEffect(() => {
    setIsAddedToMyList(
      myList.findIndex((movie) => movie.id === currentMovie?.id) !== -1
    )
  }, [myList, currentMovie])

  const addToMyListHandler = async () => {
    try {
      if (!isAddedToMyList) {
        await addToMyList(user!, currentMovie!)
        setIsAddedToMyList(true)
        toast(
          `${
            currentMovie?.title ||
            currentMovie?.name ||
            currentMovie?.original_name
          } has been added to My List`,
          {
            style: toastStyle,
            duration: 8000,
          }
        )
      } else {
        await removeFromMyList(user!, currentMovie!.id)
        setIsAddedToMyList(false)
        toast(
          `${
            currentMovie?.title ||
            currentMovie?.name ||
            currentMovie?.original_name
          } has been removed from My List`,
          {
            style: toastStyle,
            duration: 8000,
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="relative pt-[56.25%]">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer}`}
        // config={{
        //   youtube: {
        //     playerVars: { modestbranding: 1 },
        //   },
        //   file: {
        //     attributes: {
        //       controlsList: 'nofullscreen',
        //     },
        //   },
        // }}
        // controls
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
          <button className="modalBtn" onClick={addToMyListHandler}>
            {isAddedToMyList ? (
              <CheckIcon className="h-7 w-7" />
            ) : (
              <PlusIcon className="h-7 w-7" />
            )}
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
