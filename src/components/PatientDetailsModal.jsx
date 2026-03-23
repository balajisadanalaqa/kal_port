import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSwipeHorizontal } from "../hooks/useSwipeHorizontal";

const PatientDetailsModal = ({ patient, onClose, onNextPatient, onPrevPatient }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [lightboxMounted, setLightboxMounted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const lightboxCloseRef = useRef(null);
  const lightboxVideoRef = useRef(null);
  const headerSwipeRef = useRef(null);
  const lightboxMediaSwipeRef = useRef(null);

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

  const allMedia = useMemo(
    () => [...(patient.images || []), ...(patient.videos || [])],
    [patient.images, patient.videos]
  );
  const patientVideoUrls = (patient.videos || []).map((v) => v?.url).filter(Boolean);

  // Hydrate lightbox from ?media= and keep in sync when URL changes
  useEffect(() => {
    const m = searchParams.get("media");
    if (m == null || m === "") {
      setSelectedMedia(null);
      setCurrentMediaIndex(0);
      return;
    }
    const idx = parseInt(m, 10);
    if (Number.isNaN(idx) || allMedia.length === 0 || idx < 0 || idx >= allMedia.length) {
      const p = new URLSearchParams(searchParams);
      p.delete("media");
      const s = p.toString();
      navigate({ pathname: "/", search: s ? `?${s}` : "" }, { replace: true });
      return;
    }
    setSelectedMedia(allMedia[idx]);
    setCurrentMediaIndex(idx);
  }, [searchParams, allMedia, navigate]);

  const openLightbox = useCallback(
    (index) => {
      const params = new URLSearchParams(searchParams);
      params.set("patient", String(patient.id));
      params.set("media", String(index));
      navigate({ pathname: "/", search: `?${params.toString()}` }, { replace: false });
    },
    [searchParams, navigate, patient.id]
  );

  const closeLightbox = useCallback(() => {
    if (!searchParams.has("media")) {
      setSelectedMedia(null);
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
    } else {
      const p = new URLSearchParams(searchParams);
      p.delete("media");
      const s = p.toString();
      navigate({ pathname: "/", search: s ? `?${s}` : "" }, { replace: true });
    }
  }, [searchParams, navigate]);

  const nextMedia = useCallback(() => {
    if (allMedia.length === 0) return;
    const raw = searchParams.get("media");
    const cur =
      raw != null && !Number.isNaN(parseInt(raw, 10))
        ? parseInt(raw, 10)
        : currentMediaIndex;
    const safe = cur >= 0 && cur < allMedia.length ? cur : 0;
    const nextIndex = (safe + 1) % allMedia.length;
    const params = new URLSearchParams(searchParams);
    params.set("patient", String(patient.id));
    params.set("media", String(nextIndex));
    navigate({ pathname: "/", search: `?${params.toString()}` }, { replace: true });
  }, [allMedia, searchParams, navigate, patient.id, currentMediaIndex]);

  const prevMedia = useCallback(() => {
    if (allMedia.length === 0) return;
    const raw = searchParams.get("media");
    const cur =
      raw != null && !Number.isNaN(parseInt(raw, 10))
        ? parseInt(raw, 10)
        : currentMediaIndex;
    const safe = cur >= 0 && cur < allMedia.length ? cur : 0;
    const prevIndex = safe === 0 ? allMedia.length - 1 : safe - 1;
    const params = new URLSearchParams(searchParams);
    params.set("patient", String(patient.id));
    params.set("media", String(prevIndex));
    navigate({ pathname: "/", search: `?${params.toString()}` }, { replace: true });
  }, [allMedia, searchParams, navigate, patient.id, currentMediaIndex]);

  const isVideo = (url) => typeof url === "string" && url.includes(".mp4");

  // When lightbox opens: trigger enter transition and focus close button; for video, force load+play to avoid stuck playback
  useEffect(() => {
    if (!selectedMedia) {
      setLightboxMounted(false);
      setVideoReady(false);
      return;
    }
    const isVid = typeof selectedMedia?.url === "string" && selectedMedia.url.includes(".mp4");
    setVideoReady(!isVid);
    const id = requestAnimationFrame(() => {
      setLightboxMounted(true);
      if (isVid && lightboxVideoRef.current) {
        lightboxVideoRef.current.load();
        lightboxVideoRef.current.play().catch(() => {});
      }
    });
    lightboxCloseRef.current?.focus();
    return () => cancelAnimationFrame(id);
  }, [selectedMedia]);

  // Keyboard: Escape close lightbox, Arrow Left/Right prev/next (only when lightbox is open)
  useEffect(() => {
    if (!selectedMedia) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        prevMedia();
        return;
      }
      if (e.key === "ArrowRight") {
        nextMedia();
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia, closeLightbox, prevMedia, nextMedia]);

  useSwipeHorizontal(
    headerSwipeRef,
    {
      onSwipeLeft: onNextPatient,
      onSwipeRight: onPrevPatient
    },
    [patient.id, onNextPatient, onPrevPatient]
  );

  useSwipeHorizontal(
    lightboxMediaSwipeRef,
    {
      onSwipeLeft: nextMedia,
      onSwipeRight: prevMedia
    },
    [selectedMedia, nextMedia, prevMedia]
  );

  return (
    <>
      {/* Main Modal - Gallery first layout */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* Preload this patient's videos only when lightbox is closed (avoids multiple elements with same src fighting and stuck playback) */}
        {patientVideoUrls.length > 0 && !selectedMedia && (
          <div className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden>
            {patientVideoUrls.map((url) => (
              <video key={url} src={url} preload="auto" muted playsInline />
            ))}
          </div>
        )}
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
            ref={headerSwipeRef}
            className="flex-shrink-0 flex items-center justify-between gap-2 px-2 py-2 sm:px-3 sm:py-2 text-white touch-pan-y"
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
                {/* <p className="text-[9px] sm:text-[10px] text-white/90 truncate">{patient.condition} · {patient.recoveryPeriod}</p> */}
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

           {/* Patient details block */}
           <div className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-3 border-b border-border/50 bg-surface/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] sm:text-xs text-text-secondary">
              <p><span className="font-semibold text-text-primary">Condition:</span> {patient.condition}</p>
              <p><span className="font-semibold text-text-primary">Treatment:</span> {patient.treatment}</p>
              <p><span className="font-semibold text-text-primary">Recovery:</span> {patient.recoveryPeriod}</p>
              {(patient.movementsDone?.length > 0) && (
                <p className="sm:col-span-2"><span className="font-semibold text-text-primary">Movements done:</span> {(patient.movementsDone || []).join(", ")}</p>
              )}
            </div>
          </div>

          {/* Full-width gallery only - no left text block */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex-shrink-0 px-2 py-1 sm:px-3 border-b border-border/50">
              <h3 className="text-[10px] sm:text-xs font-heading font-semibold text-text-secondary">
                Treatment Progress & Exercises
              </h3>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-2 sm:p-3 touch-pan-y">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {allMedia.map((media, index) => {
                    const isVid = isVideo(media.url);
                    const key = `${media.id}-${index}`;
                    return (
                      <button
                        key={key}
                        type="button"
                        className="relative aspect-square min-h-[120px] sm:min-h-[160px] md:min-h-[180px] rounded-xl overflow-hidden bg-surface shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
                        onClick={() => openLightbox(index)}
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
                        {/* Label box: always-visible description on each image/video */}
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white text-[10px] sm:text-xs line-clamp-2 text-left">
                            {media.description || (isVid ? "Video" : "Image")}
                          </p>
                        </div>
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

      {/* Lightbox - for full-size image or video playback; sized to media */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-200 ${lightboxMounted ? "opacity-100" : "opacity-0"}`}
            onClick={closeLightbox}
            aria-hidden
          />

          <div
            className={`relative w-full max-w-[90vw] max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${lightboxMounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="flex-shrink-0 p-3 sm:p-4 bg-surface border-b border-border flex justify-between items-center gap-2">
              <h3 className="text-sm sm:text-base font-heading font-bold text-text-primary truncate pr-2">
                {selectedMedia.description || "Media"}
              </h3>
              <button
                ref={lightboxCloseRef}
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

            <div
              ref={lightboxMediaSwipeRef}
              className="relative flex-1 min-h-0 flex items-center justify-center p-4 bg-black/20 min-w-0 touch-pan-y"
            >
              <div className="relative max-w-[90vw] max-h-[75vh] w-fit h-fit flex items-center justify-center rounded-xl overflow-hidden bg-black/40">
                {isVideo(selectedMedia.url) ? (
                  <>
                    {!videoReady && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden />
                      </div>
                    )}
                    <video
                      ref={lightboxVideoRef}
                      key={selectedMedia.url}
                      src={selectedMedia.url}
                      className="w-full h-full max-w-[90vw] max-h-[75vh] object-contain"
                      controls
                      autoPlay
                      muted
                      playsInline
                      preload="auto"
                      onCanPlay={() => setVideoReady(true)}
                      onError={() => setVideoReady(true)}
                    />
                  </>
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.description || ""}
                    className="max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain"
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
