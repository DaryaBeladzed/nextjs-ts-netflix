import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Menu from '../Menu'

const Header = () => {
  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 0) setIsScroll(true)
      else setIsScroll(false)
    }

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <header className={`${isScroll && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <Menu />
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt="account"
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
