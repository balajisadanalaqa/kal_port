import React, { useState, useRef, useEffect } from "react";

const PatientCaseCarousel = ({ patient, onViewDetails, isCenterCard = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Combine images and videos for the carousel
  const allMedia = [...patient.images, ...patient.videos];

  // Auto-scroll effect - for all cards and when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allMedia.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allMedia.length, isHovered]);


  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group hover:shadow-primary/20 transition-all duration-500 hover:scale-105 min-h-[240px] sm:min-h-[280px] md:min-h-[320px]"
      style={{ backgroundColor: patient.boxColor + '20' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Patient Info Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 p-2 sm:p-3 text-white"
        style={{ backgroundColor: patient.boxColor + 'CC' }}
      >
        <h3 className="font-heading font-bold text-[10px] sm:text-sm mb-1">{patient.patientName}</h3>
        <div className="text-[8px] sm:text-xs space-y-0.5">
          <p><span className="font-semibold">Condition:</span> {patient.condition}</p>
          <p><span className="font-semibold">Treatment:</span> {patient.treatment}</p>
          <p><span className="font-semibold">Recovery:</span> {patient.recoveryPeriod}</p>
        </div>
      </div>

      {/* Media Carousel */}
      <div className="relative w-full h-full flex flex-col items-center justify-center pt-12 pb-10 sm:pt-14 sm:pb-12 md:pt-16 md:pb-14">
        {/* Current Media Display */}
        <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-1.5 md:p-3">
          {allMedia.map((media, index) => (
            <div
              key={`${media.url}-${index}`}
              className={`absolute w-full h-full rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {media.url.includes('.mp4') ? (
                <video
                  src={media.url}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  onError={(e) => {
                    console.error('Video failed to load:', media.url);
                  }}
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                />
              ) : (
                <img
                  src={media.url}
                  alt={media.description}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600/333333/FFFFFF?text=Image+Not+Found';
                    console.error('Image failed to load:', media.url);
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Dots Indicator without Navigation */}
        <div className="absolute bottom-8 sm:bottom-10 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 z-10">
          <div className="flex gap-1.5">
            {allMedia.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 z-20 px-2 sm:px-4">
        <button
          onClick={() => onViewDetails(patient)}
          className="w-full glass-button pulse-glow text-[10px] py-1"
        >
          <span className="flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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