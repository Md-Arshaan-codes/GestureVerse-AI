// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// import Loader from "./components/Loader";
// import TransitionWrapper from "./components/TransitionWrapper";

// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import DashboardPage from "./pages/DashboardPage";
// import Mode1Page from "./pages/Mode1Page";
// import Mode2Page from "./pages/Mode2Page";
// import Mode3Page from "./pages/Mode3Page";
// import ContactPage from "./pages/ContactPage";

// function AnimatedRoutes() {
//   const location = useLocation();

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route
//           path="/"
//           element={
//             <TransitionWrapper>
//               <LandingPage />
//             </TransitionWrapper>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <TransitionWrapper>
//               <LoginPage />
//             </TransitionWrapper>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <TransitionWrapper>
//               <DashboardPage />
//             </TransitionWrapper>
//           }
//         />

//         <Route
//           path="/dashboard/mode1"
//           element={
//             <TransitionWrapper>
//               <Mode1Page />
//             </TransitionWrapper>
//           }
//         />

//         <Route
//           path="/dashboard/mode2"
//           element={
//             <TransitionWrapper>
//               <Mode2Page />
//             </TransitionWrapper>
//           }
//         />

//         <Route
//           path="/dashboard/mode3"
//           element={
//             <TransitionWrapper>
//               <Mode3Page />
//             </TransitionWrapper>
//           }
//         />

//         <Route
//           path="/dashboard/contact"
//           element={
//             <TransitionWrapper>
//               <ContactPage />
//             </TransitionWrapper>
//           }
//         />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2600);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) return <Loader />;

//   return (
//     <BrowserRouter>
//       <AnimatedRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Loader from "./components/Loader";
import LoginLaunchLoader from "./components/LoginLaunchLoader";
import TransitionWrapper from "./components/TransitionWrapper";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Mode1Page from "./pages/Mode1Page";
import Mode2Page from "./pages/Mode2Page";
import Mode3Page from "./pages/Mode3Page";
import ContactPage from "./pages/ContactPage";

import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

function LoginLoadingRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoginLaunchLoader />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <TransitionWrapper>
              <LandingPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <TransitionWrapper>
              <LoginPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/signup"
          element={
            <TransitionWrapper>
              <SignupPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/loading"
          element={<LoginLoadingRoute />}
        />

        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TransitionWrapper>
                  <DashboardPage />
                </TransitionWrapper>
              </ProtectedRoute>
            }
        />

        <Route
          path="/dashboard/mode1"
          element={
            <ProtectedRoute>
              <TransitionWrapper>
                <Mode1Page />
              </TransitionWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mode2"
          element={
            <ProtectedRoute>
              <TransitionWrapper>
                <Mode2Page />
              </TransitionWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/mode3"
          element={
            <ProtectedRoute>
              <TransitionWrapper>
                <Mode3Page />
              </TransitionWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/contact"
          element={
            <ProtectedRoute>
              <TransitionWrapper>
                <ContactPage />
              </TransitionWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return <AnimatedRoutes />;
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;