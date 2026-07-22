'use client'

import { useEffect, useState } from 'react'

const TICKET_URL = 'https://emuba.fint.app/eventos/gen-z-2026'
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export default function GenzTicketLink() {
  const [href, setHref] = useState(TICKET_URL)

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search)
    const ticketParams = new URLSearchParams()

    UTM_PARAMS.forEach((key) => {
      const value = currentParams.get(key)
      if (value) ticketParams.set(key, value)
    })

    const query = ticketParams.toString()
    if (query) setHref(`${TICKET_URL}?${query}`)
  }, [])

  return (
    <a href={href} className="pixel-btn genz-hero-cta">
      <span className="relative z-10">COMPRAR ENTRADAS</span>
    </a>
  )
}
