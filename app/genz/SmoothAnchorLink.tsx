'use client'

import { MouseEvent, ReactNode } from 'react'

export default function SmoothAnchorLink({
  href,
  children,
  className,
}: {
  href: `#${string}`
  children: ReactNode
  className?: string
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return

    event.preventDefault()

    const header = document.querySelector<HTMLElement>('[data-genz-header]')
    const headerOffset = header?.getBoundingClientRect().height ?? 0
    const start = window.scrollY
    const destination = Math.max(0, target.getBoundingClientRect().top + start - headerOffset)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, destination)
      window.history.replaceState(null, '', href)
      return
    }

    const distance = destination - start
    const duration = 450
    const startedAt = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      window.scrollTo(0, start + distance * eased)

      if (progress < 1) {
        window.requestAnimationFrame(animate)
      } else {
        window.history.replaceState(null, '', href)
      }
    }

    window.requestAnimationFrame(animate)
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
