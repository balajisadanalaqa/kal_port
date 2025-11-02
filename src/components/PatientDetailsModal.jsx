import React, { useState } from "react";

const PatientDetailsModal = ({ patient, onClose }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

        <div className="relative w-full max-w-6xl max-h-[90vh] bg-background rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-white relative"
            style={{ backgroundColor: patient.boxColor }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 glass-nav-btn-rect"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <h2 className="text-2xl font-heading font-bold mb-2">{patient.patientName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-semibold">Condition:</span>
                <p>{patient.condition}</p>
              </div>
              <div>
                <span className="font-semibold">Treatment:</span>
                <p>{patient.treatment}</p>
              </div>
              <div>
                <span className="font-semibold">Recovery Period:</span>
                <p>{patient.recoveryPeriod}</p>
              </div>
              <div>
                <span className="font-semibold">Movements:</span>
                <p>{patient.movementsDone.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <h3 className="text-xl font-heading font-bold mb-4 text-text-primary">
              Treatment Progress & Exercises
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allMedia.map((media, index) => (
                <div
                  key={`${media.id}-${index}`}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => openLightbox(media, index)}
                >
                  {media.url.includes('.mp4') ? (
                    <video
                      src={media.url}
                      className="w-full h-48 object-cover"
                      muted
                      loop
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                  ) : (
                    <img
                      src={media.url}
                      alt={media.description}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  {/* Video indicator */}
                  {media.url.includes('.mp4') && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  {/* Description overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm">
                      <p className="line-clamp-3">{media.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeLightbox}></div>

          <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-3xl shadow-2xl overflow-hidden">
            {/* Lightbox Header */}
            <div className="p-4 bg-surface border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-heading font-bold text-text-primary">
                {selectedMedia.description}
              </h3>
              <button
                onClick={closeLightbox}
                className="glass-nav-btn-rect"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Media Display */}
            <div className="relative p-4">
              <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden">
                {selectedMedia.url.includes('.mp4') ? (
                  <video
                    src={selectedMedia.url}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.description}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevMedia}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 glass-nav-btn-rect"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                onClick={nextMedia}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 glass-nav-btn-rect"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Media Counter */}
            <div className="p-4 bg-surface border-t border-border text-center">
              <p className="text-sm text-text-secondary">
                {currentMediaIndex + 1} of {allMedia.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDetailsModal;