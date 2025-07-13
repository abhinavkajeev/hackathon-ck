import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Trophy,
  Clock,
  TrendingUp,
  User,
  Settings,
  BookOpen,
  Target,
  Calendar,
  BarChart3,
  ChevronRight,
  Star,
  Award,
  Brain,
  Code,
  Database,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  PlusCircle,
  Filter,
  Search,
  MoreHorizontal,
  Bookmark,
  Download,
  Share2,
} from "lucide-react";

const Dashboard = ({ user, onNavigate, onStartInterview }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [stats, setStats] = useState({
    totalInterviews: 12,
    averageScore: 78,
    bestScore: 95,
    improvement: 15,
    streakDays: 5,
    completionRate: 85,
  });

  // Sample interview history data
  const [interviewHistory, setInterviewHistory] = useState([
    {
      id: 1,
      role: "frontend",
      level: "senior",
      score: 85,
      date: "2024-01-15",
      duration: "45 min",
      status: "completed",
      feedback: "Great technical knowledge, good communication skills",
    },
    {
      id: 2,
      role: "backend",
      level: "mid",
      score: 78,
      date: "2024-01-10",
      duration: "42 min",
      status: "completed",
      feedback: "Solid understanding, could improve on system design",
    },
    {
      id: 3,
      role: "fullstack",
      level: "junior",
      score: 92,
      date: "2024-01-05",
      duration: "38 min",
      status: "completed",
      feedback: "Excellent problem-solving approach",
    },
  ]);

  const roles = [
    {
      id: "frontend",
      name: "Frontend Developer",
      description: "React, Vue, Angular, HTML/CSS, JavaScript",
      icon: Globe,
      color: "blue",
      questions: 25,
    },
    {
      id: "backend",
      name: "Backend Developer",
      description: "Node.js, Python, Java, Databases, APIs",
      icon: Database,
      color: "green",
      questions: 30,
    },
    {
      id: "fullstack",
      name: "Full Stack Developer",
      description: "Frontend + Backend + System Design",
      icon: Code,
      color: "purple",
      questions: 35,
    },
  ];

  const levels = [
    {
      id: "junior",
      name: "Junior",
      description: "0-2 years experience",
      difficulty: "Beginner",
      color: "green",
    },
    {
      id: "mid",
      name: "Mid-Level",
      description: "2-5 years experience",
      difficulty: "Intermediate",
      color: "yellow",
    },
    {
      id: "senior",
      name: "Senior",
      description: "5+ years experience",
      difficulty: "Advanced",
      color: "red",
    },
  ];

  const achievements = [
    {
      id: 1,
      name: "First Interview",
      description: "Complete your first mock interview",
      icon: Trophy,
      earned: true,
      date: "2024-01-01",
    },
    {
      id: 2,
      name: "Score Master",
      description: "Achieve a score of 90% or higher",
      icon: Star,
      earned: true,
      date: "2024-01-05",
    },
    {
      id: 3,
      name: "Consistent Learner",
      description: "Complete 5 interviews in a week",
      icon: Calendar,
      earned: false,
      progress: 3,
      total: 5,
    },
    {
      id: 4,
      name: "Full Stack Expert",
      description: "Complete interviews for all three roles",
      icon: Award,
      earned: false,
      progress: 2,
      total: 3,
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoleModal(false);
    setShowLevelModal(true);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setShowLevelModal(false);
  };

  const handleStartInterview = () => {
    if (selectedRole && selectedLevel) {
      const roleData = roles.find(r => r.id === selectedRole);
      const levelData = levels.find(l => l.id === selectedLevel);
      
      onStartInterview && onStartInterview({
        role: selectedRole,
        level: selectedLevel,
        roleName: roleData.name,
        levelName: levelData.name,
      });
    }
  };

  const filteredHistory = interviewHistory.filter(interview => {
    const matchesSearch = interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roles.find(r => r.id === interview.role)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || interview.role === filterType;
    return matchesSearch && matchesFilter;
  });

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-yellow-400";
    if (score >= 70) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 90) return "bg-green-500/20 border-green-500/30";
    if (score >= 80) return "bg-yellow-500/20 border-yellow-500/30";
    if (score >= 70) return "bg-orange-500/20 border-orange-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-light mb-2">
              Welcome back, {user?.name || "Developer"}
            </h1>
            <p className="text-gray-400">
              Ready to practice your interview skills?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
            >
              <Settings className="w-6 h-6" />
            </motion.button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-xs text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalInterviews}</div>
            <div className="text-xs text-gray-400">Interviews</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-gray-400">Average</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.averageScore}%</div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-5 h-5 text-green-400" />
              <span className="text-xs text-gray-400">Best</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.bestScore}%</div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-gray-400">Growth</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">+{stats.improvement}%</div>
            <div className="text-xs text-gray-400">This month</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-xs text-gray-400">Streak</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.streakDays}</div>
            <div className="text-xs text-gray-400">Days</div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-gray-400">Rate</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.completionRate}%</div>
            <div className="text-xs text-gray-400">Complete</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Start */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light">Start New Interview</h2>
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Role
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowRoleModal(true)}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 text-left"
                  >
                    {selectedRole ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {React.createElement(roles.find(r => r.id === selectedRole)?.icon, {
                            className: "w-5 h-5 text-blue-400"
                          })}
                          <span className="text-white">{roles.find(r => r.id === selectedRole)?.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Choose your role...</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </motion.button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Level
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectedRole && setShowLevelModal(true)}
                    disabled={!selectedRole}
                    className={`w-full p-4 border rounded-lg text-left transition-all duration-300 ${
                      selectedRole
                        ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                        : "bg-gray-800/20 border-gray-800 cursor-not-allowed"
                    }`}
                  >
                    {selectedLevel ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            selectedLevel === "junior" ? "bg-green-400" :
                            selectedLevel === "mid" ? "bg-yellow-400" : "bg-red-400"
                          }`} />
                          <span className="text-white">{levels.find(l => l.id === selectedLevel)?.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">
                          {selectedRole ? "Choose your level..." : "Select role first"}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartInterview}
                disabled={!selectedRole || !selectedLevel}
                className={`w-full py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  selectedRole && selectedLevel
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Play className="w-5 h-5" />
                <span>Start Interview</span>
              </motion.button>
            </motion.div>

            {/* Interview History */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light">Interview History</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search interviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-600"
                  >
                    <option value="all">All Roles</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredHistory.map((interview, index) => {
                  const role = roles.find(r => r.id === interview.role);
                  const level = levels.find(l => l.id === interview.level);
                  
                  return (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            role?.color === "blue" ? "bg-blue-500/20" :
                            role?.color === "green" ? "bg-green-500/20" : "bg-purple-500/20"
                          }`}>
                            {React.createElement(role?.icon, {
                              className: `w-6 h-6 ${
                                role?.color === "blue" ? "text-blue-400" :
                                role?.color === "green" ? "text-green-400" : "text-purple-400"
                              }`
                            })}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-white">{role?.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                level?.color === "green" ? "bg-green-500/20 text-green-400" :
                                level?.color === "yellow" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                              }`}>
                                {level?.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{interview.date}</span>
                              <span>{interview.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full border ${getScoreBg(interview.score)}`}>
                            <span className={`text-sm font-medium ${getScoreColor(interview.score)}`}>
                              {interview.score}%
                            </span>
                          </div>
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
            >
              <h3 className="text-lg font-medium text-white mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? "bg-green-500/10 border border-green-500/20" : "bg-gray-800/30"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned ? "bg-green-500/20" : "bg-gray-700/50"
                    }`}>
                      {React.createElement(achievement.icon, {
                        className: `w-4 h-4 ${achievement.earned ? "text-green-400" : "text-gray-400"}`
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {achievement.description}
                      </div>
                      {!achievement.earned && achievement.progress && (
                        <div className="mt-1">
                          <div className="bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-blue-400 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {achievement.progress}/{achievement.total}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
            >
              <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Study Materials</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                >
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  <span className="text-white">View Analytics</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                >
                  <Download className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Export Results</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      <AnimatePresence>
        {showRoleModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-light text-white mb-6">Select Your Role</h3>
              <div className="space-y-4">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect(role.id)}
                    className="w-full p-6 bg-gray-800/50 hover:bg-gray-800/80 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        role.color === "blue" ? "bg-blue-500/20" :
                        role.color === "green" ? "bg-green-500/20" : "bg-purple-500/20"
                      }`}>
                        {React.createElement(role.icon, {
                          className: `w-6 h-6 ${
                            role.color === "blue" ? "text-blue-400" :
                            role.color === "green" ? "text-green-400" : "text-purple-400"
                          }`
                        })}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">{role.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{role.description}</p>
                        <div className="text-xs text-gray-500">
                          {role.questions} practice questions available
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Level Selection Modal */}
      <AnimatePresence>
        {showLevelModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 max-w-lg w-full mx-4"
            >
              <h3 className="text-2xl font-light text-white mb-6">Select Your Level</h3>
              <div className="space-y-4">
                {levels.map((level) => (
                  <motion.button
                    key={level.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLevelSelect(level.id)}
                    className="w-full p-6 bg-gray-800/50 hover:bg-gray-800/80 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        level.color === "green" ? "bg-green-400" :
                        level.color === "yellow" ? "bg-yellow-400" : "bg-red-400"
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">{level.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{level.description}</p>
                        <div className="text-xs text-gray-500">
                          Difficulty: {level.difficulty}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowLevelModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
                    