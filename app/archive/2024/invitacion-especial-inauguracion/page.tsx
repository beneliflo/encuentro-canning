import { Metadata } from 'next'

import Invitation from './components/invitation'

export const metadata: Metadata = {
  title: 'Invitación Especial Inauguración',
  description: 'Invitación especial a nuestra inauguración',
  openGraph: {
    images: 'https://encuentrocanning.org/invitation/og-special-image.png',
  },
  twitter: {
    images: ['https://encuentrocanning.org/invitation/og-special-image.png'],
  },
}

export default function InvitationPage() {
  
  return (
    <main>
      <Invitation />
    </main>
  )
}