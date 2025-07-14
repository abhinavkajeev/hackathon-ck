import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Play, CheckCircle } from "lucide-react";

const InterviewPreparation = ({ onStartInterview }) => {
  const [preparationTime, setPreparationTime] = useState(30);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timer;
    if (preparationTime > 0) {
      timer = setTimeout(() => setPreparationTime(preparationTime - 1), 1000);
    } else {
      setIsReady(true);
    }
    return () => clearTimeout(timer);
  }, [preparationTime]);

  // Preparation countdown phase
  if (!isReady) {
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

  // Ready to start phase
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
          onClick={onStartInterview}
          className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 mx-auto"
        >
          <Play className="w-5 h-5" />
          <span>Start Interview</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default InterviewPreparation;