import { Metadata } from 'next';
import Header from './components/header';
import Hero from './components/homepage/hero';
import AulaSensorial from './components/homepage/aula-sensorial';
import ColegioEncuentro from './components/homepage/colegio-encuentro';
import NuestrosEncuentros from './components/homepage/nuestros-encuentros';
import NuestraMision from './components/homepage/nuestra-mision';
import Contactanos from './components/homepage/contactanos';
import Footer from './components/footer';

export const metadata: Metadata = {
  title: 'Encuentro Canning | Iglesia en Canning, Buenos Aires',
  description:
    'Iglesia Encuentro Canning — una comunidad de fe en Canning, Buenos Aires. Cultos, eventos, colegio, aula sensorial y más. ¡Vení a conocernos!',
  keywords: [
    'Encuentro Canning',
    'iglesia Canning',
    'iglesia evangélica Canning',
    'colegio cristiano Canning',
    'aula sensorial',
    'iglesia Buenos Aires',
    'Ezeiza',
  ],
  openGraph: {
    title: 'Encuentro Canning | Iglesia en Canning, Buenos Aires',
    description:
      'Una comunidad de fe en Canning, Buenos Aires. Cultos, eventos, colegio, aula sensorial y más.',
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AulaSensorial />
      <ColegioEncuentro />
      <NuestrosEncuentros />
      <NuestraMision />
      <Contactanos />
      <Footer />
    </main>
  );
}
