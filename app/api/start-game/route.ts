import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    const token = await createToken(startTime);
    
    return NextResponse.json({ token });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to start game' },
      { status: 500 }
    );
  }
}