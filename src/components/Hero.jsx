import React, { useState, useRef, useEffect } from "react";
import { summary } from "../data/summaryData";
import { patientsData } from "../data/patientsData";
import { education } from "../data/educationData";
import PatientCaseCarousel from "./PatientCaseCarousel";
import PatientDetailsModal from "./PatientDetailsModal";

const Hero = () => {
  const scrollContainerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState('left');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Get highest education
  const highestEducation = education[0]; // DPT is the highest degree

  // Auto-scroll effect with pause between patient cases
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let timeoutId;
    const cardWidth = window.innerWidth < 768 ? 288 : window.innerWidth < 1024 ? 384 : 420; // Responsive card width
    const gap = window.innerWidth < 768 ? 16 : 24; // Responsive gap

    const scrollToNext = () => {
      // Don't scroll if hovering over center image
      if (isHovered) {
        timeoutId = setTimeout(scrollToNext, 500); // Check again in 500ms
        return;
      }

      let nextIndex;
      if (scrollDirection === 'left') {
        nextIndex = (currentIndex + 1) % patientsData.length;
      } else {
        nextIndex = currentIndex === 0 ? patientsData.length - 1 : currentIndex - 1;
      }

      setCurrentIndex(nextIndex);
      const scrollPosition = nextIndex * (cardWidth + gap);
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      // Schedule next scroll after 10 seconds
      timeoutId = setTimeout(scrollToNext, 10000);
    }

    // Start the scrolling 60 secs
    timeoutId = setTimeout(scrollToNext, 60000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [scrollDirection, currentIndex, isHovered]);

  const handleScrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cardWidth = window.innerWidth < 768 ? 288 : window.innerWidth < 1024 ? 384 : 420;
    const gap = window.innerWidth < 768 ? 16 : 24;
    const newIndex = currentIndex === 0 ? patientsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);

    const scrollPosition = newIndex * (cardWidth + gap);
    scrollContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const handleScrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cardWidth = window.innerWidth < 768 ? 288 : window.innerWidth < 1024 ? 384 : 420;
    const gap = window.innerWidth < 768 ? 16 : 24;
    const newIndex = (currentIndex + 1) % patientsData.length;
    setCurrentIndex(newIndex);

    const scrollPosition = newIndex * (cardWidth + gap);
    scrollContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const toggleScrollDirection = () => {
    setScrollDirection(prev => prev === 'left' ? 'right' : 'left');
  };

  // Function to check if a card is the center/fully displayed one
  const isCenterCard = (index) => {
    return index === currentIndex;
  };

  const handleViewPatientDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <section className="relative w-full min-h-[70vh] bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-14 items-start justify-center min-h-[70vh] p-4 md:p-1 gap-2 md:gap-2">
        {/* Text Content - Takes up full width on mobile, 2/5 on desktop */}
        <div className="col-span-1 md:col-span-4 flex flex-col items-center md:items-start md:pl-8 md:pt-10 lg:pl-12 text-center md:text-left space-y-3 mt-10 md:mt-14 order-2 md:order-1 relative  p-6">

          <div className="flex items-center gap-3 mb-2 relative z-10">
            <img
              src="https://i.pravatar.cc/150?u=drchelli"
              alt={summary.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border-3 border-primary/20 object-cover shadow-lg"
            />
            <h1 className="text-xl md:text-2xl font-heading font-bold gradient-text neon-text">
              {summary.name}
            </h1>
          </div>

          <p className="text-sm md:text-base max-w-xs lg:max-w-sm text-text-secondary font-body leading-relaxed relative z-10">
            {summary.bio}
          </p>

          {/* Education Highlight */}
          <div className="flex items-center gap-2 mt-2 relative z-10">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center neon-glow">
              <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-xs md:text-sm text-primary/80 font-bold">
              {highestEducation.degree} • {highestEducation.institute}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 relative z-10">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center neon-glow">
              <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-xs md:text-sm text-primary/80 font-bold">
              {highestEducation.degree} • {highestEducation.institute}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-3 relative z-10">
            <button
              className="glass-button pulse-glow text-sm px-4 py-2"
              onClick={() => {
                window.open(
                  'https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=Subject-%20Enquiry%20about%20Physiotherapy%20Services%20and%20Appointments&body=Content-%20I%20would%20like%20to%20contact%20you%20regarding%20your%20physiotherapy%20services.',
                  '_blank'
                );
                const expSection = document.querySelector('#experience');
                if (expSection) {
                  expSection.scrollIntoView({ behavior: 'smooth' });
                }
                if (window.setActiveSection) {
                  window.setActiveSection('#experience');
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Know More
              </span>
            </button>
            <button className="btn-success text-sm px-4 py-2">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Me
              </span>
            </button>
          </div>
        </div>

        {/* Patient Cases Gallery - Takes up full width on mobile, 3/5 on desktop */}
        <div className="col-span-1 md:col-span-10 relative w-full h-[100vh] md:h-[80vh] flex flex-col justify-start py-4 md:py-4 order-2">
          {/* Direction Toggle Control - Hidden on mobile */}
          <div className="absolute top-4 right-4 z-20 hidden md:block">
            <button
              onClick={toggleScrollDirection}
              className="glass-nav-btn text-xs px-3 py-2 rounded-lg"
              title={`Scrolling ${scrollDirection === 'left' ? 'Left' : 'Right'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Left Navigation Button - Hidden on mobile */}
          <button
            onClick={handleScrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 glass-nav-btn-rect hidden md:flex"
            title="Scroll Left"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Right Navigation Button - Hidden on mobile */}
          <button
            onClick={handleScrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 glass-nav-btn-rect hidden md:flex"
            title="Scroll Right"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Scrolling Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 md:gap-1 h-full overflow-x-scroll overflow-y-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {patientsData.map((patient, index) => (
              <div
                key={patient.id}
                className={`flex-shrink-0 w-100 md:w-140 h-full mx-1 md:mx-1 ${isCenterCard(index) ? 'center-card' : ''}`}
                onMouseEnter={() => {
                  if (isCenterCard(index)) {
                    setIsHovered(true);
                  }
                }}
                onMouseLeave={() => {
                  if (isCenterCard(index)) {
                    setIsHovered(false);
                  }
                }}
              >
                <PatientCaseCarousel
                  patient={patient}
                  onViewDetails={handleViewPatientDetails}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Hero;