import Image from 'next/image'
import Link from 'next/link'

import logoIEC from '@/public/logo-iec.png'

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
            <a href="https://www.google.com.ar/maps/place/Iglesia+el+encuentro/@-34.8814429,-58.5123589,16.73z/data=!4m14!1m7!3m6!1s0x95bcd6e29f559e37:0x9fb84b4fbbe33140!2sHipocrates+3320,+B1801BZH+Canning,+Provincia+de+Buenos+Aires!3b1!8m2!3d-34.8818915!4d-58.5085267!3m5!1s0x95bcd76848809fd5:0xa4dcb81c015f76f2!8m2!3d-34.8832805!4d-58.5116071!16s%2Fg%2F11jz6tncjs?entry=ttu" target="_blank">Hipocrates 3320, Canning, Buenos Aires</a>
          </div>
        </div>
        <ul className="flex flex-wrap gap-4 mt-10">
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Quienes somos</Link></li>
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Ministerios</Link></li>
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Edades</Link></li>
          <li><Link className="transition-opacity duration-150 ease-in-out hover:opacity-80" href="/">Contacto</Link></li>
        </ul>
      </div>
    </footer>
  )
}