// server/utils/generalAI.js
const questions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in 5 years?",
  "Why do you want to work here?",
  "Describe a challenging situation you faced and how you handled it.",
  "What motivates you?",
  "How do you deal with stress and pressure?",
  "Tell me about a time you worked in a team.",
  "What is your greatest achievement?",
  "What is your biggest failure, and what did you learn from it?",
  "How do you handle feedback?",
  "What are your salary expectations?",
  "Why are you leaving your current job?",
  "How do you prioritize your tasks?",
  "Are you willing to relocate?",
  "What do you know about our company?",
  "What are you passionate about?",
  "Do you prefer working independently or in a team?",
  "What kind of work environment do you thrive in?",
  "Give an example of a time you showed leadership.",
  "How do you stay organized?",
  "Tell me about a conflict you resolved.",
  "How do you define success?",
  "How do you keep yourself updated professionally?"
];

function getRandomQuestion() {
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
}

// Simple evaluation based on structure, tone, and depth
function evaluateAnswer(answer) {
  const lower = answer.toLowerCase();
  let score = 0;
  let feedback = "";
  let suggestions = [];

  const wordCount = answer.trim().split(/\s+/).length;

  if (wordCount > 120) {
    feedback = "Well-explained and detailed answer.";
    score += 4;
  } else if (wordCount > 60) {
    feedback = "Decent explanation but could go deeper.";
    score += 3;
    suggestions.push("Try to elaborate more with examples.");
  } else if (wordCount > 30) {
    feedback = "Some explanation provided.";
    score += 2;
    suggestions.push("Add more details and personal experience.");
  } else {
    feedback = "Too short.";
    score += 1;
    suggestions.push("Give a complete answer with 2-3 sentences at least.");
  }

  if (lower.includes("team") || lower.includes("collaborate")) score += 1;
  if (lower.includes("learn") || lower.includes("improve")) score += 1;
  if (lower.includes("challenge") || lower.includes("overcome")) score += 1;
  if (lower.includes("success") || lower.includes("goal")) score += 1;

  if (!lower.includes("example")) {
    suggestions.push("Use specific examples to back your answer.");
  }
  if (!lower.includes("i") && !lower.includes("me")) {
    suggestions.push("Make sure your answer sounds personal.");
  }

  const finalScore = Math.min(10, score);

  return {
    score: finalScore,
    feedback,
    suggestions
  };
}

// ✅ Use ESM export
export { getRandomQuestion, evaluateAnswer };
