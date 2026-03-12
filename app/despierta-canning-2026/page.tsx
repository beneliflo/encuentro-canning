'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const ROLES = [
  { value: 'Anfitrión - Casa', label: 'Anfitrión - Casa' },
  { value: 'Anfitrión - Iglesia', label: 'Anfitrión - Iglesia' },
  { value: 'Anfitrión - Otro lugar', label: 'Anfitrión - Otro lugar' },
  { value: 'Co-anfitrión', label: 'Co-anfitrión' },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function DespiertaCanning2026() {
  const [hostFirstName, setHostFirstName] = useState('');
  const [hostLastName, setHostLastName] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [role, setRole] = useState('');
  const [locationName, setLocationName] = useState('');
  const [guests, setGuests] = useState<{ firstName: string; lastName: string; prayerRequest: string; invited: string; confirmed: string }[]>(
    Array.from({ length: 10 }, () => ({ firstName: '', lastName: '', prayerRequest: '', invited: '', confirmed: '' }))
  );
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const resetForm = useCallback(() => {
    setHostFirstName('');
    setHostLastName('');
    setHostPhone('');
    setRole('');
    setLocationName('');
    setGuests(Array.from({ length: 10 }, () => ({ firstName: '', lastName: '', prayerRequest: '', invited: '', confirmed: '' })));
    setStatus('idle');
    setErrorMsg('');
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(resetForm, 5000);
    return () => clearTimeout(timer);
  }, [status, resetForm]);

  const isCohost = role === 'Co-anfitrión';

  const addGuest = () => setGuests((prev) => [...prev, { firstName: '', lastName: '', prayerRequest: '', invited: '', confirmed: '' }]);

  const removeGuest = (index: number) => {
    setGuests((prev) => prev.filter((_, i) => i !== index));
  };

  const updateGuest = (index: number, field: 'firstName' | 'lastName' | 'prayerRequest' | 'invited' | 'confirmed', value: string) => {
    setGuests((prev) => prev.map((g, i) => (i === index ? { ...g, [field]: value } : g)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const validGuests = guests.filter((g) => g.firstName.trim() || g.lastName.trim());
    if (!isCohost && validGuests.length === 0) {
      setErrorMsg('Debés agregar al menos un invitado.');
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/despierta-canning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostFirstName: hostFirstName.trim(),
          hostLastName: hostLastName.trim(),
          hostPhone: hostPhone.trim(),
          role,
          locationName: role === 'Anfitrión - Otro lugar' ? locationName.trim() : undefined,
          guests: validGuests.map((g) => ({ firstName: g.firstName.trim(), lastName: g.lastName.trim(), prayerRequest: g.prayerRequest.trim(), invited: g.invited, confirmed: g.confirmed })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Error al enviar el formulario.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Error de conexión. Intentá de nuevo más tarde.');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#FCF7E3] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Full-width logo header */}
        <div className="flex justify-center -mt-10 md:-mt-20 mb-0">
          <Image
            src="/images/logo-despierta-canning.png"
            alt="Despierta Canning 2026"
            width={400}
            height={400}
            className="w-72 md:w-xl h-auto"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left column: intro text */}
        <div className="space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold text-dark font-neue-haas uppercase leading-tight">
            Anfitriones Despierta Canning 2026
          </h1>

          <div className="space-y-4 text-sm md:text-base text-dark/80 leading-relaxed">
            <p>
              <strong>¡Bienvenido/a a DESPIERTA CANNING!</strong><br />
            </p>
            <p>
              Nos alegramos que hayas decidido responder al llamado de Dios de ser usado para compartir el evangelio transformador de Cristo con tus seres queridos y relaciones.
            </p>
            <p>
              Durante los meses de Marzo a Mayo de 2026, nos embarcaremos con nuestra iglesia en una aventura de fe para ver a nuestro Dios: alcanzar, salvar, sanar y liberar tantas personas y familias que lo necesitan desesperadamente.
            </p>
            <p>
              Dios va a usar tu vida de manera poderosa mas allá de tus limitaciones, porque solo quiere tu disponibilidad para obedecerlo. El mismo te llenará de su Espíritu, te capacitará y te dará las palabras para ser un testigo poderoso de Jesús (Mc.13:11). Solo debes buscar levantar a Jesús, y El atraerá a todos a si mismo! (Jn 12:32).
            </p>
            <p>
              Este será un tiempo de ser desafiado, de caminar por fe, de vencer la vergüenza y tomar autoridad en Su nombre. Pero también será un tiempo de gran gozo, sabiendo que estas colaborando con el plan más grande de la historia: redimir a las personas y llevarlas a la comunión eterna con el Padre.
            </p>
            <p>
              Creemos que será un tiempo de gran crecimiento espiritual en tu vida y verás tu fe ensanchada. No te desanimes por nada, se valiente y hace todo conforme a lo que Dios te pida, y tendrás éxito en todo lo que hagas (Josue 1).
            </p>
            <p>
              Por último, estate atento y despierto a la realidad de que, estamos frente a una batalla espiritual por las almas. Al Diablo no le agrada verte levantado para arrebatar las almas que tiene cautivas, por lo tanto intentará desanimarte, entristecerte, frustrarte, atacarte, preocuparte, y hacer que sientas temor o impotencia. Elegí creer que fiel es El que te llama, El que también lo hará (1 Tes. 5:24). El esta con vos, nada podrá estar en tu contra, tenes la victoria asegurada! Además, es clave que mantengas tu dependencia del Espíritu Santo, de tus líderes, y de la iglesia en este tiempo como nunca. No juegues al solitario e independiente, sino se entendido de que las puertas del infierno no podrán prevalecer si somos uno! (Mateo 16:18).
            </p>
            <p>
              Entonces, adelante, vamos juntos, a ver la gloria de Dios en la ciudad de Canning. Te bendigo y oro por lo que Dios hará con vos en este tiempo.
            </p>
            <p className="font-semibold">Pr. Sebastian Sennewald</p>
          </div>
        </div>

        {/* Right column: form */}
        <div>
          <h2 className="text-xl font-semibold text-dark font-neue-haas mb-6">
            Registro de anfitrión
          </h2>

        {status === 'success' ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="text-5xl mb-4">👍</div>
            <h3 className="text-2xl font-bold text-dark mb-3 font-neue-haas">
              ¡Registro exitoso!
            </h3>
          </div>
        ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6"
        >
          {/* Section 1: Host */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-dark font-neue-haas">
              Datos del anfitrión
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hostFirstName" className="block text-sm font-medium text-dark/80 mb-1">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  id="hostFirstName"
                  type="text"
                  required
                  value={hostFirstName}
                  onChange={(e) => setHostFirstName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="hostLastName" className="block text-sm font-medium text-dark/80 mb-1">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  id="hostLastName"
                  type="text"
                  required
                  value={hostLastName}
                  onChange={(e) => setHostLastName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition"
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            <div>
              <label htmlFor="hostPhone" className="block text-sm font-medium text-dark/80 mb-1">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                id="hostPhone"
                type="tel"
                required
                value={hostPhone}
                onChange={(e) => setHostPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition"
                placeholder="Ej: 11 2345-6789"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-dark/80 mb-1">
                ¿Serás anfitrión o co-anfitrión? <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition bg-white"
              >
                <option value="" disabled>
                  Elegí una opción
                </option>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-dark/50 leading-relaxed">
                El <strong className="text-dark/60">anfitrión</strong> lidera un grupo en los 6 encuentros presenciales.
                El <strong className="text-dark/60">co-anfitrión</strong> trae invitados pero no lidera grupo; debe asistir a todos los encuentros junto a sus invitados.
              </p>
            </div>

            {role === 'Anfitrión - Otro lugar' && (
              <div>
                <label htmlFor="locationName" className="block text-sm font-medium text-dark/80 mb-1">
                  Nombre del lugar
                </label>
                <input
                  id="locationName"
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition"
                  placeholder="Nombre del lugar"
                />
              </div>
            )}
          </fieldset>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Section 2: Guests */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-dark font-neue-haas">
              Invitados
            </legend>
            <p className="text-xs text-dark/50 leading-relaxed">
              A continuación ingresá los nombres completos de tus invitados con nombre y apellido (cuanto más personas invites, más posibilidad tendrás de conformar un grupo).
            </p>
            <div className="space-y-3">
              {guests.map((guest, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 w-6 text-xs text-dark/40 text-right tabular-nums">{index + 1}.</span>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={guest.firstName}
                        onChange={(e) => updateGuest(index, 'firstName', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition"
                        placeholder="Nombre"
                      />
                      <input
                        type="text"
                        value={guest.lastName}
                        onChange={(e) => updateGuest(index, 'lastName', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition"
                        placeholder="Apellido"
                      />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeGuest(index)}
                        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        aria-label="Eliminar invitado"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                  </div>
                  <div className="ml-8 space-y-2">
                    <input
                      type="text"
                      value={guest.prayerRequest}
                      onChange={(e) => updateGuest(index, 'prayerRequest', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition"
                      placeholder="Motivo de oración"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={guest.invited}
                        onChange={(e) => updateGuest(index, 'invited', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition bg-white"
                      >
                        <option value="" disabled>¿Invitado?</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                      </select>
                      <select
                        value={guest.confirmed}
                        onChange={(e) => updateGuest(index, 'confirmed', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-dark outline-none focus:border-cel focus:ring-1 focus:ring-cel transition bg-white"
                      >
                        <option value="" disabled>¿Confirmado?</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addGuest}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cel hover:text-cel/80 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              Agregar más invitados
            </button>
          </fieldset>

          {/* Error message */}
          {status === 'error' && errorMsg && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-lg bg-[#015F60] py-3 text-sm font-semibold text-white hover:bg-[#015F60]/90 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {status === 'submitting' ? 'Enviando...' : 'Registrarse'}
          </button>
        </form>
        )}
        </div>
        </div>
      </div>
    </main>
  );
}
