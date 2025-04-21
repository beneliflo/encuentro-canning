import { Metadata } from 'next'

import Invitation from './components/invitation'

export const metadata: Metadata = {
  title: 'Invitación Inauguración',
  description: 'Invitación a nuestra Inauguración',
  openGraph: {
    images: 'https://encuentrocanning.org/invitation/og-image.png',
  },
  twitter: {
    images: ['https://encuentrocanning.org/invitation/og-image.png'],
  },
}

export default function InvitationPage() {
  
  return (
    <main>
      <Invitation />
    </main>
  )
}