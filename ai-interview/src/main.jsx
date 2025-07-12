import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./index.css";
import LandingPage from "./LandingPage.jsx";
import StartInterview from "./StartInterview.jsx";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.username || "";
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onNavigate={(route, userData) =>
              navigate(`/${route}`, { state: userData })
            }
          />
        }
      />
      <Route path="/start" element={<StartInterview user={user} />} />
      <Route
        path="*"
        element={
          <LandingPage
            onNavigate={(route, userData) =>
              navigate(`/${route}`, { state: userData })
            }
          />
        }
      />
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>
);
