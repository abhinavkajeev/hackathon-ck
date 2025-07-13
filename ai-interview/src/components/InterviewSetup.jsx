import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Clock,
  Brain,
  MessageSquare,
  Trophy,
  ChevronLeft,
  Volume2,
  VolumeX,
  Settings,
  CheckCircle,
} from "lucide-react";

const InterviewSetup = ({
  user,
  selectedRole,
  selectedLevel,
  roleName,
  levelName,
  onNavigate,
  onStartPreparation,
  currentQuestions,
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

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
              onClick={() => onNavigate("dashboard")}
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
              onClick={onStartPreparation}
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
};

export default InterviewSetup;