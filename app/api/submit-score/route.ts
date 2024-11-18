import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, score, gameStartTime } = body;

    // Basic username validation
    if (!username?.trim() || username.length < 2 || username.length > 10) {
      return NextResponse.json(
        { error: 'Invalid username' },
        { status: 400 }
      );
    }

    // Validate username appropriateness
    const validationResponse = await fetch(new URL('/api/validate-username', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    const validationData = await validationResponse.json();
    
    if (!validationData.appropriate) {
      return NextResponse.json({ 
        success: true,
        message: "username is not appropriate"
      });
    }

    // Calculate game duration in seconds
    const gameDurationSeconds = Math.floor((Date.now() - Number(gameStartTime)) / 1000);
    
    // Ensure score isn't more than 1 point per second
    if (score > gameDurationSeconds) {
      return NextResponse.json({ 
        success: true,
        message: `${score} points in ${gameDurationSeconds} seconds? nice try!`
      });
    }

    // Check if user exists and their current score
    const { data: existingUser } = await supabase
      .from('leaderboard')
      .select('score')
      .eq('username', username)
      .maybeSingle();

    // If user exists and new score is lower, return success without message
    if (existingUser && score <= existingUser.score) {
      return NextResponse.json({ 
        success: true
      });
    }

    // If user doesn't exist or new score is higher, upsert
    const { error } = await supabase
      .from('leaderboard')
      .upsert(
        { 
          username, 
          score,
          submitted_at: new Date().toISOString()
        },
        { 
          onConflict: 'username'
        }
      );

    if (error) throw error;

    return NextResponse.json({ 
      success: true,
      isNewHigh: existingUser ? score > existingUser.score : false
    });
    
  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'an error occurred' },
      { status: 500 }
    );
  }
}