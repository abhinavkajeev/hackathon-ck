import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Clock, 
  Users, 
  Trophy,
  Zap,
  Shield,
  Target
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Interviews",
      description: "Experience realistic interview scenarios powered by advanced AI that adapts to your responses and provides intelligent follow-up questions.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Real-time Feedback",
      description: "Get instant feedback on your answers, body language, and communication skills to improve your performance immediately.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track your progress with detailed analytics and insights that help you identify strengths and areas for improvement.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere with our always-available AI interviewer that fits your schedule perfectly.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Multiple Industries",
      description: "Prepare for interviews across 15+ different industries with specialized questions and scenarios for each field.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Trophy,
      title: "Success Tracking",
      description: "Monitor your improvement over time with comprehensive success metrics and achievement milestones.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Zap,
      title: "Quick Practice",
      description: "Jump into practice sessions instantly with our one-click interview feature - no setup required.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your interview data is secure and private, with end-to-end encryption and no data sharing with third parties.",
      color: "from-gray-500 to-slate-500"
    },
    {
      icon: Target,
      title: "Targeted Preparation",
      description: "Focus on specific skills and question types with our targeted practice modes and customizable difficulty levels.",
      color: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-light mb-6 tracking-tight"
          >
            Powerful
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-semibold block"
            >
              Features
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the cutting-edge features that make InterviewAI your ultimate interview preparation companion
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gray-100 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700/50"
          >
            <h2 className="text-3xl font-semibold mb-6 text-white">
              Ready to Transform Your Interview Skills?
            </h2>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of professionals who have already improved their interview performance with InterviewAI
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:shadow-lg"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;