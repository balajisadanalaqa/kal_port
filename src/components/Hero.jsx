import React, { useState, useRef, useEffect } from "react";
import EducationBg from "../assets/images/education-bg.jpg";
import PatientCaseCarousel from "./PatientCaseCarousel";
import PatientDetailsModal from "./PatientDetailsModal";

const getCardMetrics = () => {
  if (typeof window === "undefined") {
    return { cardWidth: 280, gap: 12 };
  }

  if (window.innerWidth < 640) {
    return { cardWidth: window.innerWidth * 0.85, gap: 12 };
  }

  if (window.innerWidth < 768) {
    return { cardWidth: 280, gap: 14 };
  }

  if (window.innerWidth < 1024) {
    return { cardWidth: 300, gap: 16 };
  }

  return { cardWidth: 280, gap: 20 };
};

const Hero = () => {
  const scrollContainerRef = useRef(null);
  // Removed scroll direction functionality - now only scrolls left automatically
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const fallbackSummary = {
    name: "Dr. Kalyani Sadanala, PT",
    bio: "Dedicated to holistic healing and patient-centered care, Dr. Chelli brings over 10 years of experience in musculoskeletal and neurorehabilitation. Passionate about empowering patients to achieve their best mobility and quality of life.",
    profileImage: "/media/profile/physiotherapist.jpg"
  };

  const [summary, setSummary] = useState(fallbackSummary);
  const fallbackEducation = [
    {
      id: "fallback-1",
      degree: "Doctor of Physical Therapy (DPT)",
      institute: "All India Institute of Medical Sciences",
      duration: "2015 - 2017",
      description: "Specialized in neuro and musculoskeletal rehabilitation."
    },
    {
      id: "fallback-2",
      degree: "Bachelor of Physiotherapy (BPT)",
      institute: "Delhi University",
      duration: "2010 - 2015",
      description: "Graduated with distinction, focusing on evidence-based practice."
    }
  ];

  const [education, setEducation] = useState(fallbackEducation);
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all data from static JSON
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [aboutRes, educationRes, patientsRes] = await Promise.all([
          fetch("/data/about.json"),
          fetch("/data/education.json"),
          fetch("/data/patients.json")
        ]);

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setSummary({
            name: aboutData.name || fallbackSummary.name,
            bio: aboutData.bio || fallbackSummary.bio,
            profileImage: aboutData.profileImage || fallbackSummary.profileImage
          });
        } else {

          setSummary(fallbackSummary);
        }

        if (educationRes.ok) {
          const educationData = await educationRes.json();
          if (Array.isArray(educationData) && educationData.length > 0) {
            setEducation(educationData);
          } else {
            setEducation(fallbackEducation);
          }
        } else {
          setEducation(fallbackEducation);
        }

        if (patientsRes.ok) {
          const patientData = await patientsRes.json();
          if (Array.isArray(patientData) && patientData.length > 0) {
            setPatientsData(patientData);
          }
        }
      } catch (error) {
        console.error('Error loading static data:', error);
        setSummary(fallbackSummary);
        setEducation(fallbackEducation);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Get highest education
  const highestEducation = education[0] || { degree: "Doctor of Physical Therapy (DPT)", institute: "All India Institute of Medical Sciences" }; // DPT is the highest degree

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
    if (currentIndex === -1) return; // Patient not found in current data

    const nextIndex = (currentIndex + 1) % patientsData.length;
    setSelectedPatient(patientsData[nextIndex]);
  };

  const goToPrevPatient = () => {
    if (!selectedPatient) return;

    const currentIndex = patientsData.findIndex(p => p.id === selectedPatient.id);
    if (currentIndex === -1) return; // Patient not found in current data

    const prevIndex = currentIndex === 0 ? patientsData.length - 1 : currentIndex - 1;
    setSelectedPatient(patientsData[prevIndex]);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden rounded-2xl bg-background md:pt-8 md:mt-6">
        <div className="flex w-full flex-col gap-6 px-4 py-6 sm:px-6">
          <div className="max-w-sm p-4 rounded-2xl border border-border bg-surface/50 animate-pulse">
            <div className="h-6 w-48 bg-gray-300 rounded mb-3" />
            <div className="h-4 w-full max-w-md bg-gray-200 rounded mb-2" />
            <div className="h-4 w-full max-w-sm bg-gray-200 rounded" />
          </div>
        </div>
      </section>
    );
  }

  // Fallback to default data if needed
  const displaySummary = summary || {
    name: "Dr. Kalyani Sadanala, PT",
    bio: "Dedicated",
    profileImage: "src\assets\images\education-bg.jpg"
  };

  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-background md:pt-8 md:mt-6">
      <div className="relative z-10 flex w-full flex-col gap-6 px-4 py-6 sm:px-6 md:min-h-[340px] lg:flex-row lg:items-center lg:gap-10 lg:px-8">
        {/* Profile — left 35% with bg image, glass box at bottom */}
        <div
          className="relative w-full flex flex-col items-start justify-end lg:flex-[0.35] lg:min-w-0 lg:rounded-r-2xl overflow-hidden lg:min-h-[340px] lg:pt-6 lg:pb-0"
          style={{
            backgroundImage: `url(${EducationBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 z-0 bg-background/10" />
          {/* Glass box at bottom left — less transparent */}
          <div className="relative z-10 w-full max-w-[90%] p-3 rounded-2xl border border-border bg-white/50 dark:bg-white/30 backdrop-blur-md shadow-lg lg:max-w-[260px] lg:ml-0 lg:px-4">
            <h1 className="hero-glass-name font-heading text-sm font-extrabold tracking-tight sm:text-base">
              {displaySummary.name}
            </h1>
            <p className="hero-glass-bio mt-1 text-[10px] leading-relaxed max-w-full sm:text-xs">
              {displaySummary.bio}
            </p>
            <p className="hero-glass-degree mt-0.5 text-[9px] font-bold uppercase tracking-wider">
              {highestEducation.degree}
            </p>
            <button
              type="button"
              className="mt-2 py-1 px-2.5 text-[10px] cursor-pointer font-semibold rounded-md border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              onClick={() => {
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=Subject-%20Enquiry%20about%20Physiotherapy%20Services%20and%20Appointments&body=Content-%20I%20would%20like%20to%20contact%20you%20regarding%20your%20physiotherapy%20services.",
                  "_blank"
                );
                const expSection = document.querySelector("#experience");
                if (expSection) expSection.scrollIntoView({ behavior: "smooth" });
                if (window.setActiveSection) window.setActiveSection("#experience");
              }}
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Patient gallery — right 75% */}
        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-lg min-h-[300px] sm:min-h-[360px] lg:flex-[0.75] lg:min-w-0 lg:min-h-[420px] lg:self-stretch">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex h-full min-w-0 gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-2 py-2 snap-x snap-mandatory sm:px-3 md:gap-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {patientsData.map((patient, index) => (
              <div
                key={patient.id}
                className={`snap-center flex-shrink-0 basis-[85vw] max-w-full sm:basis-[280px] md:basis-[300px] lg:basis-[280px] ${isCenterCard(index) ? "center-card" : ""}`}
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