import Image from 'next/image'
import Link from 'next/link'

import heroOne from '../../public/hero.jpg'
import uno from '../../public/uno.jpg'
import kids from '../../public/kids.jpg'
import pre from '../../public/pre.jpg'
import conectados from '../../public/conectados.jpg'
import matrimonios from '../../public/matrimonios.jpg'

export default function Ministries() {

  return (
    <div className="container py-14 md:py-20">
      <h1 className="text-5xl font-bold">Experience. Connect. Grow.</h1>
      <p className="mt-4 text-lg">Join our ministries to get connected through service.</p>
      <div className="grid mt-10 gap-14 md:grid-cols-2 lg:grid-cols-3">
      <Link href="/">
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={heroOne} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Encuentros</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={matrimonios} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Matrimonios</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={uno} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">UNO</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={conectados} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Conectados</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={pre} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Familia PRE</p>
          </div>
        </Link>
        <Link href="/">
          <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden items-center flex justify-center group">
            <div className="absolute w-full h-full after:absolute after:inset-0 after:bg-black/30">
              <Image className="transition-all duration-300 ease-in-out group-hover:scale-110" src={kids} alt="uno" fill style={{objectFit: "cover"}} loading='eager' />
            </div>
            <p className="relative text-3xl font-semibold text-center text-white lg:text-4xl xl:text-5xl">Encuentro Kids</p>
          </div>
        </Link>
      </div>
    </div>
  )
}