import { Metadata } from 'next'

import Invitation from './components/invitation'

export const openGraphImage = { images: ['/invitation/bg.jpg'] }

export const metadata: Metadata = {
  title: 'Invitacion Aniversario',
  description: 'Invitacion especial a nuestro primer aniversario',
  openGraph: {
    ...openGraphImage,
    title: 'Acme',
    description: 'Acme is a...',
  },
}

export default function InvitationPage() {
  
  return (
    <main>
      <Invitation />
    </main>
  )
}