'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export default function NuestrosEncuentros() {
  return (
    <div className="py-12 bg-dark">
      <div className="container">
        <h2 className="font-bold font-pragmatica text-4xl md:text-8xl lg:text-[107px] md:leading-[110px] text-hueso uppercase">
          <p>Nuestros</p>
          <p className="text-right">Encuentros</p>
        </h2>
        <div className="mt-24">
          <ul className="grid gap-4 font-bold text-center md:grid-cols-3 font-pragmatica text-hueso">
            <li className="relative aspect-[363/260]">
              <Link href="#">
                <Image
                  src="/grupo-conexion-img.png"
                  layout="fill"
                  className="object-cover"
                  alt="grupo de conexion"
                />
                <div className="absolute inset-0 bg-dark/45" />
                <p className="absolute inset-0 flex items-center justify-center text-[43px] leading-[50px] px-6">
                  Grupos de Vida Nueva
                </p>
              </Link>
            </li>
            <li className="relative aspect-[363/260]">
              <Link href="#">
                <Image
                  src="/espacio-viernes-img.png"
                  layout="fill"
                  className="object-cover"
                  alt="grupo de conexion"
                />
                <div className="absolute inset-0 bg-dark/45" />
                <p className="absolute inset-0 flex items-center justify-center text-[43px] leading-[50px] px-6">
                  Espacio viernes
                </p>
                <span className="absolute inset-0 flex items-end justify-center text-xl font-medium text-white font-roboto uppercase leading-[50px] pb-6">
                  Parejas
                </span>
              </Link>
            </li>
            <li className="relative aspect-[363/260]">
              <Link href="#">
                <Image
                  src="/encuentro-kids-img.png"
                  layout="fill"
                  className="object-cover"
                  alt="grupo de conexion"
                />
                <div className="absolute inset-0 bg-dark/45" />
                <p className="absolute inset-0 flex items-center justify-center text-[43px] leading-[50px] px-6">
                  Encuentro Kids
                </p>
                <span className="absolute inset-0 flex items-end justify-center text-xl font-medium text-white font-roboto uppercase leading-[50px] pb-6">
                  1 a 10 años
                </span>
              </Link>
            </li>
            <li className="relative aspect-[363/260]">
              <Link href="#">
                <Image
                  src="/familia-pre-img.png"
                  layout="fill"
                  className="object-cover"
                  alt="grupo de conexion"
                />
                <div className="absolute inset-0 bg-dark/45" />
                <p className="absolute inset-0 flex items-center justify-center text-[43px] leading-[50px] px-6">
                  Familia PRE
                </p>
                <span className="absolute inset-0 flex items-end justify-center text-xl font-medium text-white font-roboto uppercase leading-[50px] pb-6">
                  11 a 14 años
                </span>
              </Link>
            </li>
            <li className="relative aspect-[363/260]">
              <Link href="#">
                <Image
                  src="/conectados-img.png"
                  layout="fill"
                  className="object-cover"
                  alt="grupo de conexion"
                />
                <div className="absolute inset-0 bg-dark/45" />
                <p className="absolute inset-0 flex items-center justify-center text-[43px] leading-[50px] px-6">
                  Conectados
                </p>
                <span className="absolute inset-0 flex items-end justify-center text-xl font-medium text-white font-roboto uppercase leading-[50px] pb-6">
                  15 a 17 años
                </span>
              </Link>
            </li>
            <li className="relative aspect-[363/260]">
              <Link href="#">
                <Image
                  src="/uno-img.png"
                  layout="fill"
                  className="object-cover"
                  alt="grupo de conexion"
                />
                <div className="absolute inset-0 bg-dark/45" />
                <p className="absolute inset-0 flex items-center justify-center text-[43px] leading-[50px] px-6">
                  UNO
                </p>
                <span className="absolute inset-0 flex items-end justify-center text-xl font-medium text-white font-roboto uppercase leading-[50px] pb-6">
                  +18 años
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-10 text-center">
          <h3 className="mb-5 text-3xl font-bold text-white font-pragmatica">
            SÉ PARTE DE ESTA GRAN FAMILIA
          </h3>
          <Link
            href="#"
            className="px-8 py-1 rounded bg-cel text-[32px] leading-[40px] text-hueso font-bold font-pragmatica"
          >
            Quiero ser parte
          </Link>
        </div>
      </div>
    </div>
  );
}
