import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required', appropriate: false },
        { status: 200 }
      );
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a content moderator. Respond with only 'true' if the username is appropriate, or 'false' if it contains profanity, hate speech, or other inappropriate content."
        },
        {
          role: "user",
          content: username
        }
      ],
      model: "gpt-4o-mini",
    });

    const isAppropriate = completion.choices[0].message.content?.toLowerCase() === 'true';

    return NextResponse.json({ 
      appropriate: isAppropriate,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error in route handler:', error);
    // If API fails, we'll allow the username but log the error
    return NextResponse.json(
      { error: 'Failed to validate username', appropriate: true },
      { status: 200 }
    );
  }
}