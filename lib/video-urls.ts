// Video URLs - Servidos desde public/videos/

export const VIDEO_URLS = {
  // Homepage videos
  hero: '/hero-video.mp4',
  aulaSensorial: '/videos/Aula Sensorial VF F.mp4',
  aulaSensorialWebm: '/videos/Aula Sensorial VF F.webm',
  proyectoColegio: '/videos/VF F PROYECTO COLEGIO EC.mp4',
  proyectoColegioWebm: '/videos/VF F PROYECTO COLEGIO EC.webm',
  
  // TCP videos
  tcp: {
    videoNewHome: '/videos/tcp/VIDEO NEW HOME TCP.mp4',
    videoNewHomeWebm: '/videos/tcp/VIDEO NEW HOME TCP.webm',
    sectionBottom: '/videos/tcp/section-bottom.mp4',
    sectionBottomWebm: '/videos/tcp/section-bottom.webm',
    finalPromo: '/videos/tcp/FINAL PROMO TCP 1080.mp4',
    resumen: '/videos/tcp/Spot TCP 26 Lanzamiento.mp4',
    resumenWebm: '/videos/tcp/Spot TCP 26 Lanzamiento.webm',
    videoFecha: '/videos/tcp/VIDEO FECHA TCP.mp4',
    webLogoRojo: '/videos/tcp/web tcp logo rojo.mp4',
    webOradores: '/videos/tcp/web tcp oradores.mp4',
  },
  
  // Thumbnails (siguen en public/images)
  thumbnails: {
    vfProyecto: '/images/thumb-VF F PROYECTO COLEGIO EC.png',
  }
} as const;
