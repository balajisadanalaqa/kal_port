import React, { useState, useRef, useEffect } from "react";

const PatientCaseCarousel = ({ patient, onViewDetails, isCenterCard = false, compact = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Combine images and videos for the carousel (defensive: handle missing arrays)
  const allMedia = [...(patient.images || []), ...(patient.videos || [])];

  // Auto-scroll effect - for all cards and when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allMedia.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allMedia.length, isHovered]);


  const shell = compact
    ? "flex flex-col min-h-[200px] sm:min-h-[210px] rounded-lg shadow-md hover:scale-[1.02]"
    : "flex min-h-[200px] flex-col sm:min-h-[210px] md:min-h-[220px] lg:min-h-[210px] xl:min-h-[220px] 2xl:min-h-[230px] min-[1920px]:min-h-[240px] min-[2560px]:min-h-[250px] rounded-2xl shadow-lg hover:scale-[1.02]";

  return (
    <div
      className={`relative h-full w-full min-h-0 overflow-hidden group hover:shadow-primary/15 transition-all duration-300 ${shell}`}
      style={{ backgroundColor: patient.boxColor + '20' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Patient Info Header */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 text-white ${compact ? "p-0.5 sm:p-1" : "p-1.5 sm:p-2"}`}
        style={{ backgroundColor: patient.boxColor + 'CC' }}
      >
        <h3 className={`font-heading font-bold leading-tight mb-0.5 ${compact ? "text-[6px] sm:text-[7px]" : "text-[8px] sm:text-[10px] mb-0.5"}`}>{patient.patientName}</h3>
        <div className={`space-y-0 ${compact ? "text-[6px] sm:text-[7px]" : "text-[8px] sm:text-[10px]"}`}>
          {/* <p><span className="font-semibold">Condition:</span> {patient.condition}</p> */}
          <p><span className="font-semibold">Treatment:</span> {patient.treatment}</p>
          {/* <p><span className="font-semibold">Recovery:</span> {patient.recoveryPeriod}</p> */}
        </div>
      </div>

      {/* Media Carousel */}
      <div
        className={
          compact
            ? "relative flex min-h-0 w-full flex-1 flex-col items-center justify-center pt-3 pb-10 sm:pt-4 sm:pb-12"
            : "relative flex min-h-0 w-full flex-1 flex-col items-center justify-center pt-6 pb-6 sm:pt-7 sm:pb-6 md:pt-8 md:pb-7"
        }
      >
        {/* Media viewport — explicit min-height so absolute slides get a real box (fixes large screens) */}
        <div
          className={
            compact
              ? "relative min-h-[110px] w-full flex-1 p-0.5 sm:min-h-[120px] sm:p-1"
              : "relative h-full min-h-[120px] w-full flex-1 p-0.5 sm:min-h-[130px] md:min-h-[140px] lg:min-h-[130px] xl:min-h-[140px]"
          }
        >
          {allMedia.map((media, index) => (
            <div
              key={`${media.url}-${index}`}
              className={`absolute w-full h-full cursor-pointer rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              onClick={() => onViewDetails(patient)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onViewDetails(patient);
                }
              }}
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
        <div
          className={
            compact
              ? "absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform items-center gap-1 sm:bottom-5"
              : "absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 transform items-center gap-1.5 sm:bottom-7 md:bottom-10"
          }
        >
          <div className={compact ? "flex gap-1" : "flex gap-1.5"}>
            {allMedia.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  compact ? "h-1 w-1" : "h-1.5 w-1.5"
                } ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gallery button - opens full gallery modal */}
      <div className={compact ? "absolute bottom-1 left-0 right-0 z-20 px-1.5 sm:bottom-1.5 sm:px-2" : "absolute bottom-1.5 left-0 right-0 z-20 px-1.5 sm:bottom-2 sm:px-3"}>
        <button
          onClick={() => onViewDetails(patient)}
          className={`w-full glass-button pulse-glow ${compact ? "py-0.5 text-[6px] sm:text-[7px]" : "py-0.5 text-[8px] sm:text-[9px]"}`}
          aria-label="Open gallery"
        >
          <span className="flex items-center justify-center gap-0.5 sm:gap-1">
            <svg className={compact ? "h-2 w-2 sm:h-2.5 sm:w-2.5" : "h-2.5 w-2.5 sm:h-3 sm:w-3"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            View Details
          </span>
        </button>
      </div>
    </div>
  );
};

export default PatientCaseCarousel;