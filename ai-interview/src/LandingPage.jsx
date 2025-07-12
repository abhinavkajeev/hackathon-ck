import React, { useState, useMemo } from "react";
import { Brain, ChevronDown, Eye, EyeOff } from "lucide-react";

const LandingPage = ({ onNavigate }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setError("");
    setLoading(true);
    try {
      let payload;
      if (isLogin) {
        payload = {
          username: formData.email,
          password: formData.password,
        };
      } else {
        payload = {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        };
      }
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const response = await fetch(`http://localhost:7000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        // Show backend error message if available
        throw new Error(data.error || data.message || "Authentication failed");
      }
      setLoading(false);
      if (onNavigate) {
        onNavigate("dashboard", data.user || data);
      }
      setShowLoginModal(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Authentication failed");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Memoize LoginModal so it only re-renders when its dependencies change
  const LoginModal = useMemo(
    () => (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 relative">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-white">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400">
                {isLogin
                  ? "Sign in to continue your interview practice"
                  : "Start your interview preparation journey"}
              </p>
            </div>

            <div className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500 transition-colors pr-12 text-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors transform hover:scale-[1.02] active:scale-[0.98] ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading
                  ? isLogin
                    ? "Signing In..."
                    : "Creating Account..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ name: "", email: "", password: "" });
                    setError("");
                  }}
                  className="text-white hover:text-gray-300 font-medium ml-2 transition-colors"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    ),
    [
      isLogin,
      showPassword,
      formData,
      error,
      loading,
      setShowLoginModal,
      setIsLogin,
      setFormData,
      setError,
    ]
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800/50 transform transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-semibold">InterviewAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>
          </nav>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-8 py-20">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8 transform transition-all duration-800">
              <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
                One-click for
                <br />
                <span className="font-semibold">Interview</span>
                <br />
                <span className="text-gray-400">Success</span>
              </h1>
            </div>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed transform transition-all duration-300 delay-300">
              Dive into the art of interviews, where innovative AI technology
              meets career expertise
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 transform transition-all duration-300 delay-600">
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-102 active:scale-98"
              >
                Open App
              </button>

              <button className="border border-gray-700 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-all duration-300 transform hover:scale-102 active:scale-98">
                Discover More
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transform transition-all duration-300 delay-800">
            {[
              { number: "50K+", label: "Interviews Completed" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Availability" },
              { number: "15+", label: "Job Roles Covered" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-8 flex items-center gap-2 text-gray-400 transform transition-all duration-300 delay-1200">
          <ChevronDown className="w-4 h-4" />
          <span className="text-sm">01/03 · Scroll down</span>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && LoginModal}
    </div>
  );
};

export default LandingPage;
