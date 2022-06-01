import Link from 'next/link'
import React from 'react'
import useAuth from '../../hooks/useAuth'

const LogoutHeader = () => {
  const { logout } = useAuth()
  return (
    <header className="border-b border-white/10 bg-[#141414]">
      <Link href="/">
        <img
          src="https://rb.gy/ulxxee"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
      </Link>
      <button className="text-lg font-medium hover:underline" onClick={logout}>
        Sign Out
      </button>
    </header>
  )
}

export default LogoutHeader
