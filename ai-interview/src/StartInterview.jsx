import React, { useState } from "react";
import InterviewSetup from "./components/InterviewSetup";
import InterviewPreparation from "./components/InterviewPreparation";
import InterviewSession from "./components/InterviewSession";

const StartInterview = ({
  user,
  selectedRole,
  selectedLevel,
  roleName,
  levelName,
  onNavigate,
  onStartInterview,
}) => {
  const [currentPhase, setCurrentPhase] = useState("setup"); // "setup", "preparation", "interview"

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

  const handleStartPreparation = () => {
    setCurrentPhase("preparation");
  };

  const handleStartInterview = () => {
    setCurrentPhase("interview");
    onStartInterview && onStartInterview();
  };

  const handleComplete = (results) => {
    onNavigate("results", results);
  };

  // Render based on current phase
  switch (currentPhase) {
    case "setup":
      return (
        <InterviewSetup
          user={user}
          selectedRole={selectedRole}
          selectedLevel={selectedLevel}
          roleName={roleName}
          levelName={levelName}
          onNavigate={onNavigate}
          onStartPreparation={handleStartPreparation}
          currentQuestions={currentQuestions}
        />
      );

    case "preparation":
      return (
        <InterviewPreparation
          onStartInterview={handleStartInterview}
        />
      );

    case "interview":
      return (
        <InterviewSession
          currentQuestions={currentQuestions}
          onNavigate={onNavigate}
          onComplete={handleComplete}
        />
      );

    default:
      return null;
  }
};

export default StartInterview;