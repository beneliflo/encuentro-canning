import { Metadata } from 'next'

import Invitation from './components/invitation'

export const metadata: Metadata = {
  title: 'Invitacion Aniversario',
  description: 'Invitacion especial a nuestro primer aniversario'
}

export default function InvitationPage() {
  
  return (
    <main>
      <Invitation />
    </main>
  )
}