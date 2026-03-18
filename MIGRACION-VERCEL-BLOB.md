# 🚀 Migración de Videos a Vercel Blob

## 💰 Costos (Plan Hobby - GRATIS)

Tu proyecto usa **397MB de videos** → ✅ **Completamente gratis**

**Límites del plan Hobby:**
- ✅ 5 GB de almacenamiento (usarás 0.4 GB)
- ✅ 100K operaciones simples/mes
- ✅ 10K operaciones avanzadas/mes
- ✅ 100 GB de transferencia/mes

**Si excedes:** No te cobran, solo se bloquea hasta el próximo mes.

---

## 📋 Pasos para migrar

### 1️⃣ Configurar Vercel Blob

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `encuentro-canning`
3. Ve a **Storage** → **Create Database** → **Blob**
4. Copia el `BLOB_READ_WRITE_TOKEN`

### 2️⃣ Ejecutar el script de migración

```bash
# Configurar el token (reemplaza con tu token real)
export BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxx"

# Ejecutar el script de migración
npx tsx scripts/upload-videos-to-blob.ts
```

El script:
- ✅ Sube todos los videos de `public/videos/` a Vercel Blob
- ✅ Mantiene la estructura de carpetas
- ✅ Te da un mapeo completo de URLs antiguas → nuevas
- ✅ Muestra el progreso y tamaño de cada video

### 3️⃣ Actualizar las URLs en el código

Después de que el script termine, copia el mapeo de URLs y actualiza `lib/video-urls.ts`:

**Antes:**
```typescript
export const VIDEO_URLS = {
  hero: '/videos/hero-video.mp4',
  // ...
}
```

**Después:**
```typescript
export const VIDEO_URLS = {
  hero: 'https://xxxxx.public.blob.vercel-storage.com/hero-video.mp4',
  // ... (usa las URLs del mapeo)
}
```

### 4️⃣ Actualizar componentes que usan videos

Busca y reemplaza las rutas hardcodeadas por el objeto `VIDEO_URLS`:

```bash
# Encontrar componentes que usan videos
grep -r "'/videos/" app/components/
```

**Ejemplo de actualización:**

```typescript
// Antes
<video src="/videos/hero-video.mp4" />

// Después
import { VIDEO_URLS } from '@/lib/video-urls'
<video src={VIDEO_URLS.hero} />
```

### 5️⃣ Verificar en staging

```bash
# Deploy a preview
git add .
git commit -m "Migrate videos to Vercel Blob"
git push
```

Verifica que todos los videos carguen correctamente en el preview deploy.

### 6️⃣ Limpiar archivos locales

**Solo después de verificar que todo funciona:**

```bash
# Mover videos a una carpeta de backup (por si acaso)
mkdir -p ../backup-videos
mv public/videos/* ../backup-videos/

# O eliminarlos directamente
# rm -rf public/videos/*.mp4 public/videos/*.webm
```

### 7️⃣ Actualizar .vercelignore

Ya no necesitas excluir videos porque ya no estarán en `public/`:

```bash
# Puedes eliminar o comentar estas líneas en .vercelignore
# public/videos/**/*.mp4
# public/videos/**/*.webm
```

---

## 🎯 Beneficios después de la migración

| Antes | Después |
|-------|---------|
| Build: 8+ minutos | Build: 1-2 minutos ⚡ |
| 397MB en cada deploy | ~5MB en cada deploy |
| Videos en Git | Videos en CDN optimizado |
| Sin caché global | Caché global automático |
| Actualizar = redeploy | Actualizar = solo subir archivo |

---

## 🔄 Cómo actualizar un video después de migrar

```bash
# 1. Configurar token
export BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxx"

# 2. Subir nuevo video (reemplaza automáticamente)
npx tsx -e "
import { put } from '@vercel/blob';
import { readFile } from 'fs/promises';

const file = await readFile('ruta/al/nuevo-video.mp4');
const blob = await put('hero-video.mp4', file, { 
  access: 'public',
  addRandomSuffix: false 
});
console.log('✅ Video actualizado:', blob.url);
"
```

**No necesitas redeploy** - el video se actualiza instantáneamente.

---

## 📊 Monitoreo de uso

Ve a **Vercel Dashboard** → **Storage** → **Blob** para ver:
- Almacenamiento usado
- Transferencia de datos
- Operaciones realizadas
- Costos (si estás en plan Pro)

---

## ⚠️ Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN not found"
```bash
# Asegúrate de exportar el token en la misma terminal
export BLOB_READ_WRITE_TOKEN="tu_token"
echo $BLOB_READ_WRITE_TOKEN  # Verificar que está configurado
```

### Videos no cargan después de migrar
1. Verifica que las URLs en `video-urls.ts` sean correctas
2. Revisa que los videos sean públicos (`access: 'public'`)
3. Chequea la consola del navegador para errores CORS

### Quiero revertir la migración
1. Restaura los videos desde `../backup-videos/`
2. Revierte los cambios en `video-urls.ts`
3. Deploy

---

## 💡 Próximos pasos opcionales

1. **Optimizar videos:** Comprimir con ffmpeg antes de subir
2. **Lazy loading:** Cargar videos solo cuando sean visibles
3. **Múltiples resoluciones:** Subir versiones 720p, 1080p, etc.
4. **Analytics:** Trackear reproducciones de videos

---

## 📞 Soporte

- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [Pricing Details](https://vercel.com/docs/storage/vercel-blob/usage-and-pricing)
- [SDK Reference](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk)
