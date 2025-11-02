import React, { useEffect } from "react";
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
      {/* Grey background bar behind NavBar */}
      {/* <div className="fixed top-0 left-0 w-full h-14 z-0 bg-gray-200 dark:bg-gray-800"></div> */}
      <div className="font-body bg-background text-text min-h-screen pt-14 pb-20 md:pb-0">
        <a id="home" />
        <NavBar />
        <MobileNavBar />
        <Hero />
        {/* <Carousel slides={reviews} /> */}
        <Experience />
        <Education />
        <Reviews />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
