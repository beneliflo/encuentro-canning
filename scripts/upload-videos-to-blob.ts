import { put } from '@vercel/blob';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { config } from 'dotenv';

// Cargar variables de entorno desde .env.local
config({ path: '.env.local' });

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('❌ Error: BLOB_READ_WRITE_TOKEN no está configurado');
  console.log('\n📝 Para obtener el token:');
  console.log('1. Ve a tu proyecto en Vercel Dashboard');
  console.log('2. Settings → Storage → Create Database → Blob');
  console.log('3. Copia el BLOB_READ_WRITE_TOKEN');
  console.log('4. Ejecuta: export BLOB_READ_WRITE_TOKEN="tu_token_aqui"');
  process.exit(1);
}

interface VideoMapping {
  localPath: string;
  blobUrl: string;
  size: number;
}

async function uploadVideosToBlob() {
  const videoMappings: VideoMapping[] = [];
  const videosDir = join(process.cwd(), 'public', 'videos');
  
  console.log('🚀 Iniciando migración de videos a Vercel Blob...\n');

  async function processDirectory(dir: string, prefix: string = '') {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        await processDirectory(fullPath, relativePath);
      } else if (entry.name.endsWith('.mp4') || entry.name.endsWith('.webm')) {
        console.log(`📹 Subiendo: ${relativePath}...`);
        
        try {
          const fileBuffer = await readFile(fullPath);
          const blob = await put(relativePath, fileBuffer, {
            access: 'public',
            addRandomSuffix: false,
          });

          const sizeInMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);
          
          videoMappings.push({
            localPath: `/videos/${relativePath}`,
            blobUrl: blob.url,
            size: fileBuffer.length,
          });

          console.log(`   ✅ Subido (${sizeInMB} MB): ${blob.url}\n`);
        } catch (error) {
          console.error(`   ❌ Error subiendo ${relativePath}:`, error);
        }
      }
    }
  }

  await processDirectory(videosDir);

  console.log('\n📊 Resumen de migración:');
  console.log(`   Total de videos: ${videoMappings.length}`);
  const totalSizeMB = videoMappings.reduce((sum, v) => sum + v.size, 0) / (1024 * 1024);
  console.log(`   Tamaño total: ${totalSizeMB.toFixed(2)} MB`);
  
  console.log('\n📝 Mapeo de URLs (guarda esto):');
  console.log(JSON.stringify(videoMappings, null, 2));

  console.log('\n✅ Migración completada!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Copia el mapeo de URLs de arriba');
  console.log('2. Actualiza los componentes para usar las nuevas URLs de Blob');
  console.log('3. Elimina los videos de public/videos/ después de verificar');
}

uploadVideosToBlob().catch(console.error);
