import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Gallery from "./pages/Gallery";
import OnboardingTour from "./components/OnboardingTour"; // 🔧 NEW
import InstallPWA from "./components/InstallPWA"; // 🔧 NEW
import ScrollToTop from "./components/ScrollToTop"; // 🔧 NEW

function App() {
  // 🔧 NEW: Tour state
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour
    const hasSeenTour = localStorage.getItem("onboarding-tour-completed");

    if (!hasSeenTour) {
      // Show tour after 1 second on first visit
      setTimeout(() => {
        setRunTour(true);
      }, 1000);
    }
  }, []);

  const handleTourFinish = () => {
    setRunTour(false);
    localStorage.setItem("onboarding-tour-completed", "true");
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        {/* FALLING LEAVES - LEFT & RIGHT SIDES ONLY */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* LEFT SIDE LEAVES */}
          <div
            style={{
              position: "absolute",
              left: "2%",
              top: "-10%",
              fontSize: "2rem",
              animation: "floatLeaf 15s infinite linear",
              animationDelay: "0s",
            }}
          >
            🍃
          </div>
          <div
            style={{
              position: "absolute",
              left: "8%",
              top: "-10%",
              fontSize: "1.5rem",
              animation: "floatLeafReverse 18s infinite linear",
              animationDelay: "3s",
            }}
          >
            🌿
          </div>
          <div
            style={{
              position: "absolute",
              left: "5%",
              top: "-10%",
              fontSize: "2rem",
              animation: "floatLeaf 15s infinite linear",
              animationDelay: "6s",
            }}
          >
            🍀
          </div>
          <div
            style={{
              position: "absolute",
              left: "12%",
              top: "-10%",
              fontSize: "2.5rem",
              animation: "floatLeafReverse 18s infinite linear",
              animationDelay: "2s",
            }}
          >
            🌱
          </div>
          <div
            style={{
              position: "absolute",
              left: "3%",
              top: "-10%",
              fontSize: "2rem",
              animation: "floatLeaf 15s infinite linear",
              animationDelay: "8s",
            }}
          >
            🌾
          </div>
          <div
            style={{
              position: "absolute",
              left: "10%",
              top: "-10%",
              fontSize: "1.8rem",
              animation: "floatLeafReverse 18s infinite linear",
              animationDelay: "5s",
            }}
          >
            🪴
          </div>
          <div
            style={{
              position: "absolute",
              left: "7%",
              top: "-10%",
              fontSize: "1.6rem",
              animation: "floatLeaf 15s infinite linear",
              animationDelay: "10s",
            }}
          >
            🍃
          </div>

          {/* RIGHT SIDE LEAVES */}
          <div
            style={{
              position: "absolute",
              right: "2%",
              top: "-10%",
              fontSize: "2rem",
              animation: "floatLeafReverse 18s infinite linear",
              animationDelay: "1s",
            }}
          >
            🌿
          </div>
          <div
            style={{
              position: "absolute",
              right: "8%",
              top: "-10%",
              fontSize: "1.5rem",
              animation: "floatLeaf 15s infinite linear",
              animationDelay: "4s",
            }}
          >
            🍀
          </div>
          <div
            style={{
              position: "absolute",
              right: "5%",
              top: "-10%",
              fontSize: "2.2rem",
              animation: "floatLeafReverse 18s infinite linear",
              animationDelay: "7s",
            }}
          >
            🌱
          </div>
          <div
            style={{
              position: "absolute",
              right: "12%",
              top: "-10%",
              fontSize: "2rem",
              animation: "floatLeaf 15s infinite linear",
              animationDelay: "2s",
            }}
          >
            🌾
          </div>
          <div
            style={{
              position: "absolute",
              right: "3%",
              top: "-10%",
              fontSize: "1.8rem",
              animation: "floatLeafReverse 18s infinite linear",
              animationDelay: "9s",
            }}
          >
            🪴
          </div>
          <div
            style={{
              position: "absolute",
              right: "10%",
              top: "-10%",
              fontSize: "2.3rem",
              animation: "floatLeaf 15s infinite linear",
              animationDelay: "5s",
            }}
          >
            🍃
          </div>
          <div
            style={{
              position: "absolute",
              right: "7%",
              top: "-10%",
              fontSize: "1.7rem",
              animation: "floatLeafReverse 18s infinite linear",
              animationDelay: "11s",
            }}
          >
            🌿
          </div>
        </div>

        <Navbar />
        <main className="flex-grow relative z-10">
          <ScrollToTop /> {/* 🔧 NEW: Scroll to top on route change */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/results" element={<Results />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />

        {/* 🔧 NEW: Onboarding Tour */}
        <OnboardingTour run={runTour} onFinish={handleTourFinish} />

        {/* 🔧 NEW: PWA Install Prompt */}
        <InstallPWA />
      </div>
    </Router>
  );
}

export default App;
