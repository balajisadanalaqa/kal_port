import React, { useState, useRef, useEffect } from "react";

const PatientCaseCarousel = ({ patient, onViewDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef(null);

  // Combine images and videos for the carousel
  const allMedia = [...patient.images, ...patient.videos];

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allMedia.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allMedia.length, isHovered]);

  const scrollToIndex = (index) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const itemHeight = scrollContainer.offsetHeight; // Full height of each item
    const gap = 16; // 4 * 4px gap
    const scrollPosition = index * (itemHeight + gap);

    scrollContainer.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group hover:shadow-primary/20 transition-all duration-500 hover:scale-105"
      style={{ backgroundColor: patient.boxColor + '20' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Patient Info Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 p-3 text-white"
        style={{ backgroundColor: patient.boxColor + 'CC' }}
      >
        <h3 className="font-heading font-bold text-base mb-1">{patient.patientName}</h3>
        <div className="text-xs space-y-0.5">
          <p><span className="font-semibold">Condition:</span> {patient.condition}</p>
          <p><span className="font-semibold">Treatment:</span> {patient.treatment}</p>
          <p><span className="font-semibold">Recovery:</span> {patient.recoveryPeriod}</p>
        </div>
      </div>

      {/* Media Carousel */}
      <div className="relative h-full pt-24 pb-20 m-4">
        <div
          ref={scrollContainerRef}
          className="flex flex-col gap-4 h-full overflow-y-scroll overflow-x-hidden px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Show one image at a time with full height */}
          {allMedia.map((media, index) => (
            <div
              key={`${media.id}-${index}`}
              className="flex-shrink-0 w-full h-full rounded-xl overflow-hidden shadow-lg"
            >
              {media.url.includes('.mp4') ? (
                <video
                  src={media.url}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                />
              ) : (
                <img
                  src={media.url}
                  alt={media.description}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {/* <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 glass-nav-btn-rect"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 glass-nav-btn-rect"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button> */}

        {/* Dots Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {allMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* View Details Button */}
      <div className="absolute bottom-6 left-0 right-0 z-20 px-6">
        <button
          onClick={() => onViewDetails(patient)}
          className="w-full glass-button pulse-glow text-sm py-2"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            View Details
          </span>
        </button>
      </div>
    </div>
  );
};

export default PatientCaseCarousel;