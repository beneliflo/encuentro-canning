'use client';

import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export default function Contactanos() {
  return (
    <>
      <div className="py-12 bg-cel">
        <div className="container">
          <div className="flex gap-x-24">
            <div className="hidden lg:block">
              <Image
                src="/phone-mockup.png"
                width={247}
                height={479}
                alt="phone"
                className="-translate-y-4"
              />
            </div>
            <div className="flex-auto">
              <h2 className="font-pragmatica font-bold text-[43px] leading-[50px] text-hueso mb-12 text-center">
                Dejanos tu motivo de oración
              </h2>
              <form className="flex flex-col gap-1">
                <div className="grid gap-1 md:grid-cols-6">
                  <div className="col-span-3">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Nombre"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Apellido"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                </div>
                <div className="grid gap-1 md:grid-cols-6">
                  <div className="col-span-3">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="email"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      autoComplete="phone"
                      placeholder="Celular"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    placeholder="Escribe tu pedido de oración o motivo de contacto"
                    className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    defaultValue={''}
                  />
                </div>
                <div className="mt-2">
                  <button
                    type="submit"
                    className="font-pragmatica font-bold text-[32px] leading-10 text-hueso bg-dark py-5 rounded-lg uppercase w-full"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark py-9">
        <div className="container text-center">
          <h2 className="font-pragmatica font-bold text-[32px] leading-10 text-hueso mb-3">
            también podes escribirnos por estos canales
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-11">
            <Link
              href="mailto:example@example.com"
              className="text-2xl font-bold underline font-pragmatica text-cel"
            >
              example@example.com
            </Link>
            <Link
              href="tel:+5491122334455"
              className="text-2xl font-bold underline font-pragmatica text-cel"
            >
              +54 9 11 2233-4455
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
