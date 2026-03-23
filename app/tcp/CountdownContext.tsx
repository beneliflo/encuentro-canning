'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CountdownContextType {
  isSecondPhase: boolean
}

const CountdownContext = createContext<CountdownContextType | undefined>(undefined)

export function CountdownProvider({ children }: { children: ReactNode }) {
  const [isSecondPhase, setIsSecondPhase] = useState(false)

  useEffect(() => {
    // First target: Monday March 23, 2026 at 11:59 PM GMT-3
    const firstTargetDate = new Date('2026-03-23T23:59:59-03:00')

    const checkPhase = () => {
      const now = new Date()
      const shouldBeSecondPhase = now.getTime() >= firstTargetDate.getTime()
      
      // If transitioning from first to second phase, refresh the page
      if (!isSecondPhase && shouldBeSecondPhase) {
        // Store in sessionStorage to prevent infinite refresh loop
        const hasRefreshed = sessionStorage.getItem('tcp_phase_refreshed')
        if (!hasRefreshed) {
          sessionStorage.setItem('tcp_phase_refreshed', 'true')
          window.location.reload()
          return
        }
      }
      
      setIsSecondPhase(shouldBeSecondPhase)
    }

    checkPhase()
    const interval = setInterval(checkPhase, 1000)

    return () => clearInterval(interval)
  }, [isSecondPhase])

  return (
    <CountdownContext.Provider value={{ isSecondPhase }}>
      {children}
    </CountdownContext.Provider>
  )
}

export function useCountdown() {
  const context = useContext(CountdownContext)
  if (context === undefined) {
    throw new Error('useCountdown must be used within a CountdownProvider')
  }
  return context
}
