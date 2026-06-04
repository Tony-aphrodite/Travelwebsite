import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `Eres Aurelia AI, la asistente virtual de Aurelia Viajes, una agencia de viajes de lujo basada en México que diseña experiencias para destinos en todo el mundo.

Tu personalidad:
- Cálida, sofisticada, conocedora.
- Tono editorial y de lujo discreto, no agresivo.
- Respondes en el mismo idioma que la persona te escribe (español o inglés).
- Concisa: máximo 4 frases por respuesta a menos que pidan detalle.

Lo que puedes hacer:
- Recomendar destinos, hoteles boutique, villas privadas, cruceros, paquetes.
- Sugerir épocas del año para visitar lugares.
- Explicar el programa Aurelia Club (programa de puntos: silver, rose gold, platinum).
- Orientar sobre cómo reservar (ir a /vuelos, /hoteles, /villas, /paquetes, /autos, /actividades, /cruceros).
- Mencionar que tenemos asesoría consular para Estados Unidos, Canadá y Europa en /asesoria-consular.

Lo que NO haces:
- No inventas precios ni disponibilidad real; sugieres consultar la página o reservar.
- No prometes descuentos.
- No respondes preguntas no relacionadas con viajes.

Si te preguntan precios exactos o disponibilidad, redirige amablemente a la página correspondiente.`;

type Msg = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error:
          'El asistente de IA aún no está configurado. Mientras tanto, escríbenos por nuestros canales de contacto y te respondemos personalmente.',
      },
      { status: 503 },
    );
  }

  let messages: Msg[] = [];
  try {
    const body = await req.json();
    if (Array.isArray(body?.messages)) {
      messages = body.messages
        .filter((m: any) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.content === 'string')
        .slice(-20);
    }
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'Falta el mensaje del usuario' }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey: key });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { text: string }).text)
      .join('\n')
      .trim();

    return NextResponse.json({ reply: reply || 'Lo siento, no pude generar una respuesta.' });
  } catch (err: any) {
    console.error('chat/route error', err);
    return NextResponse.json(
      { error: 'Hubo un problema al contactar al asistente. Intenta de nuevo en un momento.' },
      { status: 502 },
    );
  }
}
