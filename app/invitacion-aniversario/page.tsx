import { Metadata } from 'next'

import Invitation from './components/invitation'

export const metadata: Metadata = {
  title: 'Invitacion Aniversario',
  description: 'Invitacion a nuestro primer aniversario',
  openGraph: {
    title: 'Invitacion Aniversario',
    description: 'Invitacion a nuestro primer aniversario',
  },
}

export default function InvitationPage() {
  
  return (
    <main>
      <Invitation />
    </main>
  )
}