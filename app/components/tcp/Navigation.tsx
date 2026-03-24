'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import RegistrationButton from './RegistrationButton'
import { useCountdown } from '../../tcp/CountdownContext'

type NavLinksProps = {
  isMobile?: boolean
  onLinkClick?: () => void
  isSecondPhase: boolean
}

const navLinks = [
  { href: '#oradores', label: 'Oradores' },
  { href: '#tcp2025', label: 'TCP 2025' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#faq', label: 'Preguntas Frecuentes' },
]

const NavLinks = ({ isMobile, onLinkClick, isSecondPhase }: NavLinksProps) => {
  const linkClass = isMobile
    ? 'block hover:text-gray-300 transition-colors duration-200'
    : 'hover:text-gray-300 transition-colors duration-200'

  return (
    <>
      {navLinks.map((link) => (
        <a 
          key={link.href}
          href={link.href} 
          className={linkClass}
          onClick={onLinkClick}
        >
          {link.label}
        </a>
      ))}
      {!isSecondPhase && (
        <RegistrationButton
          className={`${isMobile ? 'inline-block' : ''} cursor-pointer bg-white text-black px-4 py-2 border-2 border-white rounded-lg hover:bg-transparent hover:text-white transition-colors duration-200 uppercase`}
        >
          Registrate
        </RegistrationButton>
      )}
    </>
  )
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSecondPhase } = useCountdown()

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-xs border-b border-white/10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="h-6 md:h-8 lg:h-12">
          <Image
            src="/images/tcp/tcp-logo.png"
            alt="TCP Logo"
            width={100}
            height={20}
            className="h-full w-auto object-contain"
            priority
          />
        </div>
        <button 
          className="lg:hidden text-white" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-sm text-white font-medium uppercase tracking-wide">
          <NavLinks isSecondPhase={isSecondPhase} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden fixed inset-x-0 top-14 md:top-16 lg:top-20 bg-black/95 backdrop-blur-xs border-t border-white/10`}
      >
        <div className="container mx-auto px-4 py-6 space-y-6 text-sm text-white font-medium uppercase tracking-wide">
          <NavLinks isMobile onLinkClick={closeMobileMenu} isSecondPhase={isSecondPhase} />
        </div>
      </div>
    </header>
  )
}
