import localFont from 'next/font/local';
import { Press_Start_2P } from 'next/font/google';
import GenzEmubaPixel from './GenzEmubaPixel';

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-press-start-2p',
});

const neueMontreal = localFont({
  src: [
    {
      path: '../../public/fonts/NeueMontreal-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/NeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-neue-montreal-local',
});

export default function GenzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GenzEmubaPixel />
      <div className={`${pressStart2P.variable} ${neueMontreal.variable} font-neue-montreal`}>{children}</div>
    </>
  );
}
