export interface Env {
  AI: Ai;
  ALLOWED_ORIGIN?: string;
  MODEL?: string;
}

type PlanRequest = {
  problem?: unknown;
  category?: unknown;
  deadline?: unknown;
  budget?: unknown;
  availableTime?: unknown;
  location?: unknown;
};

const categories = new Set([
  'Business & Income',
  'Education & Skills',
  'Agriculture & Food',
  'Everyday Problems',
  'Technology',
  'Community & Environment',
]);
const jsonHeaders = { 'content-type': 'application/json; charset=utf-8' };

function reply(body: unknown, status = 200, origin = '*'): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...jsonHeaders, 'access-control-allow-origin': origin, 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'POST, OPTIONS', 'cache-control': 'no-store' } });
}

function clean(value: unknown, max = 500): string { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }

function extractJson(text: string): Record<string, unknown> | null {
  const content = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)?.[1] ?? text;
  const start = content.indexOf('{');
  const end = content.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try { const parsed = JSON.parse(content.slice(start, end + 1)); return parsed && typeof parsed === 'object' ? parsed : null; } catch { return null; }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN || '*';
    if (request.method === 'OPTIONS') return reply(null, 204, origin);
    if (request.method !== 'POST') return reply({ error: 'Method not allowed' }, 405, origin);
    if (!request.headers.get('content-type')?.includes('application/json')) return reply({ error: 'Content-Type must be application/json' }, 415, origin);
    const length = Number(request.headers.get('content-length') || 0);
    if (length > 20000) return reply({ error: 'Request is too large' }, 413, origin);

    let input: PlanRequest;
    try { input = await request.json() as PlanRequest; } catch { return reply({ error: 'Invalid JSON body' }, 400, origin); }
    const problem = clean(input.problem, 2000);
    const category = clean(input.category, 80);
    if (problem.length < 12) return reply({ error: 'Describe the problem in at least 12 characters.' }, 400, origin);
    if (category && !categories.has(category)) return reply({ error: 'Unsupported category.' }, 400, origin);

    const details = { deadline: clean(input.deadline, 120), budget: clean(input.budget, 120), availableTime: clean(input.availableTime, 120), location: clean(input.location, 160) };
    const prompt = `Create a practical, safe action plan. Return JSON only with exactly these keys: summary (string), steps (array of 5 strings), options (array of 3 strings), risks (array of 2 strings), timeframe (string), assumptions (array of strings). Be concrete and realistic. For emergency, self-harm, medical, legal, or financial danger, recommend qualified local help and emergency services where appropriate. Problem: ${problem}\nCategory: ${category || 'General'}\nDetails: ${JSON.stringify(details)}`;

    try {
      const result = await env.AI.run(env.MODEL || '@cf/meta/llama-3.1-8b-instruct', { messages: [{ role: 'system', content: 'You are Solvana, a cautious planning assistant. Never invent credentials, guarantees, laws, prices, or emergency contacts.' }, { role: 'user', content: prompt }], max_tokens: 1200, temperature: 0.3 });
      const text = typeof result === 'object' && result && 'response' in result ? String(result.response) : '';
      const plan = extractJson(text);
      if (!plan) return reply({ error: 'The AI returned an invalid plan. Please try again.' }, 502, origin);
      return reply({ plan, generatedBy: 'Solvana AI' }, 200, origin);
    } catch (error) { console.error('AI generation failed', error); return reply({ error: 'The planning service is temporarily unavailable. Please try again.' }, 503, origin); }
  },
};
