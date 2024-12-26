import cn from 'classnames';
import Header from './components/header';
import Hero from './components/homepage/hero';
import AulaSensorial from './components/homepage/aula-sensorial';
import NuestrosEncuentros from './components/homepage/nuestros-encuentros';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AulaSensorial />
      <NuestrosEncuentros />
    </main>
  );
}
