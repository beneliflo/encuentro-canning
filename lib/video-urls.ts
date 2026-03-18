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
    videoNewHome: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/tcp/VIDEO%20NEW%20HOME%20TCP.mp4',
    sectionBottom: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/tcp/section-bottom.mp4',
    finalPromo: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/tcp/FINAL%20PROMO%20TCP%201080.mp4',
    resumen: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/tcp/VF%20RESUMEN%20TCP%202025.mp4',
    videoFecha: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/tcp/VIDEO%20FECHA%20TCP.mp4',
    webLogoRojo: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/tcp/web%20tcp%20logo%20rojo.mp4',
    webOradores: 'https://vagzbxgwa0l1xgj2.public.blob.vercel-storage.com/tcp/web%20tcp%20oradores.mp4',
  },
  
  // Thumbnails (siguen en public/images)
  thumbnails: {
    vfProyecto: '/images/thumb-VF F PROYECTO COLEGIO EC.png',
  }
} as const;
