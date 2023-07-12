import { Metadata } from 'next'

import Invitation from './components/invitation'

export const metadata: Metadata = {
  title: 'Invitacion Aniversario',
  description: 'Invitacion especial a nuestro primer aniversario',
  openGraph: {
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