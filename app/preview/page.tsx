import cn from 'classnames';
import Header from './components/header';
import Hero from './components/homepage/hero';
import AulaSensorial from './components/homepage/aula-sensorial';
import NuestrosEncuentros from './components/homepage/nuestros-encuentros';
import NuestraMision from './components/homepage/nuestra-mision';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AulaSensorial />
      <NuestrosEncuentros />
      <NuestraMision />
    </main>
  );
}
