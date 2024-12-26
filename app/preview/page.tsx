import cn from 'classnames';
import Header from './components/header';
import Hero from './components/homepage/hero';
import AulaSensorial from './components/homepage/aula-sensorial';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AulaSensorial />
    </main>
  );
}
