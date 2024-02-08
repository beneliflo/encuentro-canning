import Image from 'next/image'
import Link from 'next/link'

import logoIEC from '@/public/logo-iec.png'

// import ContactForm from './contact-form'

export default function Footer() {

  return (
    <footer className="text-white bg-black">
      <div className="container py-14 md:py-20">
        <Image className="w-9" src={logoIEC} alt="IEC Logo" loading='eager' />
        <div className="flex flex-col gap-10 mt-6 md:flex-row md:gap-36">
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold">Contacto</h3>
            <a href="https://api.whatsapp.com/send?phone=28202555000" target="_blank">(001)321-123-4567</a>
            <a href="mailto:example@example.com" target="_blank">example@example.com</a>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold">Dirección</h3>
            <p>Encuentro Canning</p>
            <a href="https://maps.app.goo.gl/2tqQEnDjh4HERhQ36" target="_blank">Hipocrates 3320, Canning, Buenos Aires</a>
          </div>
        </div>
        <ul className="flex flex-wrap gap-4 mt-10">
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Conocenos</Link></li>
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Conectate</Link></li>
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Comunidad</Link></li>
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Recursos</Link></li>
        </ul>
      </div>
      {/* <ContactForm /> */}
    </footer>
  )
}