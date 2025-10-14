// app/api/gemini/route.js (Next.js 13)
import { chatSession } from '@/utils/GeminiAIModel'; // server only import allowed here

export async function POST(req) {
  const { prompt } = await req.json();

  const result = await chatSession.sendMessage(prompt);

  return new Response(JSON.stringify({ response: await result.response.text() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}