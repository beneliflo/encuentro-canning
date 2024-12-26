'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export default function AulaSensorial() {
  return (
    <div className="bg-[url('/aula-sensorial-bg.png')] bg-center">
      <div className="container text-right justify-items-end text-hueso font-pragmatica py-7">
        <h3 className="text-3xl font-bold leading-10">Marzo 2025</h3>
        <h2 className="text-[107px] font-bold leading-[110px] uppercase tracking-[1px]">
          Aula
          <br />
          Sensorial
        </h2>
        <p className="mb-8 text-3xl font-bold leading-10 max-w-[750px]">
          Sala equipada para la estimulación sensorial en niños con trastornos
          del neurodesarrollo
        </p>
        <Link href="#" className="text-3xl font-bold leading-8 underline">
          Donar al proyecto
        </Link>
      </div>
    </div>
  );
}
