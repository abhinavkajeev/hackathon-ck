import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, ArrowRight, AlertCircle } from "lucide-react";

const InterviewSession = ({
  currentQuestions = [], // Add default value
  onNavigate,
  onComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);

  // Add validation for required props
  useEffect(() => {
    if (!currentQuestions || currentQuestions.length === 0) {
      console.warn("InterviewSession: No questions provided");
    }
  }, [currentQuestions]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isInterviewFinished) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !isInterviewFinished) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isInterviewFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer.trim()) return;

    setEvaluating(true);
    try {
      const res = await fetch("http://localhost:3000/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestions[currentQuestion],
          userAnswer: userAnswer,
        }),
      });

      const data = await res.json();
      console.log("🎯 AI Feedback:", data);
      setFeedback(data);
    } catch (err) {
      console.error("❌ Error evaluating answer:", err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleFinishInterview = async () => {
    setIsInterviewFinished(true);

    // Evaluate current answer if there is one
    if (userAnswer.trim()) {
      await handleEvaluateAnswer();
    }

    // Create final results
    const finalResults = {
      score: Math.floor(Math.random() * 40) + 60,
      feedback: "Great job completing the interview!",
      totalQuestions: currentQuestions.length,
      completedQuestions: currentQuestion + 1,
      completed: true,
      timestamp: new Date().toISOString(),
    };

    // Call onComplete callback if provided and is a function
    if (typeof onComplete === "function") {
      onComplete(finalResults);
    }

    // Navigate back to dashboard
    setTimeout(() => {
      if (typeof onNavigate === "function") {
        onNavigate("dashboard");
      } else {
        console.warn("InterviewSession: onNavigate prop is not a function");
      }
    }, 10000);
  };

  const handleNextQuestion = async () => {
    if (isInterviewFinished) return;

    // Evaluate current answer if there is one
    if (userAnswer.trim()) {
      await handleEvaluateAnswer();
    }

    setTimeout(
      () => {
        if (currentQuestion < currentQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setUserAnswer("");
          setFeedback(null);
          setTimeLeft(120);
        } else {
          // Last question - finish interview
          handleFinishInterview();
        }
      },
      feedback ? 10000 : 500
    );
  };

  const handleSkipQuestion = () => {
    if (isInterviewFinished) return;

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setFeedback(null);
      setTimeLeft(120);
    } else {
      // Last question - finish interview
      handleFinishInterview();
    }
  };

  const handleExitInterview = () => {
    setIsInterviewNotFinished(true);

    // Create exit results
    const exitResults = {
      score: 0,
      feedback: "Interview exited early",
      totalQuestions: currentQuestions.length,
      completedQuestions: currentQuestion,
      completed: false,
      exited: true,
      timestamp: new Date().toISOString(),
    };

    // Call onComplete callback if provided and is a function
    if (typeof onComplete === "function") {
      onComplete(exitResults);
    }
    // Navigate back to dashboard and pass exitResults
    if (typeof onNavigate === "function") {
      onNavigate("dashboard", exitResults);
    } else {
      console.warn("InterviewSession: onNavigate prop is not a function");
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Add early return if no questions
  if (!currentQuestions || currentQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-light mb-2">No Questions Available</h2>
          <p className="text-gray-400 mb-4">
            Please provide interview questions to start the session.
          </p>
          <button
            onClick={() => {
              if (typeof onNavigate === "function") {
                onNavigate("dashboard");
              }
            }}
            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isInterviewFinished) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-green-400 text-2xl"
              >
                ✓
              </motion.div>
            </div>
            <h2 className="text-2xl font-light mb-2">Interview Completed!</h2>
            <p className="text-gray-400">Redirecting to dashboard...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8 pb-6 border-b border-gray-800"
        >
          <div>
            <h1 className="text-2xl font-light mb-2">Mock Interview</h1>
            <p className="text-gray-400">
              Question {currentQuestion + 1} of {currentQuestions.length}
            </p>
          </div>
          <div className="text-right">
            <div
              className={`text-2xl font-mono font-bold mb-1 ${
                timeLeft <= 30 ? "text-red-400" : "text-white"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-400">Time Remaining</div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((currentQuestion + 1) / currentQuestions.length) * 100
                }%`,
              }}
              className="bg-white h-2 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mb-8"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-white">
                Interview Question
              </h2>
              {timeLeft <= 30 && (
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">Time running out!</span>
                </div>
              )}
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              {currentQuestions[currentQuestion]}
            </p>
          </div>

          {/* Recording Controls */}
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleRecording}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                isRecording
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-green-500/20 text-green-400 border border-green-500/30"
              }`}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </motion.button>

            <AnimatePresence>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2 text-red-400"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm">Recording in progress...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Or type your answer:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your response here..."
              className="w-full h-32 p-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors resize-none"
            />
            {evaluating && (
              <div className="text-sm text-yellow-400 mt-2">
                Evaluating your answer...
              </div>
            )}

            {/* AI Feedback */}
            {feedback && (
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 mt-4">
                <h4 className="text-lg font-medium text-white mb-2">
                  AI Feedback
                </h4>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Score:</strong> {feedback.score}/10
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Comment:</strong> {feedback.feedback}
                </p>
                {feedback.suggestions && (
                  <ul className="list-disc list-inside text-sm text-gray-400">
                    {feedback.suggestions.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="text-right text-sm text-gray-400 mt-2">
              {userAnswer.length} characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExitInterview}
              className="text-gray-400 hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              ← Exit Interview
            </motion.button>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkipQuestion}
                className="px-6 py-3 rounded-full font-medium border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-300"
              >
                Skip
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
                disabled={evaluating}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  evaluating
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <span>
                  {currentQuestion === currentQuestions.length - 1
                    ? "Finish Interview"
                    : "Next Question"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Question Preview */}
        {currentQuestion < currentQuestions.length - 1 && (
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Upcoming Questions
            </h3>
            <div className="space-y-2">
              {currentQuestions
                .slice(currentQuestion + 1, currentQuestion + 3)
                .map((question, index) => (
                  <div key={index} className="text-sm text-gray-500 truncate">
                    {currentQuestion + index + 2}. {question}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSession;
