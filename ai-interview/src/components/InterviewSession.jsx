import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, ArrowRight, AlertCircle, Camera, CameraOff } from "lucide-react";

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
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  
  // Camera states
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraSupported, setCameraSupported] = useState(false);
  
  const recognitionRef = useRef(null);
  const interimTranscriptRef = useRef("");
  const videoRef = useRef(null);

  // Check for camera support
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraSupported(true);
    }
  }, []);

  // Initialize camera
  const initializeCamera = async () => {
    if (!cameraSupported) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false 
      });
      
      setCameraStream(stream);
      setCameraEnabled(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraEnabled(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraEnabled(false);
  };

  // Auto-initialize camera when component mounts
  useEffect(() => {
    initializeCamera();
    
    return () => {
      stopCamera();
    };
  }, []);

  // Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Check for speech recognition support
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure speech recognition
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update the transcript state
        setTranscript(prev => prev + finalTranscript);
        interimTranscriptRef.current = interimTranscript;
        
        // Update the user answer with final transcript
        if (finalTranscript) {
          setUserAnswer(prev => prev + finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (isRecording) {
          // Restart recognition if we're still supposed to be recording
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.error('Error restarting recognition:', error);
            setIsRecording(false);
          }
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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
      const res = await fetch("https://hackathon-ck.vercel.app/api/interview/evaluate", {
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
      setAllFeedbacks(prev => {
        // Only add if not already added for this question
        if (prev.length === currentQuestion) {
          return [...prev, data];
        } else {
          // Replace if re-evaluated
          return prev.map((fb, idx) => idx === currentQuestion ? data : fb);
        }
      });
    } catch (err) {
      console.error("❌ Error evaluating answer:", err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleFinishInterview = async () => {
    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    
    // Stop camera
    stopCamera();
    
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

    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

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
          setTranscript("");
          interimTranscriptRef.current = "";
        } else {
          // Last question - finish interview
          handleFinishInterview();
        }
      },
      feedback ? 10000 : 10000
    );
  };

  const handleSkipQuestion = () => {
    if (isInterviewFinished) return;

    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setFeedback(null);
      setTimeLeft(120);
      setTranscript("");
      interimTranscriptRef.current = "";
    } else {
      // Last question - finish interview
      handleFinishInterview();
    }
  };

  const handleExitInterview = () => {
    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    
    // Stop camera
    stopCamera();
    
    setIsInterviewFinished(true);

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

  const toggleRecording = async () => {
    if (!speechSupported) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if (recognitionRef.current) {
          recognitionRef.current.start();
          setIsRecording(true);
        }
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Please allow microphone access to use voice recording.');
      }
    }
  };

  const toggleCamera = async () => {
    if (cameraEnabled) {
      stopCamera();
    } else {
      await initializeCamera();
    }
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

  const [allFeedbacks, setAllFeedbacks] = useState([]); // Track all feedbacks

  if (isInterviewFinished) {
    // Calculate overall marks and improvements
    const totalScore = allFeedbacks.reduce((sum, fb) => sum + (fb?.score || 0), 0);
    const avgScore = allFeedbacks.length > 0 ? (totalScore / allFeedbacks.length).toFixed(2) : 0;
    // Gather all suggestions
    const allSuggestions = allFeedbacks.flatMap(fb => fb?.suggestions || []);
    // Remove duplicates
    const uniqueSuggestions = Array.from(new Set(allSuggestions));

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

          {/* Overall Section */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mt-6 max-w-lg mx-auto">
            <h3 className="text-xl font-medium text-white mb-4">Overall Results</h3>
            <p className="text-lg text-gray-300 mb-2">
              <strong>Average Score:</strong> {avgScore} / 10
            </p>
            <p className="text-lg text-gray-300 mb-4">
              <strong>Total Questions:</strong> {allFeedbacks.length}
            </p>
            <div className="text-left">
              <h4 className="text-lg font-medium text-white mb-2">Improvements Needed:</h4>
              {uniqueSuggestions.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {uniqueSuggestions.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No suggestions. Great job!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Camera */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 sticky top-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Camera View</h3>
                <button
                  onClick={toggleCamera}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    cameraEnabled
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}
                >
                  {cameraEnabled ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                  <span className="text-sm">{cameraEnabled ? "Turn Off" : "Turn On"}</span>
                </button>
              </div>
              
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                {cameraEnabled ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Recording Indicator */}
                    <AnimatePresence>
                      {isRecording && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-3 py-2 rounded-full border border-red-500/30"
                        >
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-sm text-red-400 font-medium">RECORDING</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Camera Status */}
                    <div className="absolute bottom-4 right-4 bg-green-500/20 backdrop-blur-sm px-3 py-2 rounded-full border border-green-500/30">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400">LIVE</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <CameraOff className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Camera Off</p>
                      {!cameraSupported && (
                        <p className="text-xs text-red-400 mt-1">Camera not supported</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Camera Controls */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  {cameraEnabled ? "Your camera is active" : "Camera is disabled"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interview Content */}
          <div className="lg:col-span-2">
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
                  disabled={!speechSupported}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    isRecording
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  } ${!speechSupported ? "opacity-50 cursor-not-allowed" : ""}`}
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
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm text-red-400">
                        {isListening ? "Listening..." : "Starting..."}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!speechSupported && (
                  <div className="text-sm text-yellow-400">
                    Speech recognition not supported in this browser
                  </div>
                )}
              </div>

              {/* Live Transcript Display */}
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-400">Live Transcript</span>
                  </div>
                  <div className="text-white min-h-[40px]">
                    {transcript}
                    <span className="text-gray-400 italic">
                      {interimTranscriptRef.current}
                    </span>
                    {(!transcript && !interimTranscriptRef.current) && (
                      <span className="text-gray-500 italic">
                        Start speaking to see your words appear here...
                      </span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your answer (speech will be added here):
                </label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your response here or use voice recording..."
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
      </div>
    </div>
  );
};

export default InterviewSession;