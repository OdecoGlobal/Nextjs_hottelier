import { Client } from '@upstash/qstash';

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function scheduleDailyCleanup() {
  const response = await qstash.publish({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}cleanup`,
    // schedule: '0 0 1 * *',
    schedule: '*/2 * * * *',
    retries: 3,
  });
  return response;
}
