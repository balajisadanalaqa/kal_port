import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import MobileNavBar from "./components/MobileNavBar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
// import { reviews } from "./data/reviewData";
import { ThemeProvider } from "./context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";

// Admin imports
import Admin from "./admin/Admin";
import Login from "./admin/Login";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import SummaryManagement from "./admin/components/SummaryManagement";
import EducationManagement from "./admin/components/EducationManagement";
import ExperienceManagement from "./admin/components/ExperienceManagement";
import ReviewsManagement from "./admin/components/ReviewsManagement";
import PatientManagement from "./admin/components/PatientManagement";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });

    // Scroll down 50px on page load to show glassmorphism effect
    window.scrollTo(0, 50);

    // Reset AOS when user scrolls to top
    const handleScroll = () => {
      if (window.scrollY < 100) {
        AOS.refresh();
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Reset AOS every 50 seconds
    const interval = setInterval(() => {
      AOS.refresh();
    }, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={
          <div className="flex min-h-screen flex-col bg-background font-body text-text overflow-x-hidden">
            <NavBar />
            <main className="flex-1 min-w-0 overflow-x-hidden overscroll-contain pt-4 md:pb-16 space-y-16">
              <section id="home" className="w-full px-3 sm:px-6 lg:px-0 xl:px-4">
                <Hero />
              </section>
              <section id="experience" className="w-full px-4 sm:px-6 lg:px-10">
                <Experience />
              </section>
              <section id="education" className="w-full px-4 sm:px-6 lg:px-10">
                <Education />
              </section>
              <section id="reviews" className="w-full px-4 sm:px-6 lg:px-10">
                <Reviews />
              </section>
              <section id="contact" className="w-full px-4 sm:px-6 lg:px-10">
                <Footer />
              </section>
            </main>
            <MobileNavBar />
          </div>
        } />

        <Route path="/admin" element={<Admin />} >
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } >
            <Route index element={<Navigate to="/admin/dashboard/summary" />} />
            <Route path="summary" element={<SummaryManagement />} />
            <Route path="education" element={<EducationManagement />} />
            <Route path="experience" element={<ExperienceManagement />} />
            <Route path="patients" element={<PatientManagement />} />
            <Route path="reviews" element={<ReviewsManagement />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
