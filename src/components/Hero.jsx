import React, { useState, useRef, useEffect, useCallback } from "react";
import { summary } from "../data/summaryData";
import { patientsData } from "../data/patientsData";
import { education } from "../data/educationData";
import PatientCaseCarousel from "./PatientCaseCarousel";
import PatientDetailsModal from "./PatientDetailsModal";

const getCardMetrics = () => {
  if (typeof window === "undefined") {
    return { cardWidth: 320, gap: 12 };
  }

  if (window.innerWidth < 640) {
    return { cardWidth: window.innerWidth * 0.85, gap: 12 };
  }

  if (window.innerWidth < 768) {
    return { cardWidth: 320, gap: 14 };
  }

  if (window.innerWidth < 1024) {
    return { cardWidth: 340, gap: 16 };
  }

  return { cardWidth: 380, gap: 20 };
};

const Hero = () => {
  const scrollContainerRef = useRef(null);
  // Removed scroll direction functionality - now only scrolls left automatically
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Get highest education
  const highestEducation = education[0]; // DPT is the highest degree

  // Scroll to the beginning when component mounts
  useEffect(() => {
    const scrollToBeginning = () => {
      if (scrollContainerRef.current) {
        // Reset scroll position to 0
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'instant' });
      }
    };

    // Use multiple techniques to ensure the scroll position is set correctly
    // First, try immediately
    scrollToBeginning();

    // Then on the next animation frame
    requestAnimationFrame(() => {
      scrollToBeginning();

      // And once more after a short delay to account for any layout shifts
      setTimeout(scrollToBeginning, 30);
    });
  }, []);

  // Function to check if a card is the center/fully displayed one
  const isCenterCard = (index) => {
    if (typeof window !== 'undefined' && scrollContainerRef.current) {
      const { cardWidth, gap } = getCardMetrics();
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const cardPosition = index * (cardWidth + gap);
      // Check if the card is roughly in the center of the visible area
      const containerWidth = scrollContainerRef.current.clientWidth;
      const tolerance = cardWidth * 0.6; // Increased tolerance for better detection
      return Math.abs(cardPosition - scrollPosition) < tolerance;
    }
    return false;
  };

  const handleViewPatientDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const goToNextPatient = () => {
    if (!selectedPatient) return;

    const currentIndex = patientsData.findIndex(p => p.id === selectedPatient.id);
    const nextIndex = (currentIndex + 1) % patientsData.length;
    setSelectedPatient(patientsData[nextIndex]);
  };

  const goToPrevPatient = () => {
    if (!selectedPatient) return;

    const currentIndex = patientsData.findIndex(p => p.id === selectedPatient.id);
    const prevIndex = currentIndex === 0 ? patientsData.length - 1 : currentIndex - 1;
    setSelectedPatient(patientsData[prevIndex]);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };


  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-background md:pt-6 md:mt-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-4 h-48 w-48 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-6 right-4 h-56 w-56 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

<div className="relative z-10 flex w-full flex-col gap-3 px-3 py-4 sm:px-4 md:min-h-[360px] lg:min-h-[420px] lg:flex-row lg:items-center lg:gap-6 lg:px-5 xl:px-6">
        {/* Profile summary column (left) */}
<div className="flex w-full min-w-0 flex-col items-center gap-3 text-center sm:gap-4 lg:max-w-[300px] lg:flex-[0.28] lg:items-start lg:text-left mt-9 lg:mt-4">
          <div className="flex w-full flex-col items-center gap-2.5 lg:items-start">
            <img
              src="https://i.pravatar.cc/150?u=drchelli"
              alt={summary.name}
              className="h-14 w-14 rounded-full border-3 border-primary/20 object-cover shadow-lg sm:h-16 sm:w-16"
            />
            <h1 className="font-heading text-lg font-bold gradient-text neon-text sm:text-xl lg:text-lg">
              {summary.name}
            </h1>
          </div>

          <p className="mx-auto max-w-xl text-[10px] leading-relaxed text-text-secondary sm:text-xs">
            {summary.bio}
          </p>

          <div className="flex flex-col items-center gap-1.5 text-[10px] font-semibold text-primary/85 lg:items-start">
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {highestEducation.degree}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
              {highestEducation.institute}
            </span>
            {education.length > 1 && (
              <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-[9px]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                +{education.length - 1} more qualification(s)
              </span>
            )}
          </div>

          <div className="flex w-full flex-col gap-1.5 sm:flex-row sm:justify-center lg:flex-col lg:items-start">
            <button
              className="glass-button pulse-glow px-3 py-1 text-[10px] lg:w-full"
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=Subject-%20Enquiry%20about%20Physiotherapy%20Services%20and%20Appointments&body=Content-%20I%20would%20like%20to%20contact%20you%20regarding%20your%20physiotherapy%20services.",
                  "_blank"
                );
                const expSection = document.querySelector("#experience");
                if (expSection) {
                  expSection.scrollIntoView({ behavior: "smooth" });
                }
                if (window.setActiveSection) {
                  window.setActiveSection("#experience");
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="h-3.5 w-3.5 -scale-x-100" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Know More
              </span>
            </button>
            <button className="btn-success px-4 py-1.5 text-[10px] lg:w-full">
              <span className="flex items-center justify-center gap-2">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Me
              </span>
            </button>
          </div>
        </div>

        {/* Patient gallery column (right) */}
        <div className="relative flex w-full min-w-0 flex-1 lg:mt-4 flex-col overflow-hidden rounded-3xl border border-border bg-surface/90 shadow-xl min-h-[320px] max-h-[340px] sm:min-h-[380px] sm:max-h-[400px] md:min-h-[440px] md:max-h-[460px] lg:flex-1 lg:min-h-[520px] lg:max-h-[540px] lg:self-stretch">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex h-full min-w-0 gap-1.5 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 py-1.5 snap-x snap-mandatory sm:px-1.5 sm:py-2 md:gap-2 md:px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {patientsData.map((patient, index) => (
              <div
                key={patient.id}
                className={`snap-center flex-shrink-0 basis-[85vw] max-w-full sm:basis-[320px] md:basis-[340px] lg:basis-[380px] xl:basis-[420px] ${isCenterCard(index) ? "center-card" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <PatientCaseCarousel
                  patient={patient}
                  onViewDetails={handleViewPatientDetails}
                  isCenterCard={isCenterCard(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={handleCloseModal}
          onNextPatient={goToNextPatient}
          onPrevPatient={goToPrevPatient}
        />
      )}
    </section>
  );
};

export default Hero;