import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { DocumentData } from 'firebase/firestore'
import { useRef, useState } from 'react'
import { Category, Movie } from '../../typing'
import Thumbnail from './Thumbnail'

const Row = ({ title, movies }: Category<Movie[] | DocumentData[]>) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const scrollHandler = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { clientWidth, scrollLeft } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeftIcon
          className={`categoryArrow left-2 ${!isMoved && 'hidden'}`}
          onClick={() => scrollHandler('left')}
        />
        <div
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="categoryArrow right-2"
          onClick={() => scrollHandler('right')}
        />
      </div>
    </div>
  )
}

export default Row
