# Gestión de Videos en Vercel

## Problema
Los videos pesan **397MB** y hacen que los deploys tarden 8+ minutos en lugar de 2 minutos.

## Solución implementada
Los videos están excluidos del proceso de upload en `.vercelignore` para acelerar los builds.

---

## 📹 Cómo actualizar o cambiar videos

### **Opción 1: Deploy temporal con videos** (Recomendada)
Cuando necesites actualizar videos:

1. **Edita `.vercelignore`** y comenta las líneas de exclusión:
   ```bash
   # public/videos/**/*.mp4
   # public/videos/**/*.webm
   ```

2. **Actualiza el video** en `public/videos/`

3. **Commit y push:**
   ```bash
   git add .
   git commit -m "Update video: [nombre del video]"
   git push
   ```

4. **Espera el deploy** (tardará ~8 minutos esta vez)

5. **Restaura `.vercelignore`** descomentando las líneas:
   ```bash
   public/videos/**/*.mp4
   public/videos/**/*.webm
   ```

6. **Commit y push** de nuevo:
   ```bash
   git add .vercelignore
   git commit -m "Restore fast builds"
   git push
   ```

---

### **Opción 2: CDN externo** (Mejor para el futuro)
Migrar videos a un CDN como:
- **Cloudflare R2** (gratis hasta 10GB)
- **Vercel Blob Storage**
- **AWS S3 + CloudFront**
- **Bunny CDN**

**Ventajas:**
- ✅ Builds siempre rápidos (1-2 min)
- ✅ Mejor performance de carga
- ✅ No cuenta contra límites de Vercel
- ✅ Actualizar videos sin redeploy

---

### **Opción 3: Vercel CLI para subir solo videos**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Subir solo la carpeta de videos
vercel --prod --force
```

---

## 🎯 Recomendación

**Para ahora:** Usa **Opción 1** cuando necesites actualizar videos (es simple y directo)

**Para el futuro:** Migra a **Opción 2** (CDN externo) para:
- Builds siempre rápidos
- Mejor experiencia de usuario
- Más control sobre los videos

---

## 📊 Estado actual

- **Videos totales:** 397MB
- **Build sin videos:** ~2 minutos
- **Build con videos:** ~8 minutos
- **Videos excluidos:** ✅ Sí (en `.vercelignore`)
