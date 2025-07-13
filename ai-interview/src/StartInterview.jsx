import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Mic,
  MicOff,
  Clock,
  ArrowRight,
  Brain,
  Timer,
  MessageSquare,
  Eye,
  EyeOff,
  Trophy,
  ChevronLeft,
  Volume2,
  VolumeX,
  Settings,
  CheckCircle,
  AlertCircle,
  X,
  Home,
} from "lucide-react";

const StartInterview = ({
  user,
  selectedRole,
  selectedLevel,
  roleName,
  levelName,
  onNavigate,
  onStartInterview,
  onExitInterview,
  onCompleteInterview,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [preparationTime, setPreparationTime] = useState(30);
  const [preparationStarted, setPreparationStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Sample questions based on role and level
  const questionSets = {
    frontend: {
      junior: [
        "Tell me about yourself and your experience with frontend development.",
        "What's the difference between HTML, CSS, and JavaScript?",
        "How do you ensure your website works across different browsers?",
        "Describe a challenging frontend project you've worked on.",
        "How do you optimize website performance?",
      ],
      mid: [
        "Explain the concept of responsive design and how you implement it.",
        "What are your preferred frontend frameworks and why?",
        "How do you manage state in a React application?",
        "Describe your experience with version control and Git.",
        "How do you approach debugging frontend issues?",
      ],
      senior: [
        "How do you architect scalable frontend applications?",
        "Explain your approach to mentoring junior developers.",
        "How do you stay updated with the latest frontend technologies?",
        "Describe a time you had to make a difficult technical decision.",
        "How do you balance technical debt with feature development?",
      ],
    },
    backend: {
      junior: [
        "Tell me about your experience with backend development.",
        "What's the difference between SQL and NoSQL databases?",
        "How do you handle API authentication and security?",
        "Describe your experience with server-side programming languages.",
        "How do you test your backend code?",
      ],
      mid: [
        "Explain your approach to designing RESTful APIs.",
        "How do you handle database optimization and scaling?",
        "Describe your experience with microservices architecture.",
        "How do you implement caching strategies?",
        "What's your approach to error handling and logging?",
      ],
      senior: [
        "How do you design systems for high availability and scalability?",
        "Explain your experience with cloud infrastructure and DevOps.",
        "How do you approach system security and compliance?",
        "Describe a time you optimized system performance significantly.",
        "How do you balance consistency and availability in distributed systems?",
      ],
    },
    fullstack: {
      junior: [
        "Tell me about your full-stack development experience.",
        "How do you decide between frontend and backend solutions?",
        "Describe a full-stack project you've built from scratch.",
        "How do you handle data flow between frontend and backend?",
        "What's your approach to learning new technologies?",
      ],
      mid: [
        "How do you architect full-stack applications?",
        "Explain your experience with database design and optimization.",
        "How do you handle user authentication across the stack?",
        "Describe your deployment and CI/CD processes.",
        "How do you balance frontend user experience with backend performance?",
      ],
      senior: [
        "How do you lead full-stack development teams?",
        "Explain your approach to technical decision-making across the stack.",
        "How do you ensure code quality and maintainability?",
        "Describe your experience with system architecture and scaling.",
        "How do you stay current with both frontend and backend trends?",
      ],
    },
  };

  const currentQuestions = questionSets[selectedRole]?.[selectedLevel] || [
    "Tell me about yourself and your experience.",
    "What's your greatest strength and weakness?",
    "Describe a challenging project you've worked on.",
    "How do you handle tight deadlines?",
    "Where do you see yourself in 5 years?",
  ];

  const interviewSettings = {
    questionTime: timeLeft,
    totalQuestions: currentQuestions.length,
    preparationTime: preparationTime,
    audioEnabled: isAudioEnabled,
  };

  useEffect(() => {
    let timer;
    if (preparationStarted && preparationTime > 0) {
      timer = setTimeout(() => setPreparationTime(preparationTime - 1), 1000);
    } else if (preparationStarted && preparationTime === 0) {
      setIsReady(true);
    }
    return () => clearTimeout(timer);
  }, [preparationStarted, preparationTime]);

  useEffect(() => {
    let timer;
    if (interviewStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (interviewStarted && timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [interviewStarted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPreparation = () => {
    setPreparationStarted(true);
    setPreparationTime(30);
  };

  const handleStartInterview = () => {
    setInterviewStarted(true);
    setTimeLeft(120);
    setCurrentQuestion(0);
    onStartInterview && onStartInterview();
  };

  const handleNextQuestion = () => {
    // Save current answer
    const newAnswer = {
      question: currentQuestions[currentQuestion],
      answer: userAnswer.trim(),
      timeSpent: 120 - timeLeft,
    };
    setAnswers(prev => [...prev, newAnswer]);

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setTimeLeft(120);
    } else {
      // Interview complete
      handleCompleteInterview();
    }
  };

  const handleCompleteInterview = () => {
    const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
    const feedback = generateFeedback(score);
    
    setFinalScore(score);
    setInterviewComplete(true);
    
    // Call parent callback if provided
    if (onCompleteInterview) {
      onCompleteInterview({
        score,
        feedback,
        answers,
        role: selectedRole,
        level: selectedLevel,
        completedAt: new Date().toISOString(),
      });
    }
  };

  const generateFeedback = (score) => {
    if (score >= 90) {
      return "Excellent performance! You demonstrated strong technical knowledge and communication skills. Your responses were well-structured and showed deep understanding of the concepts.";
    } else if (score >= 80) {
      return "Great job! You showed solid understanding and good communication skills. Consider providing more specific examples to strengthen your responses.";
    } else if (score >= 70) {
      return "Good effort! You have a solid foundation. Focus on providing more detailed explanations and concrete examples from your experience.";
    } else {
      return "Keep practicing! Review the fundamental concepts and practice explaining technical topics clearly. Consider taking some time to prepare specific examples from your experience.";
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleExitInterview = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    setShowExitConfirmation(false);
    setInterviewStarted(false);
    setPreparationStarted(false);
    setCurrentQuestion(0);
    setUserAnswer("");
    setTimeLeft(120);
    setAnswers([]);
    
    // Call parent callback if provided
    if (onExitInterview) {
      onExitInterview();
    }
    
    // Navigate to dashboard
    if (onNavigate) {
      onNavigate("dashboard");
    }
  };

  const cancelExit = () => {
    setShowExitConfirmation(false);
  };

  const handleReturnToDashboard = () => {
    if (onNavigate) {
      onNavigate("dashboard");
    }
  };

  // Interview completion screen
  if (interviewComplete) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-6 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center max-w-2xl w-full"
          >
            <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-light mb-4">Interview Complete!</h2>
            <p className="text-gray-400 mb-8">
              Congratulations on completing your mock interview
            </p>
            
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {finalScore}%
              </div>
              <div className="text-sm text-gray-400 mb-4">Your Score</div>
              <p className="text-gray-300 leading-relaxed">
                {generateFeedback(finalScore)}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-1">
                  {currentQuestions.length}
                </div>
                <div className="text-sm text-gray-400">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-1">
                  {answers.length}
                </div>
                <div className="text-sm text-gray-400">Answered</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white mb-1">
                  {Math.round(answers.reduce((acc, a) => acc + a.timeSpent, 0) / answers.length) || 0}s
                </div>
                <div className="text-sm text-gray-400">Avg Time</div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReturnToDashboard}
                className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Return to Dashboard</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Exit confirmation modal
  if (showExitConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-800 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Exit Interview?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to exit? Your progress will not be saved.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={cancelExit}
                className="flex-1 px-4 py-3 rounded-full font-medium border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-300"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmExit}
                className="flex-1 px-4 py-3 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
              >
                Exit Interview
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Pre-interview setup screen
  if (!preparationStarted && !interviewStarted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center mb-12 pb-6 border-b border-gray-800"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReturnToDashboard}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-light mb-1">Interview Setup</h1>
                <p className="text-gray-400">
                  Prepare for your {roleName} interview
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Interview Overview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 mb-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-light mb-2">Mock Interview</h2>
              <p className="text-gray-400">
                {roleName} • {levelName} • {currentQuestions.length} Questions
              </p>
            </div>

            {/* Interview Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-lg font-medium text-white mb-1">
                  2 minutes
                </div>
                <div className="text-sm text-gray-400">per question</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-lg font-medium text-white mb-1">
                  {currentQuestions.length}
                </div>
                <div className="text-sm text-gray-400">questions total</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-lg font-medium text-white mb-1">
                  AI Feedback
                </div>
                <div className="text-sm text-gray-400">after completion</div>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-800/50 rounded-xl p-6 mb-8"
                >
                  <h3 className="text-lg font-medium text-white mb-4">
                    Interview Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Audio Response</span>
                      <button
                        onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                      >
                        {isAudioEnabled ? (
                          <Volume2 className="w-5 h-5" />
                        ) : (
                          <VolumeX className="w-5 h-5" />
                        )}
                        <span>{isAudioEnabled ? "Enabled" : "Disabled"}</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Question Time</span>
                      <span className="text-white">2 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Preparation Time</span>
                      <span className="text-white">30 seconds</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tips */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-medium text-blue-400 mb-4">
                Interview Tips
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Speak clearly and at a moderate pace</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use specific examples from your experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Take a moment to think before answering</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Stay calm and confident throughout</span>
                </li>
              </ul>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartPreparation}
                className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Play className="w-5 h-5" />
                <span>Begin Interview</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Preparation phase
  if (preparationStarted && !isReady) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center"
        >
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Timer className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-3xl font-light mb-4">Get Ready</h2>
          <p className="text-gray-400 mb-8">
            Your interview will begin shortly
          </p>
          <div className="text-6xl font-light text-white mb-4">
            {preparationTime}
          </div>
          <div className="text-gray-400">seconds</div>
        </motion.div>
      </div>
    );
  }

  // Ready to start
  if (isReady && !interviewStarted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center"
        >
          <div className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-light mb-4">Ready to Start</h2>
          <p className="text-gray-400 mb-8">
            Click below to begin your interview
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartInterview}
            className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            <span>Start Interview</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Interview in progress
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
            <div className="text-right text-sm text-gray-400 mt-2">
              {userAnswer.length} characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleExitInterview}
              className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Exit Interview</span>
            </button>

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
                disabled={!userAnswer.trim() && !isRecording}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  userAnswer.trim() || isRecording
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
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
      </div>
    </div>
  );
};

export default StartInterview;