'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export default function AulaSensorial() {
  return (
    <div className="bg-[url('/aula-sensorial-bg.png')] bg-bottom py-20">
      <div className="container flex flex-col gap-5 text-right text-hueso font-pragmatica">
        <h3 className="mb-8 text-xl font-bold leading-10 md:text-3xl">
          Marzo 2025
        </h3>
        <h2 className="text-5xl md:text-8xl lg:text-[107px] font-bold md:leading-[110px] uppercase tracking-[1px] mb-8">
          Aula
          <br />
          Sensorial
        </h2>
        <div className="justify-items-end">
          <p className="mb-10 text-xl md:text-3xl font-bold md:leading-10 max-w-[750px]">
            Sala equipada para la estimulación sensorial en niños con trastornos
            del neurodesarrollo
          </p>
        </div>
        <Link
          href="#"
          className="text-xl font-bold underline md:text-3xl md:leading-8"
        >
          Donar al proyecto
        </Link>
      </div>
    </div>
  );
}
