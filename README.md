# Encuentro Canning

**Preview:** https://encuentro-canning.vercel.app/

**Live:** https://encuentrocanning.org/

---

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/beneliflo/encuentro-canning.git
cd encuentro-canning

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Completar los valores en .env.local (ver sección Variables de entorno)

# 4. Iniciar en modo desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`.

## Scripts

| Comando         | Descripción                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción                |
| `npm run start` | Iniciar build de producción        |
| `npm run lint`  | Ejecutar ESLint                    |

## Sistema de cola (fallback de Airtable)

Cuando Airtable no está disponible (caída, error 500, etc.), los registros del formulario de Despierta Canning no se pierden. El sistema funciona así:

1. **Airtable disponible** → los datos se envían directo a Airtable. Además, si hay submissions pendientes en cola, se procesan automáticamente en background.
2. **Airtable caído** → los datos se guardan en un archivo local (`.data/pending-submissions.json`). El usuario ve "Registro exitoso" y no pierde información.
3. **Airtable vuelve** → el próximo formulario exitoso dispara automáticamente el procesamiento de la cola pendiente. Cada item procesado se elimina de la cola para evitar duplicados.

### Consultar la cola manualmente

```bash
# Ver cantidad de submissions pendientes y detalle
curl https://encuentrocanning.org/api/despierta-canning/retry
```

### Procesar la cola manualmente

```bash
# Forzar el reintento de todos los pendientes (requiere RETRY_SECRET)
curl -X POST https://encuentrocanning.org/api/despierta-canning/retry \
  -H 'Content-Type: application/json' \
  -d '{"secret":"TU_RETRY_SECRET_AQUI"}'
```

### Respuesta del retry

```json
{
  "message": "Procesados: 3, fallidos: 0",
  "processed": 3,
  "failed": 0,
  "remaining": 0
}
```

> **Nota:** El archivo `.data/` está en `.gitignore` y no se commitea. En producción (Vercel), el filesystem es efímero, por lo que la cola solo persiste durante el ciclo de vida de la instancia serverless. Para un fallback más robusto en producción, considerar usar una base de datos externa o un servicio de colas.

## Deploy

El proyecto se despliega automáticamente en **Vercel** al pushear a la rama principal. Asegurate de configurar todas las variables de entorno en el dashboard de Vercel, incluyendo `RETRY_SECRET`.
