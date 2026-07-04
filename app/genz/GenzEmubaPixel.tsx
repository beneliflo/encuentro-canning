'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Pixel de EMUBA (distinto del pixel de Encuentro Canning). Solo se carga en las
// páginas de GEN Z para restaurar la conversión "Registro Pre sale GEN Z", que
// vive bajo este pixel. Se usa trackSingle para no mezclar métricas con el pixel
// del sitio.
const EMUBA_PIXEL_ID = '1555118446185115';

export default function GenzEmubaPixel() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    // El PageView inicial lo dispara el <Script> de abajo; acá solo cubrimos las
    // navegaciones client-side (por ejemplo, del formulario a /genz/gracias).
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    w.fbq?.('trackSingle', EMUBA_PIXEL_ID, 'PageView');
  }, [pathname]);

  return (
    <Script id="emuba-genz-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${EMUBA_PIXEL_ID}');
fbq('trackSingle','${EMUBA_PIXEL_ID}','PageView');`}
    </Script>
  );
}
