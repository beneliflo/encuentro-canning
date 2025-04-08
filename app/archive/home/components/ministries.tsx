import Image from 'next/image'
import Link from 'next/link'

import heroOne from '@/public/hero.jpg'
import uno from '@/public/uno.jpg'
import kids from '@/public/kids.jpg'
import pre from '@/public/pre.jpg'
import conectados from '@/public/conectados.jpg'
import matrimonios from '@/public/matrimonios.jpg'

export default function Ministries() {

  return (
    <div className="bg-gradient-to-br relative from-[#5800EA]/70 to-[#D400F1]/70 before:bg-section-pattern before:absolute before:inset-0">
      <div className="container py-14 md:py-20">
        <h1 className="text-6xl font-bold text-center">CONECTATE</h1>
        <div className="grid mt-20 gap-14 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group cursor-default">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={heroOne} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl xl:leading-tight">Grupos de Conexión</p>
          </div>
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group cursor-default">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={matrimonios} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white xl:leading-tight lg:text-4xl xl:text-5xl">Espacio <br /> Viernes</p>
          </div>
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group cursor-default">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={kids} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl xl:leading-tight">Encuentro <br /> Kids</p>
          </div>
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group cursor-default">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={pre} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl xl:leading-tight">Familia <br /> PRE</p>
          </div>
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group cursor-default">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={conectados} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Conectados</p>
          </div>
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group cursor-default">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={uno} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">UNO</p>
          </div>
        </div>
      </div>
    </div>
  )
}