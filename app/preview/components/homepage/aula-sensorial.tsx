'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export default function AulaSensorial() {
  return (
    <div className="bg-[url('/aula-sensorial-bg.png')]">
      <div className="container text-right text-hueso font-pragmatica">
        <h3 className="text-3xl font-bold leading-10">Marzo 2025</h3>
        <h2 className="text-[107px] font-bold leading-[110px]">
          Aula
          <br />
          Sensorial
        </h2>
        <p className="text-3xl font-bold leading-10">
          Sala equipada para la estimulación sensorial en niños con trastornos
          del neurodesarrollo
        </p>
        <Link href="#" className="text-3xl leading-8 underline">
          Donar al proyecto
        </Link>
      </div>
    </div>
  );
}
