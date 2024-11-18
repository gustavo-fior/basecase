import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, score, gameToken } = body;

    // Basic username validation
    if (!username?.trim() || username.length < 2 || username.length > 10) {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }

    // Validate username appropriateness
    const validationResponse = await fetch(
      new URL("/api/validate-username", request.url),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      }
    );

    const validationData = await validationResponse.json();

    if (!validationData.appropriate) {
      return NextResponse.json({
        success: true,
        message: "username is not appropriate",
      });
    }

    if (!gameToken) {
      return NextResponse.json({
        success: false,
        message: "invalid game session",
      });
    }

    // Verify the game token
    try {
      const { startTime } = await verifyToken(gameToken);
      const gameDurationSeconds = Math.floor((Date.now() - startTime) / 1000);

      // Ensure score isn't more than 1 point per second
      if (score > gameDurationSeconds) {
        return NextResponse.json({
          success: false,
          message: `nice try ;)`,
        });
      }
    } catch (error) {
      console.error("Game session error:", error);
      return NextResponse.json({
        success: false,
        message: "invalid game session",
      });
    }

    // Check if user exists and their current score
    const { data: existingUser } = await supabase
      .from("leaderboard")
      .select("score")
      .eq("username", username.toLowerCase())
      .maybeSingle();

    // If user exists and new score is lower, return success without message
    if (existingUser && score <= existingUser.score) {
      return NextResponse.json({
        success: true,
      });
    }

    // If user doesn't exist or new score is higher, upsert
    const { error } = await supabase.from("leaderboard").upsert(
      {
        username: username.toLowerCase(),
        score,
        submitted_at: new Date().toISOString(),
      },
      {
        onConflict: "username",
      }
    );

    if (error) throw error;

    return NextResponse.json({
      success: true,
      isNewHigh: existingUser ? score > existingUser.score : false,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "an error occurred" }, { status: 500 });
  }
}
