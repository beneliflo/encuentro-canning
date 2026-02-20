'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export default function Contactanos() {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem('first-name') as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem('last-name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('number') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Error al enviar el formulario.');
      }

      setSucceeded(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al enviar el formulario. Intentá de nuevo más tarde.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div id="contactanos" className="py-12 bg-cel">
        <div className="container">
          <div className="flex gap-x-24">
            <div className="hidden lg:block">
              <Image
                src="/images/phone-mockup.png"
                width={247}
                height={479}
                alt="phone"
                className="-translate-y-4"
              />
            </div>
            <div className="flex-auto">
              <h2 className="font-pragmatica font-bold text-[43px] leading-[50px] text-hueso mb-12 text-center text-balance">
                Dejanos tu motivo de oración o mensaje
              </h2>
              <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                <div className="grid gap-1 md:grid-cols-6">
                  <div className="col-span-3">
                    <input
                      id="first-name"
                      name="first-name"
                      required
                      type="text"
                      placeholder="Nombre"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline-solid outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      id="last-name"
                      name="last-name"
                      required
                      type="text"
                      placeholder="Apellido"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline-solid outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                </div>
                <div className="grid gap-1 md:grid-cols-6">
                  <div className="col-span-3">
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      placeholder="email"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline-solid outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      id="number"
                      name="number"
                      required
                      type="phone"
                      placeholder="Celular"
                      className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline-solid outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Escribe tu pedido de oración o motivo de contacto"
                    className="block w-full rounded-lg bg-white px-8 py-5 text-lg text-gray-900 outline-solid outline-1 -outline-offset-1 outline-gray-300 placeholder:text-[#608B8C]/60 focus:outline-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 font-extrabold placeholder:uppercase placeholder:text-lg"
                    defaultValue={''}
                  />
                </div>
                {error && (
                  <p className="w-full py-3 text-base font-bold text-red-300 font-pragmatica">
                    {error}
                  </p>
                )}
                <div className="mt-2">
                  {succeeded ? (
                    <p className="w-full py-5 text-lg font-bold leading-10 uppercase rounded-lg font-pragmatica text-hueso">
                      Formulario enviado. Nos contactaremos en la brevedad.
                    </p>
                  ) : (
                    <button
                      type="submit"
                      className="font-pragmatica font-bold text-[32px] leading-10 text-hueso bg-dark py-5 rounded-lg uppercase w-full cursor-pointer disabled:opacity-50"
                      disabled={submitting}
                    >
                      {submitting ? 'Enviando...' : 'Enviar'}
                    </button>
                  )}
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
              href="mailto:info@encuentrocanning.org"
              className="text-2xl font-bold underline font-pragmatica text-cel"
            >
              info@encuentrocanning.org
            </Link>
            <Link
              href="https://wa.me/5491138055931?text=Hola,%20vengo%20de%20la%20página%20web%20de%20la%20Iglesia%20Encuentro%20Canning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold underline font-pragmatica text-cel"
            >
              +54 9 11 38055931
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
