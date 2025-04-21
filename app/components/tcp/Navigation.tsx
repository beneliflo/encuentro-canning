'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback } from 'react'

type NavLinksProps = {
  isMobile?: boolean
  onLinkClick?: () => void
}

const navLinks = [
  { href: '#vision', label: 'Visión' },
  { href: '#info', label: 'Info' },
  { href: '#speakers', label: 'Oradores' },
  { href: '#faq', label: 'FAQ' },
]

const NavLinks = ({ isMobile, onLinkClick }: NavLinksProps) => {
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
      <Link 
        href="https://go.eventik.app/tcp2025"
        className={`${isMobile ? 'inline-block' : ''} px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors duration-200`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onLinkClick}
      >
        Comprar Entradas
      </Link>
    </>
  )
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="h-6 md:h-8 lg:h-12">
          <Image
            src="/tcp/tcp-logo.png"
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
        <div className="hidden lg:flex items-center space-x-8 text-sm text-white font-[500] uppercase tracking-wide">
          <NavLinks />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden fixed inset-x-0 top-14 md:top-16 lg:top-20 bg-black/95 backdrop-blur-sm border-t border-white/10`}
      >
        <div className="container mx-auto px-4 py-6 space-y-6 text-sm text-white font-[500] uppercase tracking-wide">
          <NavLinks isMobile onLinkClick={closeMobileMenu} />
        </div>
      </div>
    </header>
  )
}
