'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export default function NuestraMision() {
  return (
    <div className="bg-hueso">
      <div className="container py-20 text-center">
        <h2 className="font-pragmatica text-turquesa font-bold text-[32px] leading-[40px]">
          Nuestra misión:
        </h2>
        <p className="text-dark font-pragmatica font-bold text-[76px] leading-[85px] mt-12 text-balance">
          Somos una familia apasionada por Jesus, que se multiplica, predica con
          poder y sirve con compasión.
        </p>
      </div>
    </div>
  );
}
