'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const DEFAULT_PRESALE_END = '2026-07-31T23:59:59-03:00'

export default function GenZRegistration({
  pixelFontClassName,
}: {
  pixelFontClassName: string
}) {
  const router = useRouter()
  const targetDate = useMemo(
    () => new Date(process.env.NEXT_PUBLIC_GENZ_PRESALE_END || DEFAULT_PRESALE_END),
    []
  )

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [promoEnded, setPromoEnded] = useState(false)
  const [formData, setFormData] = useState({
    nombreApellido: '',
    email: '',
    telefono: '',
    edad: '',
    iglesia: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDate.getTime() - Date.now()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
        setPromoEnded(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setPromoEnded(true)
      }
    }

    updateCountdown()
    const interval = window.setInterval(updateCountdown, 1000)

    return () => window.clearInterval(interval)
  }, [targetDate])

  const formatNumber = (num: number) => String(num).padStart(2, '0')

  const scrollToForm = () => {
    document.getElementById('genz-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/genz/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'No pudimos enviar el formulario')
      }

      router.push('/genz/gracias')
    } catch {
      setError('Hubo un error al enviar el formulario. Intentá de nuevo en unos segundos.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className={`min-h-screen bg-black text-white ${pixelFontClassName}`}>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden overflow-y-auto">
        <div className="relative h-[100svh] w-[calc(100svh*1081/1921)] min-w-full overflow-visible [container-type:size] md:aspect-[1920/1081] md:h-auto md:min-w-0 md:w-screen md:max-w-[calc(100svh*1920/1081)]">
          <Image
            src="/genz/Pre sale Gen z Flyer.jpeg"
            alt="Gen Z Game Over Pre Sale"
            fill
            priority
            sizes="100vw"
            className="hidden object-contain md:block"
          />
          <Image
            src="/genz/Pre Sale Gen Z Mobile.jpeg"
            alt="Gen Z Game Over Pre Sale"
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
          />

          <div className="absolute left-1/2 top-[29.5cqh] z-10 flex w-[68cqw] max-w-[300px] -translate-x-1/2 flex-col gap-1.5 md:static md:mt-0 md:contents md:w-auto md:max-w-none md:translate-x-0 md:pb-0">
            <form
              id="genz-form"
              onSubmit={handleSubmit}
              className="w-full border-2 border-red-500/80 bg-black/75 p-2 shadow-[0_0_28px_rgba(239,68,68,0.45)] backdrop-blur-sm md:absolute md:right-[11cqw] md:top-[29cqh] md:w-[27cqw] md:max-w-none md:p-[1.1cqw]"
            >
              <div className="mb-2 hidden justify-end md:mb-4 md:flex">
                <div className="text-right font-black uppercase leading-none">
                  <p className="text-yellow-300 md:text-[0.85cqw]">Pre Sale</p>
                  <p className="text-white md:text-[1.35cqw]">Registro</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 md:grid-cols-1 md:gap-3">
                <label className="col-span-2 grid min-w-0 gap-1 text-[7px] font-black uppercase tracking-normal text-white md:col-span-1 md:gap-1.5 md:text-[0.52cqw]">
                  Nombre y apellido
                  <input
                    type="text"
                    required
                    value={formData.nombreApellido}
                    onChange={(event) =>
                      setFormData({ ...formData, nombreApellido: event.target.value })
                    }
                    className="h-7 w-full min-w-0 border-2 border-white/25 bg-white px-2 text-[8px] font-normal text-black outline-none transition placeholder:text-gray-500 focus:border-yellow-300 md:h-[3.1cqh] md:px-[0.8cqw] md:text-[0.55cqw]"
                    placeholder="Tu nombre y apellido"
                  />
                </label>

                <label className="col-span-2 grid min-w-0 gap-1 text-[7px] font-black uppercase tracking-normal text-white md:col-span-1 md:gap-1.5 md:text-[0.52cqw]">
                  Email
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                    className="h-7 w-full min-w-0 border-2 border-white/25 bg-white px-2 text-[8px] font-normal text-black outline-none transition placeholder:text-gray-500 focus:border-yellow-300 md:h-[3.1cqh] md:px-[0.8cqw] md:text-[0.55cqw]"
                    placeholder="tu@email.com"
                  />
                </label>

                <label className="col-span-2 grid min-w-0 gap-1 text-[7px] font-black uppercase tracking-normal text-white md:col-span-1 md:gap-1.5 md:text-[0.52cqw]">
                  Teléfono
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(event) =>
                      setFormData({ ...formData, telefono: event.target.value })
                    }
                    className="h-7 w-full min-w-0 border-2 border-white/25 bg-white px-2 text-[8px] font-normal text-black outline-none transition placeholder:text-gray-500 focus:border-yellow-300 md:h-[3.1cqh] md:px-[0.8cqw] md:text-[0.55cqw]"
                    placeholder="11 1234 5678"
                  />
                </label>

                <label className="grid min-w-0 gap-1 text-[7px] font-black uppercase tracking-normal text-white md:gap-1.5 md:text-[0.52cqw]">
                  Edad
                  <input
                    type="number"
                    required
                    min="10"
                    max="120"
                    inputMode="numeric"
                    value={formData.edad}
                    onChange={(event) =>
                      setFormData({ ...formData, edad: event.target.value })
                    }
                    className="h-7 w-full min-w-0 border-2 border-white/25 bg-white px-2 text-[8px] font-normal text-black outline-none transition placeholder:text-gray-500 focus:border-yellow-300 md:h-[3.1cqh] md:px-[0.8cqw] md:text-[0.55cqw]"
                    placeholder="Tu edad"
                  />
                </label>

                <label className="grid min-w-0 gap-1 text-[7px] font-black uppercase tracking-normal text-white md:gap-1.5 md:text-[0.52cqw]">
                  Iglesia
                  <input
                    type="text"
                    required
                    value={formData.iglesia}
                    onChange={(event) =>
                      setFormData({ ...formData, iglesia: event.target.value })
                    }
                    className="h-7 w-full min-w-0 border-2 border-white/25 bg-white px-2 text-[8px] font-normal text-black outline-none transition placeholder:text-gray-500 focus:border-yellow-300 md:h-[3.1cqh] md:px-[0.8cqw] md:text-[0.55cqw]"
                    placeholder="Tu iglesia"
                  />
                </label>
              </div>

              {error && <p className="mt-3 text-[8px] text-red-200">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-9 w-full cursor-pointer border-2 border-yellow-300 bg-red-600 px-3 text-[8px] font-black uppercase tracking-normal text-white shadow-[0_0_18px_rgba(250,204,21,0.45)] transition hover:bg-yellow-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-60 md:mt-[1.4cqh] md:h-[3.4cqh] md:text-[0.58cqw]"
              >
                {isSubmitting ? 'Enviando...' : 'Registrarme'}
              </button>
            </form>
            <CountdownButton
              promoEnded={promoEnded}
              timeLeft={timeLeft}
              formatNumber={formatNumber}
              onClick={scrollToForm}
              pixelFontClassName={pixelFontClassName}
              className="w-full md:hidden"
            />
          </div>
          <CountdownButton
            promoEnded={promoEnded}
            timeLeft={timeLeft}
            formatNumber={formatNumber}
            onClick={scrollToForm}
            pixelFontClassName={pixelFontClassName}
            className="hidden md:absolute md:right-[11cqw] md:top-[15cqh] md:block md:w-[27cqw] md:max-w-none"
          />
        </div>
      </section>
    </main>
  )
}

function CountdownButton({
  promoEnded,
  timeLeft,
  formatNumber,
  onClick,
  pixelFontClassName,
  className = '',
}: {
  promoEnded: boolean
  timeLeft: TimeLeft
  formatNumber: (num: number) => string
  onClick: () => void
  pixelFontClassName: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`z-30 max-w-[320px] cursor-pointer border-2 border-red-500/80 bg-black/85 px-2 py-2 text-white shadow-[0_0_28px_rgba(239,68,68,0.5)] backdrop-blur-md transition hover:border-yellow-300 md:max-w-[360px] md:px-[0.8cqw] md:py-[0.75cqh] ${className}`}
    >
      <span className="mb-1 block text-center text-[8px] font-black uppercase tracking-[0.16em] text-yellow-300 md:mb-2 md:text-[0.7cqw]">
        {promoEnded ? 'Pre sale finalizada' : 'Pre sale termina en'}
      </span>
      <span className="grid grid-cols-4 gap-1 text-center md:gap-2">
        {[
          ['Días', timeLeft.days],
          ['Horas', timeLeft.hours],
          ['Min', timeLeft.minutes],
          ['Seg', timeLeft.seconds],
        ].map(([label, value]) => (
          <span key={label} className="block border border-white/20 bg-white px-1 py-1 text-black md:px-2 md:py-[0.65cqh]">
            <span
              className={`block text-sm font-black tabular-nums md:text-[1.35cqw] ${pixelFontClassName}`}
              style={{
                WebkitFontSmoothing: 'none',
                textShadow: '1px 0 0 #ef4444, -1px 0 0 #38bdf8',
              }}
            >
              {label === 'Días' ? value : formatNumber(Number(value))}
            </span>
            <span className="block text-[7px] font-black uppercase tracking-wide md:text-[0.65cqw]">
              {label}
            </span>
          </span>
        ))}
      </span>
    </button>
  )
}
