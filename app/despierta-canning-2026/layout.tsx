import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anfitriones Despierta Canning 2026 — Registro',
  description:
    'Registrate como anfitrión o co-anfitrión de Despierta Canning 2026. Anotá a tus invitados y sé parte de esta aventura de fe para alcanzar la ciudad de Canning con el evangelio.',
  keywords: [
    'Despierta Canning',
    'Despierta Canning 2026',
    'anfitrión',
    'registro anfitrión',
    'Encuentro Canning',
    'evangelismo Canning',
    'iglesia Canning',
  ],
  openGraph: {
    title: 'Anfitriones Despierta Canning 2026 — Registro',
    description:
      'Registrate como anfitrión de Despierta Canning 2026 y anotá a tus invitados.',
    images: [
      {
        url: '/og-image-despierta-canning.jpg',
        width: 1200,
        height: 630,
        alt: 'Despierta Canning 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anfitriones Despierta Canning 2026 — Registro',
    description:
      'Registrate como anfitrión de Despierta Canning 2026 y anotá a tus invitados.',
    images: ['/og-image-despierta-canning.jpg'],
  },
};

export default function DespiertaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
