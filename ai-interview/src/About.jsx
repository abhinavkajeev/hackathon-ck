import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Award, 
  Globe, 
  Lightbulb,
  Heart,
  Target,
  Rocket,
  Star
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face",
      bio: "Former Google recruiter with 10+ years of experience in technical interviews."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "AI researcher and former Microsoft engineer specializing in natural language processing."
    },
    {
      name: "Emma Thompson",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Product strategist with experience building user-centric platforms at Meta and Spotify."
    },
    {
      name: "David Kim",
      role: "Lead AI Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Machine learning expert focused on conversational AI and real-time feedback systems."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for perfection in every interview simulation and feedback mechanism."
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We understand job searching stress and create supportive, encouraging experiences."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push the boundaries of AI technology for better interview preparation."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "We make quality interview preparation available to everyone, everywhere."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "InterviewAI was born from the vision to democratize interview preparation"
    },
    {
      year: "2023",
      title: "AI Engine Launch",
      description: "Released our first AI-powered interview simulator with 10,000+ early users"
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to serve 50+ countries with multilingual support"
    },
    {
      year: "2025",
      title: "Industry Recognition",
      description: "Named 'Best AI Career Tool' by TechCrunch and reached 100k+ users"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="py-20">
        <div className="container mx-auto px-8">
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
              About
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-semibold block"
              >
                InterviewAI
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              We're on a mission to transform how people prepare for interviews, making career success accessible to everyone through cutting-edge AI technology.
            </motion.p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
          >
            <div>
              <h2 className="text-3xl font-semibold mb-6 text-white">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  InterviewAI was founded in 2022 by a team of former recruiters, engineers, and AI researchers who recognized a critical gap in interview preparation. Traditional methods were outdated, expensive, and inaccessible to many job seekers.
                </p>
                <p>
                  We believed that everyone deserves the opportunity to present their best self in interviews, regardless of their background or resources. This vision drove us to create an AI-powered platform that provides personalized, realistic interview practice at scale.
                </p>
                <p>
                  Today, we're proud to have helped over 100,000 professionals across 50+ countries land their dream jobs, with a 95% success rate among our active users.
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700/50"
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">100K+</div>
                  <div className="text-gray-400">Users Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-400">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-400">Availability</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-32"
          >
            <h2 className="text-3xl font-semibold mb-12 text-center text-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gray-100 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mb-32"
          >
            <h2 className="text-3xl font-semibold mb-12 text-center text-white">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                    className="relative flex items-center"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center relative z-10">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-8">
                      <div className="text-blue-400 font-semibold text-sm mb-1">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-semibold mb-12 text-center text-white">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.0 + index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700 transition-all duration-300 text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700/50"
            >
              <h2 className="text-3xl font-semibold mb-6 text-white">
                Join Our Mission
              </h2>
              <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
                Be part of the interview preparation revolution. Start your journey with InterviewAI today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:shadow-lg"
              >
                Get Started Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;