import { scheduleDailyCleanup } from '@/utils/schedule-cleanup';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await scheduleDailyCleanup();
    return NextResponse.json({ message: 'Scheduled!', response });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
}
