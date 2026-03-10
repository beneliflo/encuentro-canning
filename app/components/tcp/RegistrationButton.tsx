'use client'

import { useState } from 'react'
import RegistrationModal from './RegistrationModal'

interface RegistrationButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function RegistrationButton({ className, children }: RegistrationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={className ?? 'cursor-pointer border-2 border-black px-8 py-2 md:px-16 md:py-3 text-xs sm:text-sm md:text-xl uppercase font-semibold hover:bg-black hover:text-white transition-colors whitespace-nowrap'}
      >
        {children ?? 'Registrate'}
      </button>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
