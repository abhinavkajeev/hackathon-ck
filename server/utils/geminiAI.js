// server/utils/geminiAI.js
import dotenv from 'dotenv';
dotenv.config();

export async function evaluateWithGemini(question, answer) {
  const prompt = `
You are an experienced interview coach.

Evaluate the candidate's answer to this question:

Question: "${question}"
Answer: "${answer}"

Respond ONLY with a valid JSON object. Do NOT include any explanation or text before or after it.

Format:
{
  "score": number (0 to 10),
  "feedback": "string",
  "suggestions": ["string", "string"]
}
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // ✅ working model
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("📦 Full OpenRouter Response:\n", JSON.stringify(data, null, 2));

    const content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("❌ No content returned from OpenRouter");
    }

    const cleaned = content.replace(/^```json|^```|```$/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return parsed;

  } catch (err) {
    console.error('❌ OpenRouter Gemini error:', err.message);
    return {
      score: 5,
      feedback: 'Unable to evaluate the answer.',
      suggestions: ['Try again with a longer or more specific response.']
    };
  }
}
 