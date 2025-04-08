import Image from 'next/image'

import imageOne from '@/public/image-1.jpg'
import imageTwo from '@/public/image-2.jpg'

export default function Who() {

  return (
    <div className="bg-gradient-to-br relative from-[#5800EA]/70 to-[#D400F1]/70 before:bg-section-pattern before:absolute before:inset-0">
      <div className="container relative flex flex-col-reverse gap-24 md:grid md:grid-cols-2 py-14 md:py-20">
        <div className="flex flex-col">
          <Image className="overflow-hidden rounded-2xl max-w-[80%]" src={imageOne} alt="Image One" loading='eager' />
          <Image className="overflow-hidden rounded-2xl max-w-[80%] self-end -mt-20" src={imageTwo} alt="Image Two" loading='eager' />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold">Empowered by God to reach others for Christ</h1>
          <p className="mt-4 text-lg">Our community makes us unique. They have an energy that reverberates around them. Their mission in life is to ensure the wonder in the world is not overlooked.</p>
        </div>
      </div>
    </div>
  )
}