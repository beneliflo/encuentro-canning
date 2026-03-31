// Video URLs - Servidos desde public/videos/

export const VIDEO_URLS = {
  // Homepage videos
  hero: '/videos/hero-video.mp4',
  aulaSensorial: '/videos/Aula Sensorial VF F.mp4',
  aulaSensorialWebm: '/videos/Aula Sensorial VF F.webm',
  proyectoColegio: '/videos/VF F PROYECTO COLEGIO EC.mp4',
  proyectoColegioWebm: '/videos/VF F PROYECTO COLEGIO EC.webm',
  
  // TCP videos
  tcp: {
    videoNewHome: '/videos/tcp/VIDEO HOME TCP_2 (1).mp4',
    videoNewHomeWebm: '/videos/tcp/VIDEO HOME TCP_2 (1).webm',
    sectionBottom: '/videos/tcp/section-bottom.mp4',
    sectionBottomWebm: '/videos/tcp/section-bottom.webm',
    finalPromo: '/videos/tcp/FINAL PROMO TCP 1080.mp4',
    resumen: '/videos/tcp/Spot TCP 26 Lanzamiento.mp4',
    resumenWebm: '/videos/tcp/Spot TCP 26 Lanzamiento.webm',
  },
  
  // Thumbnails (siguen en public/images)
  thumbnails: {
    vfProyecto: '/images/thumb-VF F PROYECTO COLEGIO EC.png',
  }
} as const;
