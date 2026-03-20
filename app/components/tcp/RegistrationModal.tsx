'use client'

import { useState, FormEvent, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/tcp/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Error al enviar el formulario')

      setIsSuccess(true)
    } catch {
      setError('Hubo un error al enviar el formulario. Por favor intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({ nombre: '', apellido: '', telefono: '', email: '' })
    setIsSuccess(false)
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg p-8 md:p-12">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-black hover:opacity-60 transition-opacity cursor-pointer"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">
              ¡Gracias por registrarte a Testigos Con Poder 2026!
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8">
              Hemos recibido tus datos, te enviaremos más información por email. ¡Dios te bendiga!
            </p>
            <a
              href="https://www.instagram.com/emuba_escuela/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="inline-block border-2 border-black px-10 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Seguinos en Instagram
            </a>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
              Registrate
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-8">
              Registrate y llevate un descuento exclusivo
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nombre" className="block text-xs uppercase tracking-widest font-semibold mb-2">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="apellido" className="block text-xs uppercase tracking-widest font-semibold mb-2">
                  Apellido
                </label>
                <input
                  id="apellido"
                  type="text"
                  required
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Tu apellido"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-xs uppercase tracking-widest font-semibold mb-2">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Tu teléfono"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest font-semibold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="Tu email"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border-2 border-black py-4 text-sm uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
