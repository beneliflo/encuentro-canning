import { NextRequest, NextResponse } from 'next/server';
import { readQueue, removeFromQueue, updateAttempt } from '@/lib/submission-queue';
import { processSubmission } from '../route';

const RETRY_SECRET = process.env.RETRY_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (RETRY_SECRET) {
      const { secret } = (await request.json()) as { secret?: string };
      if (secret !== RETRY_SECRET) {
        return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
      }
    }

    const queue = readQueue();

    if (queue.length === 0) {
      return NextResponse.json({ message: 'No hay envíos pendientes.', processed: 0 });
    }

    let processed = 0;
    let failed = 0;
    const errors: { id: string; error: string }[] = [];

    for (const item of queue) {
      try {
        await processSubmission(item.payload);
        removeFromQueue(item.id);
        processed++;
        console.log(`Queued submission ${item.id} processed successfully.`);
      } catch (err) {
        failed++;
        const errorMsg = err instanceof Error ? err.message : String(err);
        updateAttempt(item.id, errorMsg);
        errors.push({ id: item.id, error: errorMsg });
        console.error(`Queued submission ${item.id} failed again:`, errorMsg);
      }
    }

    return NextResponse.json({
      message: `Procesados: ${processed}, fallidos: ${failed}`,
      processed,
      failed,
      errors: errors.length > 0 ? errors : undefined,
      remaining: readQueue().length,
    });
  } catch (error) {
    console.error('Retry endpoint error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la cola.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const queue = readQueue();
    return NextResponse.json({
      pending: queue.length,
      submissions: queue.map((item) => ({
        id: item.id,
        timestamp: item.timestamp,
        host: `${item.payload.hostFirstName} ${item.payload.hostLastName}`,
        guests: item.payload.guests.length,
        attempts: item.attempts,
        lastError: item.lastError,
      })),
    });
  } catch (error) {
    console.error('Queue status error:', error);
    return NextResponse.json({ error: 'Error al leer la cola.' }, { status: 500 });
  }
}
