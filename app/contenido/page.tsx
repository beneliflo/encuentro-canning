'use client';

import { useEffect, useRef, useState } from 'react';

interface Encuentro {
  id: number;
  titulo: string;
  audioUrl: string;
  videoUrl: string;
}

const encuentros: Encuentro[] = [
  {
    id: 1,
    titulo: 'Encuentro 1',
    audioUrl: '/contenido/encuentro-1/audio.mp3',
    videoUrl: '/contenido/encuentro-1/video.mp4',
  },
  {
    id: 2,
    titulo: 'Encuentro 2',
    audioUrl: '/contenido/encuentro-2/audio.mp3',
    videoUrl: '/contenido/encuentro-2/video.mp4',
  },
  {
    id: 3,
    titulo: 'Encuentro 3',
    audioUrl: '/contenido/encuentro-3/audio.mp3',
    videoUrl: '/contenido/encuentro-3/video.mp4',
  },
  {
    id: 4,
    titulo: 'Encuentro 4',
    audioUrl: '/contenido/encuentro-4/audio.mp3',
    videoUrl: '/contenido/encuentro-4/video.mp4',
  },
  {
    id: 5,
    titulo: 'Encuentro 5',
    audioUrl: '/contenido/encuentro-5/audio.mp3',
    videoUrl: '/contenido/encuentro-5/video.mp4',
  },
  {
    id: 6,
    titulo: 'Encuentro 6',
    audioUrl: '/contenido/encuentro-6/audio.mp3',
    videoUrl: '/contenido/encuentro-6/video.mp4',
  },
];

export default function ContenidoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCastAvailable, setIsCastAvailable] = useState(false);
  const [encuentroActual, setEncuentroActual] = useState(0);
  const [vistaActual, setVistaActual] = useState<'bienvenida' | 'encuentros'>('bienvenida');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'chrome' in window) {
      const checkCast = setInterval(() => {
        if (window.chrome?.cast?.isAvailable) {
          setIsCastAvailable(true);
          clearInterval(checkCast);
        }
      }, 1000);

      return () => clearInterval(checkCast);
    }
  }, []);

  const handleCast = () => {
    if (videoRef.current && window.chrome?.cast) {
      window.chrome.cast.requestSession(
        (session) => {
          if (window.chrome?.cast?.media) {
            const mediaInfo = new window.chrome.cast.media.MediaInfo(
              videoRef.current?.currentSrc || '',
              'video/mp4'
            );
            const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
            session.loadMedia(request);
          }
        },
        (error) => {
          console.error('Error casting:', error);
        }
      );
    }
  };

  const encuentro = encuentros[encuentroActual];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Contenido
        </h1>

        {/* Tabs de navegación principal */}
        <div className="bg-white rounded-lg shadow-md p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setVistaActual('bienvenida')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                vistaActual === 'bienvenida'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Bienvenida
            </button>
            <button
              onClick={() => setVistaActual('encuentros')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                vistaActual === 'encuentros'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Encuentros
            </button>
          </div>
        </div>

        {/* Vista de Bienvenida */}
        {vistaActual === 'bienvenida' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Bienvenido!
                </h2>
                <p className="text-gray-600">
                  Comienza viendo este video introductorio
                </p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Video de Bienvenida
                </h3>
                {isCastAvailable && (
                  <button
                    onClick={handleCast}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    aria-label="Castear video"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                      <line x1="2" y1="20" x2="2.01" y2="20" />
                    </svg>
                    Castear
                  </button>
                )}
              </div>
              <video
                ref={videoRef}
                controls
                className="w-full rounded-lg"
                preload="metadata"
              >
                <source src="/contenido/bienvenida.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <p className="text-blue-900 font-medium mb-3">
                Después de ver el video de bienvenida, continúa con los encuentros
              </p>
              <button
                onClick={() => setVistaActual('encuentros')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Ir a Encuentros
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Vista de Encuentros */}
        {vistaActual === 'encuentros' && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">
                {encuentro.titulo}
              </p>
            </div>

            {/* Navegación de Encuentros */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Seleccionar Encuentro
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {encuentros.map((enc, index) => (
                  <button
                    key={enc.id}
                    onClick={() => setEncuentroActual(index)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      encuentroActual === index
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {enc.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Reproductor de Audio
              </h2>
              <audio
                key={encuentro.audioUrl}
                controls
                className="w-full"
                preload="metadata"
              >
                <source src={encuentro.audioUrl} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>

            {/* Video Player */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Reproductor de Video
                </h2>
                {isCastAvailable && (
                  <button
                    onClick={handleCast}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    aria-label="Castear video"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                      <line x1="2" y1="20" x2="2.01" y2="20" />
                    </svg>
                    Castear
                  </button>
                )}
              </div>
              <video
                key={encuentro.videoUrl}
                ref={videoRef}
                controls
                className="w-full rounded-lg"
                preload="metadata"
              >
                <source src={encuentro.videoUrl} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    chrome?: {
      cast?: {
        isAvailable?: boolean;
        requestSession: (
          successCallback: (session: any) => void,
          errorCallback: (error: any) => void
        ) => void;
        media: {
          MediaInfo: new (contentId: string, contentType: string) => any;
          LoadRequest: new (mediaInfo: any) => any;
        };
      };
    };
  }
}
