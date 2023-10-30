'use client'

import Icons from "./Icons"
import Link from "next/link"
import { usePathname } from "next/navigation"

const { User, Message, Heart, Ticket, Calendar, Exit } = Icons



export default function ProfileNav () {
  const pathname = usePathname()
  const currentPath = pathname.split("/").pop()
  
  const isActive = (path) => {
    return currentPath === path ? "bg-[#E7EFF7] text-[#306699] rounded-xl" : ""
  }

  const logout = () => {
    // logout
  }

  return (
    <nav className="h-fit w-fit text-[#1E1E1E] font-[400] text-[16px]">
      <ul className="flex flex-col gap-2">
        <li className={`${isActive('profile')} hover:bg-[#E7EFF7] hover:text-[#306699] hover:rounded-xl`}>
          <Link className="flex p-3 gap-2" href="/profile">
            <User />
            <span>Mi perfil</span>
          </Link>
        </li>
        <li className={`${isActive('messages')} hover:bg-[#E7EFF7] hover:text-[#306699] hover:rounded-xl`}>
          <Link className="flex p-3 gap-2" href="/profile/messages">
            <Message />
            <span>Mensajes</span>
          </Link>
        </li>
        <li className={`${isActive('favorites')} hover:bg-[#E7EFF7] hover:text-[#306699] hover:rounded-xl`}>
          <Link className="flex p-3 gap-2" href="/profile/favorites">
            <Heart />
            <span>Favoritos</span>
          </Link>
        </li>
        <li className={`${isActive('tickets')} hover:bg-[#E7EFF7] hover:text-[#306699] hover:rounded-xl`}>
          <Link className="flex p-3 gap-2" href="/profile/tickets">
            <Ticket />
            <span>Mis entradas</span>
          </Link>
        </li>
        <li className={`${isActive('calendar')} hover:bg-[#E7EFF7] hover:text-[#306699] hover:rounded-xl`}>
          <Link className="flex p-3 gap-2" href="/profile/calendar">
            <Calendar />
            <span>Mis eventos</span>
          </Link>
        </li>
        <li className='hover:bg-[#E7EFF7] hover:text-[#306699] hover:rounded-xl'>
          <div className="flex cursor-pointer p-3 gap-2" onClick={logout}>
            <Exit />
            <span>Cerrar sesión</span>
          </div>
        </li>
      </ul>
    </nav>
  )
}