'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Contactanos() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      alert('Mensaje enviado correctamente.');
    } else {
      alert('Hubo un problema enviando tu mensaje.');
    }
  };

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
              <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                <div className="grid gap-1 md:grid-cols-6">
                  <div className="col-span-3">
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Nombre"
                      className="input-style"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Apellido"
                      className="input-style"
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
                      placeholder="Email"
                      className="input-style"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      id="phone"
                      name="phone"
                      type="phone"
                      autoComplete="phone"
                      placeholder="Celular"
                      className="input-style"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    placeholder="Escribe tu pedido de oración o motivo de contacto"
                    className="input-style"
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
            También podés escribirnos por estos canales
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-11">
            <Link
              href="mailto:info@encuentrocanning.org"
              className="text-2xl font-bold underline font-pragmatica text-cel"
            >
              info@encuentrocanning.org
            </Link>
            <Link
              href="https://wa.me/5491168194422?text=Hola,%20vengo%20de%20la%20página%20web%20de%20la%20Iglesia%20Encuentro%20Canning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold underline font-pragmatica text-cel"
            >
              +54 9 11 6819-4422
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
