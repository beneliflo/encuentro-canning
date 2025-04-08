import Link from 'next/link'
import { Instagram, Facebook, Youtube } from 'lucide-react'

const SocialIcons = () => {
  return (
    <div className="flex justify-center space-x-8">
      <Link 
        href="https://www.instagram.com/emuba_escuela/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:opacity-70 transition-opacity"
      >
        <span className="sr-only">Instagram</span>
        <Instagram className="w-6 h-6" />
      </Link>
      <Link 
        href="https://www.facebook.com/EMUBA"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:opacity-70 transition-opacity"
      >
        <span className="sr-only">Facebook</span>
        <Facebook className="w-6 h-6" />
      </Link>
      <Link 
        href="https://www.youtube.com/@Emubaescuela"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:opacity-70 transition-opacity"
      >
        <span className="sr-only">YouTube</span>
        <Youtube className="w-6 h-6" />
      </Link>
    </div>
  )
}

export default SocialIcons
