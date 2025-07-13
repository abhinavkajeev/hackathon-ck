// server/routes/interview.js
import express from 'express';
import { evaluateWithGemini } from '../utils/geminiAI.js';

const router = express.Router();

router.post('/evaluate', async (req, res) => {
  const { question, userAnswer } = req.body;

  if (!question || !userAnswer) {
    return res.status(400).json({ error: 'Missing question or userAnswer' });
  }

  try {
    const feedback = await evaluateWithGemini(question, userAnswer);
    res.json(feedback);
  } catch (error) {
    console.error('❌ Gemini Evaluation error:', error.message);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

export default router;
