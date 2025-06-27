import { Client } from '@upstash/qstash';

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function scheduleDailyCleanup() {
  const response = await qstash.publish({
    url: `https://nextjs-hottelier.vercel.app/api/v1/cleanup`,
    schedule: '0 0 1 * *',
    retries: 3,
  });
  return response;
}
