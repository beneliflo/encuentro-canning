import { Metadata } from 'next'

import Invitation from './components/invitation'

export const metadata: Metadata = {
  title: 'Invitacion Aniversario',
  description: 'Invitacion especial a nuestro primer aniversario'
}

export default function InvitationPage() {
  
  return (
    <main className="bg-[url('/invitation/bg.jpg')] bg-cover bg-no-repeat h-screen overflow-auto bg-center">
      <Invitation />
    </main>
  )
}