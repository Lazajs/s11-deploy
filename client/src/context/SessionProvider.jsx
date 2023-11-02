'use client'

import {createContext , useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const SessionContext = createContext({})

export default function SessionProvider ({children}) {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname().split('/')[1]

  const protectedRoutes = ['profile', 'create-event'] // Add more protected routes here, always the first part of the path (e.g. /profile)
  const isProtectedRoute = protectedRoutes.includes(pathname)

  useEffect(() => {
    if (!session) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
        credentials: 'include'
      })
      .then(res => res.ok ? res.json() : null)
      .then(setSession)
      .catch(console.error)
      .finally(() => setIsLoading(false))
    } 
  }, [session])
  
  if (protectedRoutes.includes(pathname) && !session && !isLoading) {
    window.location.href = '/'
  }

  if (!isLoading) return ( // Should return loader instead of nothing if it is loading
    <SessionContext.Provider value={[session, setSession]}>
      {isProtectedRoute && !session ? null : children}
    </SessionContext.Provider>
  ) 

  return null // Should return loader instead of nothing if it is loading
}