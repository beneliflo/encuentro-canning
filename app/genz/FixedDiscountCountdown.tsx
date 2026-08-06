'use client'

import { useEffect, useMemo, useState } from 'react'

type DiscountPhase = {
  label: string
  discount: string
  startsAt: Date
  endsAt: Date
}

const DISCOUNT_PHASES: DiscountPhase[] = [
  {
    label: 'PRE SALE TERMINA EN',
    discount: 'Pre Sale',
    startsAt: new Date('2026-01-01T00:00:00-03:00'),
    endsAt: new Date('2026-07-06T23:59:59-03:00'),
  },
  {
    label: '30% OFF TERMINA EN',
    discount: '30% OFF',
    startsAt: new Date('2026-07-07T00:00:00-03:00'),
    endsAt: new Date('2026-07-31T23:59:59-03:00'),
  },
  {
    label: '15% OFF TERMINA EN',
    discount: '15% OFF',
    startsAt: new Date('2026-08-01T00:00:00-03:00'),
    endsAt: new Date('2026-08-28T23:59:59-03:00'),
  },
  {
    label: '29/08 EN PUERTA',
    discount: 'Entrada en puerta',
    startsAt: new Date('2026-08-29T00:00:00-03:00'),
    endsAt: new Date('2026-08-29T23:59:59-03:00'),
  },
]

const TICKET_URL = 'https://emuba.fint.app/eventos/gen-z-2026'
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

function getPhase(now: Date) {
  return DISCOUNT_PHASES.find((phase) => now >= phase.startsAt && now <= phase.endsAt)
}

function getTimeLeft(now: Date, endsAt?: Date) {
  const difference = endsAt ? Math.max(0, endsAt.getTime() - now.getTime()) : 0

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  }
}

export default function FixedDiscountCountdown({
  pixelFontClassName,
}: {
  pixelFontClassName: string
}) {
  const [now, setNow] = useState<Date | null>(null)
  const [href, setHref] = useState(TICKET_URL)

  useEffect(() => {
    const update = () => setNow(new Date())
    update()
    const interval = window.setInterval(update, 1000)

    const currentParams = new URLSearchParams(window.location.search)
    const ticketParams = new URLSearchParams()
    UTM_PARAMS.forEach((key) => {
      const value = currentParams.get(key)
      if (value) ticketParams.set(key, value)
    })
    const query = ticketParams.toString()
    if (query) setHref(`${TICKET_URL}?${query}`)

    return () => window.clearInterval(interval)
  }, [])

  const phase = useMemo(() => (now ? getPhase(now) : undefined), [now])
  const timeLeft = useMemo(() => getTimeLeft(now ?? new Date(0), phase?.endsAt), [now, phase])

  if (!now || !phase) return null

  const units = [
    ['Días', timeLeft.days],
    ['Horas', timeLeft.hours],
    ['Min', timeLeft.minutes],
    ['Seg', timeLeft.seconds],
  ] as const

  return (
    <aside
      aria-label={`${phase.discount}: ${phase.label.toLowerCase()}`}
      className={`${pixelFontClassName} fixed inset-x-0 bottom-0 z-[60] border-2 border-red-500/80 bg-black/85 px-3 py-2 text-white shadow-[0_0_28px_rgba(239,68,68,0.5)] backdrop-blur-md transition hover:border-yellow-300 md:inset-x-auto md:bottom-7 md:left-1/2 md:w-[620px] md:-translate-x-1/2 md:px-5 md:py-4`}
    >
      <div className="mx-auto grid max-w-xl grid-cols-[minmax(0,1fr)_96px] items-center gap-3 md:max-w-none md:grid-cols-[minmax(0,1fr)_180px] md:gap-6">
        <div className="min-w-0 flex-1">
          <p className="mb-1 whitespace-nowrap text-center text-[8px] uppercase tracking-[0.12em] text-yellow-300 md:mb-3 md:text-xs md:leading-5 md:tracking-[0.16em]">
            {phase.label}
          </p>
          <div className="grid grid-cols-4 gap-1 text-center md:gap-2">
            {units.map(([label, value]) => (
              <span key={label} className="block min-w-0 border border-white/20 bg-white px-1 py-1.5 text-black md:px-2 md:py-2.5">
                <strong
                  className="block text-base font-black leading-none tabular-nums md:text-2xl"
                  style={{
                    WebkitFontSmoothing: 'none',
                    textShadow: '1px 0 0 #ef4444, -1px 0 0 #38bdf8',
                  }}
                >
                  {String(value).padStart(2, '0')}
                </strong>
                <span className="mt-1.5 block text-[7px] font-black uppercase tracking-normal md:text-[9px] md:tracking-wide">{label}</span>
              </span>
            ))}
          </div>
        </div>

        <a
          href={href}
          className="pixel-btn genz-countdown-cta"
        >
          <span className="relative z-10">COMPRAR ENTRADAS</span>
        </a>
      </div>
    </aside>
  )
}
