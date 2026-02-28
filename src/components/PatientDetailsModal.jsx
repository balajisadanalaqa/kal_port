import React, { useState, useEffect } from "react";

const PatientDetailsModal = ({ patient, onClose, onNextPatient, onPrevPatient }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Lock body scroll when modal is open so only modal content scrolls
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Combine images and videos for the grid
  const allMedia = [...patient.images, ...patient.videos];

  const openLightbox = (media, index) => {
    setSelectedMedia(media);
    setCurrentMediaIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    const nextIndex = (currentMediaIndex + 1) % allMedia.length;
    setSelectedMedia(allMedia[nextIndex]);
    setCurrentMediaIndex(nextIndex);
  };

  const prevMedia = () => {
    const prevIndex = currentMediaIndex === 0 ? allMedia.length - 1 : currentMediaIndex - 1;
    setSelectedMedia(allMedia[prevIndex]);
    setCurrentMediaIndex(prevIndex);
  };

  const isVideo = (url) => typeof url === "string" && url.includes(".mp4");

  return (
    <>
      {/* Main Modal - Gallery first layout */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          style={{ touchAction: "none" }}
          aria-hidden
        />

        <div
          className="relative w-full max-w-6xl max-h-[95vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-white/10"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: "95vh" }}
        >
          {/* Slim top bar only: nav + name + close */}
          <div
            className="flex-shrink-0 flex items-center justify-between gap-2 px-2 py-2 sm:px-3 sm:py-2 text-white"
            style={{ backgroundColor: patient.boxColor }}
          >
            <div className="flex items-center gap-2 min-w-0">
              {onPrevPatient && (
                <button
                  type="button"
                  onClick={onPrevPatient}
                  className="flex-shrink-0 p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Previous patient"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <div className="min-w-0">
                <h2 className="font-heading font-bold text-xs sm:text-sm truncate">{patient.patientName}</h2>
                <p className="text-[9px] sm:text-[10px] text-white/90 truncate">{patient.condition} · {patient.recoveryPeriod}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {onNextPatient && (
                <button
                  type="button"
                  onClick={onNextPatient}
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Next patient"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Full-width gallery only - no left text block */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex-shrink-0 px-2 py-1 sm:px-3 border-b border-border/50">
              <h3 className="text-[10px] sm:text-xs font-heading font-semibold text-text-secondary">
                Treatment Progress & Exercises
              </h3>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-2 sm:p-3">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {allMedia.map((media, index) => {
                    const isVid = isVideo(media.url);
                    const key = `${media.id}-${index}`;
                    return (
                      <button
                        key={key}
                        type="button"
                        className="relative aspect-square min-h-[140px] sm:min-h-[200px] rounded-xl overflow-hidden bg-surface shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
                        onClick={() => openLightbox(media, index)}
                      >
                        {isVid ? (
                          <>
                            {/* Video: static first frame only (no play in grid) */}
                            <video
                              src={media.url}
                              preload="metadata"
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                              onError={() => {}}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </div>
                          </>
                        ) : (
                          <img
                            src={media.url}
                            alt={media.description || "Treatment progress"}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400/333/fff?text=Image";
                            }}
                          />
                        )}
                        {media.description && (
                          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-[10px] sm:text-xs line-clamp-2 text-left">{media.description}</p>
                          </div>
                        )}
                        {isVid && (
                          <span className="absolute top-1.5 right-1.5 bg-black/60 text-white px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.84A1.5 1.5 0 018 2h4a1.5 1.5 0 011.7 1.84L14.5 6H16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h1.5L6.3 2.84z" />
                            </svg>
                            Video
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Lightbox - for full-size image or video playback */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeLightbox} aria-hidden />

          <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex-shrink-0 p-3 sm:p-4 bg-surface border-b border-border flex justify-between items-center gap-2">
              <h3 className="text-sm sm:text-base font-heading font-bold text-text-primary truncate pr-2">
                {selectedMedia.description || "Media"}
              </h3>
              <button
                type="button"
                onClick={closeLightbox}
                className="flex-shrink-0 p-2 rounded-lg border border-border hover:bg-surface/80 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 bg-black/20">
              <div className="relative w-full h-full min-h-[200px] sm:min-h-[320px] max-h-[60vh] rounded-xl overflow-hidden bg-black/40">
                {isVideo(selectedMedia.url) ? (
                  <video
                    key={selectedMedia.url}
                    src={selectedMedia.url}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                    onError={() => {}}
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.description || ""}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800/333/fff?text=Image";
                    }}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={prevMedia}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg border border-border"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 text-text" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextMedia}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg border border-border"
                aria-label="Next"
              >
                <svg className="w-5 h-5 text-text" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex-shrink-0 py-2 text-center text-xs text-text-secondary">
              {currentMediaIndex + 1} of {allMedia.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDetailsModal;
