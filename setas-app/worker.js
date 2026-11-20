// Servidor intermediario para la IA de setas (Cloudflare Worker).
// La clave de Anthropic va en la variable secreta ANTHROPIC_API_KEY, NUNCA dentro de la app.
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' };
const IDIOMA = { es: 'español', ca: 'català', en: 'English' };

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    try {
      const { image, lang } = await req.json();
      if (!image || image.length > 2_000_000) throw new Error('imagen no válida');
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 700,
          system:
            'Eres un asistente de apoyo para recolectores de setas. Indica qué especies podría ser (nombre común y científico) con confianza baja, media o alta, ' +
            'qué rasgos visibles lo apoyan, qué rasgos NO se ven en la foto y hacen falta (láminas, pie, volva, olor, hábitat) y qué especies tóxicas o mortales se le parecen. ' +
            'NUNCA afirmes que una seta es comestible ni que es seguro comerla: una foto no basta. ' +
            'Termina SIEMPRE diciendo que no se fíen de esta respuesta y que la confirme un micólogo experto o una sociedad micológica antes de consumirla. ' +
            'Máximo 150 palabras. Responde en ' + (IDIOMA[lang] || IDIOMA.es) + '.',
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
              { type: 'text', text: '¿Qué seta puede ser?' },
            ],
          }],
        }),
      });
      const j = await r.json();
      const text = (j.content || []).map((c) => c.text || '').join('');
      return new Response(JSON.stringify({ text }), { headers: { ...cors, 'content-type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ text: '' }), { status: 400, headers: { ...cors, 'content-type': 'application/json' } });
    }
  },
};
