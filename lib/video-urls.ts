// Video URLs - Migrados a Vercel Blob (São Paulo, Brazil)
// Todos los videos están en CDN global para mejor performance

export const VIDEO_URLS = {
  // Homepage videos
  hero: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/hero-video.mp4',
  aulaSensorial: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/Aula%20Sensorial%20VF%20F.mp4',
  aulaSensorialWebm: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/Aula%20Sensorial%20VF%20F.webm',
  proyectoColegio: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/VF%20F%20PROYECTO%20COLEGIO%20EC.mp4',
  proyectoColegioWebm: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/VF%20F%20PROYECTO%20COLEGIO%20EC.webm',
  
  // TCP videos
  tcp: {
    videoNewHome: '/videos/tcp/VIDEO NEW HOME TCP.mp4',
    videoNewHomeWebm: '/videos/tcp/VIDEO NEW HOME TCP.webm',
    sectionBottom: '/videos/tcp/section-bottom.mp4',
    sectionBottomWebm: '/videos/tcp/section-bottom.webm',
    finalPromo: '/videos/tcp/FINAL PROMO TCP 1080.mp4',
    resumen: '/videos/tcp/VF RESUMEN TCP 2025.mp4',
    resumenWebm: '/videos/tcp/VF RESUMEN TCP 2025.webm',
    videoFecha: '/videos/tcp/VIDEO FECHA TCP.mp4',
    webLogoRojo: '/videos/tcp/web tcp logo rojo.mp4',
    webOradores: '/videos/tcp/web tcp oradores.mp4',
  },
  
  // Thumbnails (siguen en public/images)
  thumbnails: {
    vfProyecto: '/images/thumb-VF F PROYECTO COLEGIO EC.png',
  }
} as const;
