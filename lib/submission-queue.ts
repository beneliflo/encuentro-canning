import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface QueuedSubmission {
  id: string;
  timestamp: string;
  payload: {
    hostFirstName: string;
    hostLastName: string;
    hostPhone: string;
    role: string;
    locationName?: string;
    guests: { firstName: string; lastName: string; prayerRequest: string; invited: string; confirmed: string }[];
  };
  attempts: number;
  lastError?: string;
}

const DATA_DIR = join(process.cwd(), '.data');
const QUEUE_FILE = join(DATA_DIR, 'pending-submissions.json');

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readQueue(): QueuedSubmission[] {
  ensureDataDir();
  if (!existsSync(QUEUE_FILE)) return [];
  try {
    const raw = readFileSync(QUEUE_FILE, 'utf-8');
    return JSON.parse(raw) as QueuedSubmission[];
  } catch {
    return [];
  }
}

export function writeQueue(queue: QueuedSubmission[]): void {
  ensureDataDir();
  writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf-8');
}

export function enqueue(payload: QueuedSubmission['payload']): string {
  const queue = readQueue();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  queue.push({
    id,
    timestamp: new Date().toISOString(),
    payload,
    attempts: 0,
  });
  writeQueue(queue);
  return id;
}

export function removeFromQueue(id: string): void {
  const queue = readQueue();
  writeQueue(queue.filter((item) => item.id !== id));
}

export function updateAttempt(id: string, error: string): void {
  const queue = readQueue();
  const item = queue.find((i) => i.id === id);
  if (item) {
    item.attempts += 1;
    item.lastError = error;
    writeQueue(queue);
  }
}
