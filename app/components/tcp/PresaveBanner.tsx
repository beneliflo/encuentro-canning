import Image from 'next/image'
import RegistrationButton from './RegistrationButton'

export default function PresaveBanner() {
  return (
    <section id="presave-banner" className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-4 md:gap-10">
          <span className="text-2xl sm:text-3xl md:text-7xl font-bold tracking-tight uppercase">Presave</span>
          <Image src="/images/tcp/arrow-right.png" alt="→" width={48} height={48} className="w-5 h-5 sm:w-6 sm:h-6 md:w-12 md:h-12" />
          <span className="text-[10px] sm:text-xs md:text-xl uppercase leading-tight font-medium">
            Obtené acceso anticipado<br />a la venta de entradas
          </span>
        </div>
        <RegistrationButton />
      </div>
    </section>
  )
}
