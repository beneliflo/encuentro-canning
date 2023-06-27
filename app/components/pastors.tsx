import Image from 'next/image'

import pastorPrincipal from '../../public/sebastian-sennewald.jpg'

export default function Pastors() {

  return (
    <div className="bg-gradient-to-br relative from-[#FF5D68]/70 to-[#01D6DA]/70 before:bg-section-pattern before:absolute before:inset-0">
      <div className="container relative flex flex-col gap-24 md:flex-row md:grid md:grid-cols-2 py-14 md:py-20">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold">Sebastian Sennewald</h1>
          <h2 className="text-3xl">Pastor Principal</h2>
          <p className="mt-4 text-lg">Our church has a strong connection to the community and commenced on October 31st, 1931. We are a generational contemporary church with a rich history. We really are a place where you can belong and grow! Jamie & Caroline have 3 sons, and they believe in rising up the next generation with the wisdom of those who have gone before. Jamie & Caroline have a practical outlook on life and love community. It’s our passion to see you get connected, grow in your relationship with God and others and live your best life.</p>
        </div>
        <Image className="overflow-hidden rounded-2xl" src={pastorPrincipal} alt="Sebastian Sennewald" />
      </div>
    </div>
  )
}