import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStethoscope } from "react-icons/fa";
import EducationBg from "../assets/images/education-bg.jpg";
import PatientCaseCarousel from "./PatientCaseCarousel";
import PatientDetailsModal from "./PatientDetailsModal";

const REVIEWS_SIDEBAR_FALLBACK = [
  {
    id: "rf-1",
    name: "Amit S.",
    treatment: "ACL Rehabilitation",
    feedback: "Dr. Chelli's care and encouragement made my recovery smooth and fast. Highly recommend!",
    rating: 5
  },
  {
    id: "rf-2",
    name: "Meera K.",
    treatment: "Frozen Shoulder",
    feedback: "Very patient and knowledgeable. My pain reduced drastically in just a few sessions.",
    rating: 5
  }
];

const getCardMetrics = () => {
  if (typeof window === "undefined") {
    return { cardWidth: 240, gap: 12 };
  }

  if (window.innerWidth < 640) {
    return { cardWidth: window.innerWidth * 0.7, gap: 10 };
  }

  if (window.innerWidth < 768) {
    return { cardWidth: 220, gap: 12 };
  }

  if (window.innerWidth < 1024) {
    return { cardWidth: 240, gap: 14 };
  }

  return { cardWidth: 260, gap: 16 };
};

const StarRow = ({ rating }) => (
  <div className="flex shrink-0 gap-0.5" aria-hidden>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`h-3.5 w-3.5 shrink-0 ${
          i < rating
            ? "text-accent drop-shadow-[0_0_8px_rgba(255,107,53,0.55)] dark:drop-shadow-[0_0_10px_rgba(255,107,53,0.45)]"
            : "text-primary/35 dark:text-primary/45"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const findPatientById = (list, rawId) => {
  if (rawId == null || rawId === "") return null;
  return list.find((p) => String(p.id) === String(rawId)) ?? null;
};

const Hero = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const reviewsSidebarScrollRef = useRef(null);
  const [compactHeroLayout, setCompactHeroLayout] = useState(false);
  // Removed scroll direction functionality - now only scrolls left automatically
  const [isHovered, setIsHovered] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const fallbackSummary = {
    name: "Dr. Kalyani Sadanala, PT",
    bio: "Dedicated to holistic healing and patient-centered care, Dr. Chelli brings over 10 years of experience in musculoskeletal and neurorehabilitation. Passionate about empowering patients to achieve their best mobility and quality of life.",
    profileImage: "/media/profile/physiotherapist.jpg"
  };
  const fallbackClinicAddress = {
    name: "Healing Hands Clinic",
    area: "Andheri West, Mumbai",
    landmark: "Near Metro Station"
  };

  const [summary, setSummary] = useState(fallbackSummary);
  const [clinicAddress, setClinicAddress] = useState(fallbackClinicAddress);
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
  const [reviewsPreview, setReviewsPreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldPreloadHeroVideos, setShouldPreloadHeroVideos] = useState(false);

  /** Two copies so the list always overflows the sidebar and we can loop seamlessly */
  const reviewsSidebarItems = useMemo(
    () => (reviewsPreview.length ? [...reviewsPreview, ...reviewsPreview] : []),
    [reviewsPreview]
  );

  // Load all data from static JSON
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [aboutRes, educationRes, patientsRes, reviewsRes] = await Promise.all([
          fetch("/data/about.json"),
          fetch("/data/education.json"),
          fetch("/data/patients.json"),
          fetch("/data/reviews.json")
        ]);

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setSummary({
            name: aboutData.name || fallbackSummary.name,
            bio: aboutData.bio || fallbackSummary.bio,
            profileImage: aboutData.profileImage || fallbackSummary.profileImage
          });
          setClinicAddress({
            name: aboutData.clinicAddress?.name || fallbackClinicAddress.name,
            area: aboutData.clinicAddress?.area || fallbackClinicAddress.area,
            landmark: aboutData.clinicAddress?.landmark || fallbackClinicAddress.landmark
          });
        } else {

          setSummary(fallbackSummary);
          setClinicAddress(fallbackClinicAddress);
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

        if (reviewsRes.ok) {
          const revData = await reviewsRes.json();
          if (Array.isArray(revData) && revData.length > 0) {
            setReviewsPreview(revData);
          } else {
            setReviewsPreview(REVIEWS_SIDEBAR_FALLBACK);
          }
        } else {
          setReviewsPreview(REVIEWS_SIDEBAR_FALLBACK);
        }
      } catch (error) {
        console.error('Error loading static data:', error);
        setSummary(fallbackSummary);
        setClinicAddress(fallbackClinicAddress);
        setEducation(fallbackEducation);
        setReviewsPreview(REVIEWS_SIDEBAR_FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Sync ?patient= from URL to modal selection (invalid id clears URL)
  useEffect(() => {
    if (!patientsData.length) return;
    const raw = searchParams.get("patient");
    if (raw == null || raw === "") {
      setSelectedPatient(null);
      return;
    }
    const match = findPatientById(patientsData, raw);
    if (match) {
      setSelectedPatient(match);
    } else {
      setSelectedPatient(null);
      navigate("/", { replace: true });
    }
  }, [patientsData, searchParams, navigate]);

  /* Compact patient cards only on small phones; stacked layout is for all sizes */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompactHeroLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Preload all patient videos once data is loaded (reduces modal open lag)
  const videoUrlsToPreload = React.useMemo(() => {
    const urls = [];
    patientsData.forEach((p) => {
      (p.videos || []).forEach((v) => {
        if (v?.url) urls.push(v.url);
      });
    });
    return [...new Set(urls)];
  }, [patientsData]);

  useEffect(() => {
    if (loading || videoUrlsToPreload.length === 0) return;

    let cancelled = false;
    let timeoutId = null;
    let idleId = null;
    const startPreload = () => {
      if (!cancelled) setShouldPreloadHeroVideos(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startPreload, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(startPreload, 1200);
    }

    return () => {
      cancelled = true;
      if (timeoutId != null) {
        clearTimeout(timeoutId);
      }
      if (idleId != null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [loading, videoUrlsToPreload.length]);

  // Get highest education
  const highestEducation = education[0] || { degree: "Doctor of Physical Therapy (DPT)", institute: "All India Institute of Medical Sciences" }; // DPT is the highest degree

  // MobileNavBar buttons call these to scroll the patient strip
  useEffect(() => {
    if (loading) return;

    const scrollStrip = (direction) => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const { cardWidth, gap } = getCardMetrics();
      const step = Math.max(1, cardWidth + gap);
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if (direction === "left") {
        el.scrollBy({ left: -step, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    window.heroScrollLeft = () => scrollStrip("left");
    window.heroScrollRight = () => scrollStrip("right");

    return () => {
      delete window.heroScrollLeft;
      delete window.heroScrollRight;
    };
  }, [loading]);

  // Reset strip when patient data loads (layout width changes)
  useEffect(() => {
    if (patientsData.length === 0) return;
    const scrollToBeginning = () => {
      const el = scrollContainerRef.current;
      if (el) el.scrollTo({ left: 0, behavior: "instant" });
    };
    scrollToBeginning();
    requestAnimationFrame(() => {
      scrollToBeginning();
      setTimeout(scrollToBeginning, 50);
    });
  }, [patientsData.length]);

  // Below md: periodic smooth scroll nudges so more cards are obvious (snap-mandatory fights tiny scrollLeft)
  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || patientsData.length < 2) return;

    const mq = window.matchMedia("(max-width: 767px)");
    let intervalId = null;
    let cancelled = false;
    let userPaused = false;
    let resumeTimer = null;
    let firstHintTimer = null;

    const clearResume = () => {
      if (resumeTimer) {
        clearTimeout(resumeTimer);
        resumeTimer = null;
      }
    };

    const pauseFromUser = () => {
      userPaused = true;
      clearResume();
      resumeTimer = setTimeout(() => {
        userPaused = false;
        resumeTimer = null;
      }, 1000);
    };

    const nudge = () => {
      if (cancelled || !mq.matches || userPaused) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 12) return;
      const remaining = max - el.scrollLeft;
      if (remaining <= 32) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const step = Math.min(
          160,
          Math.max(72, Math.round(el.clientWidth * 0.28))
        );
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const clearTimers = () => {
      if (intervalId != null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (firstHintTimer != null) {
        clearTimeout(firstHintTimer);
        firstHintTimer = null;
      }
    };

    const startIfNeeded = () => {
      if (cancelled) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 12 || !mq.matches) {
        clearTimers();
        return;
      }
      if (intervalId != null) return;
      firstHintTimer = window.setTimeout(() => {
        if (!cancelled && mq.matches) nudge();
      }, 900);
      intervalId = window.setInterval(nudge, 3200);
    };

    el.addEventListener("touchstart", pauseFromUser, { passive: true });
    el.addEventListener("touchmove", pauseFromUser, { passive: true });
    el.addEventListener("pointerdown", pauseFromUser);

    const ro = new ResizeObserver(() => startIfNeeded());
    ro.observe(el);
    startIfNeeded();

    const onMqChange = () => {
      if (!mq.matches) clearTimers();
      else startIfNeeded();
    };
    mq.addEventListener("change", onMqChange);

    return () => {
      cancelled = true;
      clearTimers();
      clearResume();
      ro.disconnect();
      mq.removeEventListener("change", onMqChange);
      el.removeEventListener("touchstart", pauseFromUser);
      el.removeEventListener("touchmove", pauseFromUser);
      el.removeEventListener("pointerdown", pauseFromUser);
    };
  }, [patientsData.length]);

  // Reviews sidebar (lg+): smooth upward auto-scroll (rAF + performance.now); seamless loop via duplicated list
  useLayoutEffect(() => {
    const el = reviewsSidebarScrollRef.current;
    if (!el || reviewsPreview.length < 1) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let rafId = null;
    let paused = false;
    let lastNow = performance.now();
    /** px/s — visible, smooth upward drift */
    const SPEED = 30;

    const clear = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const loop = () => {
      if (!mq.matches) {
        rafId = null;
        return;
      }
      if (paused) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      const node = reviewsSidebarScrollRef.current;
      if (!node) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      const { scrollHeight, clientHeight } = node;
      if (scrollHeight <= clientHeight + 2) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const now = performance.now();
      let dt = (now - lastNow) / 1000;
      if (dt > 0.08) dt = 0.08;
      if (dt < 0) dt = 0;
      lastNow = now;

      node.scrollTop += SPEED * dt;

      const half = scrollHeight / 2;
      if (half > 20 && node.scrollTop >= half - 2) {
        node.scrollTop -= half;
      }

      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      clear();
      if (!mq.matches) return;
      lastNow = performance.now();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const node = reviewsSidebarScrollRef.current;
          if (!node) return;
          if (node.scrollHeight <= node.clientHeight + 2) return;
          node.scrollTop = 0;
          lastNow = performance.now();
          rafId = requestAnimationFrame(loop);
        });
      });
    };

    const onPause = () => {
      paused = true;
    };
    const onResume = () => {
      paused = false;
      lastNow = performance.now();
    };

    const ro = new ResizeObserver(() => start());
    ro.observe(el);

    start();
    mq.addEventListener("change", start);
    el.addEventListener("mouseenter", onPause);
    el.addEventListener("mouseleave", onResume);
    el.addEventListener("focusin", onPause);
    el.addEventListener("focusout", onResume);

    return () => {
      clear();
      ro.disconnect();
      mq.removeEventListener("change", start);
      el.removeEventListener("mouseenter", onPause);
      el.removeEventListener("mouseleave", onResume);
      el.removeEventListener("focusin", onPause);
      el.removeEventListener("focusout", onResume);
    };
  }, [reviewsPreview]);

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

  const handleViewPatientDetails = useCallback(
    (patient) => {
      setSelectedPatient(patient);
      navigate(
        { pathname: "/", search: `?patient=${encodeURIComponent(String(patient.id))}` },
        { replace: false }
      );
    },
    [navigate]
  );

  const goToNextPatient = useCallback(() => {
    if (!selectedPatient || !patientsData.length) return;
    const currentIndex = patientsData.findIndex((p) => p.id === selectedPatient.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % patientsData.length;
    const next = patientsData[nextIndex];
    setSelectedPatient(next);
    navigate({ pathname: "/", search: `?patient=${encodeURIComponent(String(next.id))}` }, { replace: true });
  }, [selectedPatient, patientsData, navigate]);

  const goToPrevPatient = useCallback(() => {
    if (!selectedPatient || !patientsData.length) return;
    const currentIndex = patientsData.findIndex((p) => p.id === selectedPatient.id);
    if (currentIndex === -1) return;
    const prevIndex = currentIndex === 0 ? patientsData.length - 1 : currentIndex - 1;
    const prev = patientsData[prevIndex];
    setSelectedPatient(prev);
    navigate({ pathname: "/", search: `?patient=${encodeURIComponent(String(prev.id))}` }, { replace: true });
  }, [selectedPatient, patientsData, navigate]);

  const handleCloseModal = useCallback(() => {
    setSelectedPatient(null);
    const params = new URLSearchParams(searchParams);
    params.delete("patient");
    params.delete("media");
    const nextSearch = params.toString();
    const currentHash =
      typeof window !== "undefined" && window.location.hash
        ? window.location.hash
        : "#home";
    navigate(
      { pathname: "/", search: nextSearch ? `?${nextSearch}` : "", hash: currentHash },
      { replace: true }
    );
  }, [navigate, searchParams]);

  if (loading) {
    return (
      <section className="relative w-full overflow-x-hidden rounded-2xl bg-background md:pt-8 md:mt-6">
        <div className="mx-auto flex w-full max-w-[2560px] flex-col gap-4 px-4 pt-6 pb-3 sm:px-6 lg:flex-row lg:items-start lg:gap-6 lg:py-6">
          <div className="min-w-0 w-full shrink-0 lg:w-[70vw] lg:max-w-full">
            <div className="max-w-full animate-pulse rounded-2xl border border-border bg-surface/50 p-4">
              <div className="mb-3 h-6 w-48 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="mb-2 h-4 max-w-md rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 max-w-sm rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          <div className="hidden min-h-[240px] min-w-0 flex-1 animate-pulse rounded-xl border border-border bg-surface/50 lg:block" />
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
    <section className="relative w-full overflow-x-hidden rounded-2xl bg-background md:pt-6 md:mt-4">
      {/* Hidden video preloads - reduces modal open lag */}
      {shouldPreloadHeroVideos && videoUrlsToPreload.length > 0 && (
        <div className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden>
          {videoUrlsToPreload.map((url) => (
            <video key={url} src={url} preload="metadata" muted playsInline />
          ))}
        </div>
      )}
      <div className="relative z-10 mx-auto flex w-full max-w-[2560px] flex-col gap-0 px-3 pt-3 pb-0 sm:px-4 sm:pt-4 md:pb-2 lg:flex-row lg:items-start lg:gap-6 lg:px-8 lg:py-4 min-[1920px]:px-10 min-[2560px]:px-12">
        <div className="min-w-0 w-full shrink-0 lg:w-[70vw] lg:max-w-full">
        {/* Photo (flex-1) → about card → seam → carousel at bottom */}
        <div className="hero-mobile-landscape-frame relative flex min-h-[min(68vh,560px)] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/30 shadow-lg max-md:landscape:min-h-[min(520px,72vh)] max-md:landscape:justify-between lg:min-h-[min(520px,72vh)]">
          <div
            className="pointer-events-none absolute inset-0 z-0 hero-unified-bg"
            style={{ backgroundImage: `url(${EducationBg})` }}
            aria-hidden
          />

          {/* Mobile-only clinic address badge over hero image */}
          <div className="hero-mobile-landscape-address absolute left-3 top-3 z-20 md:hidden">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinicAddress.name}, ${clinicAddress.area}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions"
              title="Get directions"
              className="hero-about-glass relative z-30 block max-w-[78vw] rounded-xl border border-border px-2.5 py-2.5 shadow-lg transition-colors hover:bg-primary/10 dark:hover:bg-secondary/20"
            >
              <div className="flex items-center gap-1.5 overflow-visible">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-white text-primary shadow-[0_0_10px_rgba(0,123,255,0.28)] dark:border-cyan-300/55 dark:bg-slate-950 dark:text-cyan-200 dark:shadow-[0_0_16px_rgba(0,255,255,0.55)]">
                  <FaStethoscope className="h-3 w-3 drop-shadow-[0_0_6px_rgba(0,123,255,0.55)] dark:drop-shadow-[0_0_8px_rgba(0,255,255,0.95)]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 overflow-visible truncate text-[10px] font-semibold tracking-wide text-text">
                    <FaMapMarkerAlt className="hero-mobile-pin-bounce relative z-40 h-3 w-3 shrink-0 text-red-500" aria-hidden />
                    <span className="truncate">{clinicAddress.name}</span>
                  </p>
                  <p className="truncate text-[10px] text-text-secondary">{clinicAddress.area}</p>
                  <p className="truncate text-[10px] text-text-secondary">{clinicAddress.landmark}</p>
                </div>
              </div>
            </a>
          </div>

          {/* Mobile portrait: flex-grow spacer pushes about + carousel to true bottom (CSS + portrait query). */}
          <div className="hero-portrait-bottom-spacer hidden w-full shrink-0" aria-hidden />

          {/* Spacer: desktop + mobile landscape (desktop-like). Hidden on mobile portrait (about pinned bottom). */}
          <div className="relative z-[1] hidden min-h-[min(16vh,7rem)] flex-1 flex-col max-md:landscape:flex md:flex">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/28" />
          </div>

          <div className="hero-mobile-landscape-about relative z-10 mt-auto flex w-full shrink-0 justify-start px-[clamp(0.5rem,2vmin,1.25rem)] pb-1.5 pt-0 max-md:portrait:mt-0 max-md:landscape:mt-0 max-md:px-3">
            <div className="hero-about-glass flex w-auto max-w-[min(20rem,88vw)] flex-col overflow-hidden rounded-xl border border-border p-[clamp(0.35rem,0.95vmin,0.6rem)] sm:max-w-[22rem] sm:rounded-2xl sm:p-2 md:max-w-[24rem] md:p-2.5">
              <h1 className="hero-glass-name font-heading font-extrabold leading-tight tracking-tight text-text text-[clamp(0.68rem,1.65vmin,0.95rem)] sm:text-[clamp(0.72rem,1.75vmin,1rem)] md:text-[clamp(0.78rem,1.6vmin,1.08rem)]">
                {displaySummary.name}
              </h1>
              <p className="hero-glass-bio mt-0.5 max-w-full line-clamp-3 text-text-secondary text-[clamp(0.56rem,1.35vmin,0.78rem)] leading-snug sm:text-[clamp(0.58rem,1.4vmin,0.82rem)] md:text-[clamp(0.62rem,1.35vmin,0.85rem)]">
                {displaySummary.bio}
              </p>
              <p className="hero-glass-degree mt-0.5 truncate text-text text-[clamp(0.5rem,1.2vmin,0.72rem)] font-bold uppercase tracking-wide sm:text-[clamp(0.52rem,1.25vmin,0.75rem)]">
                {highestEducation.degree}
              </p>
              <button
                type="button"
                className="mt-[clamp(0.25rem,0.75vmin,0.45rem)] cursor-pointer self-start rounded border border-primary px-[clamp(0.35rem,0.95vmin,0.6rem)] py-[clamp(0.15rem,0.45vmin,0.32rem)] font-semibold text-primary text-[clamp(0.54rem,1.3vmin,0.75rem)] transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 sm:text-[clamp(0.56rem,1.35vmin,0.78rem)]"
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
                Contact
              </button>
            </div>
          </div>

          {/* Very soft seam — narrow fade, low contrast, inset so edges disappear */}
          <div
            className="pointer-events-none relative z-[2] mx-auto h-px w-[min(88%,26rem)] shrink-0 rounded-full bg-gradient-to-r from-transparent via-border/12 to-transparent dark:via-white/5"
            aria-hidden
          />

          <div className="hero-mobile-landscape-carousel-wrap relative z-[1] flex min-h-0 w-full shrink-0 flex-col overflow-hidden max-md:min-h-[min(40vh,280px)] max-md:max-h-[min(62vh,520px)] md:min-h-[180px] md:max-h-[min(36vh,300px)] lg:max-h-none lg:min-h-[220px] xl:min-h-[230px] 2xl:min-h-[240px] min-[1920px]:min-h-[250px] min-[2560px]:min-h-[260px]">
          <div
            ref={scrollContainerRef}
            className="hero-patient-scroll hero-mobile-landscape-scroll relative z-10 flex h-full min-h-[inherit] min-w-0 flex-1 gap-1.5 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1.5 py-1.5 max-md:snap-none sm:gap-2 sm:px-2 sm:py-2 md:snap-x md:snap-mandatory md:gap-3 lg:min-h-[inherit] lg:px-2.5 lg:py-2.5"
          >
            {patientsData.map((patient, index) => (
              <div
                key={patient.id}
                className={`snap-center flex h-full min-h-[inherit] max-w-full flex-shrink-0 basis-[70vw] sm:basis-[200px] md:basis-[240px] lg:basis-[240px] xl:basis-[260px] min-[1920px]:basis-[280px] min-[2560px]:basis-[300px] ${isCenterCard(index) ? "center-card" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <PatientCaseCarousel
                  patient={patient}
                  onViewDetails={handleViewPatientDetails}
                  isCenterCard={isCenterCard(index)}
                  compact={compactHeroLayout}
                />
              </div>
            ))}
          </div>
          </div>
        </div>
        </div>

        {/* Reviews sidebar — glass, theme colors, auto-scroll list (lg+) */}
        <aside
          className="hidden min-w-0 flex-1 self-start lg:sticky lg:top-24 lg:block"
          aria-label="Patient reviews preview"
        >
          <div className="mb-3 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-white/65 via-primary/[0.05] to-secondary/[0.07] shadow-[0_8px_28px_rgba(0,123,255,0.12)] backdrop-blur-xl ring-1 ring-inset ring-white/70 dark:border-secondary/35 dark:from-white/[0.09] dark:via-primary/12 dark:to-secondary/18 dark:shadow-[0_12px_36px_rgba(108,92,231,0.2)] dark:ring-white/15">
            <div className="border-b border-primary/15 bg-gradient-to-r from-primary/15 via-secondary/12 to-accent/12 px-4 py-3 backdrop-blur-sm dark:border-white/15 dark:from-primary/24 dark:via-secondary/18 dark:to-accent/18">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-white text-primary shadow-[0_0_14px_rgba(0,123,255,0.32)] ring-2 ring-primary/40 dark:border-cyan-300/55 dark:bg-slate-950 dark:text-cyan-200 dark:ring-cyan-300/60 dark:shadow-[0_0_22px_rgba(0,255,255,0.5)]">
                  <FaStethoscope className="h-4 w-4 drop-shadow-[0_0_8px_rgba(0,123,255,0.6)] dark:drop-shadow-[0_0_10px_rgba(0,255,255,1)]" aria-hidden />
                </span>
                <div>
                  <h2 className="font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm font-semibold tracking-tight text-transparent dark:from-primary dark:to-accent">
                    Clinic Address
                  </h2>
                  <p className="text-[11px] font-medium tracking-wide text-primary dark:text-accent">
                    Address
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 px-4 py-3">
              <p className="text-sm font-semibold text-text">{clinicAddress.name}</p>
              <div className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
                <FaMapMarkerAlt className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-secondary" aria-hidden />
                <p>{clinicAddress.area}, {clinicAddress.landmark}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinicAddress.area}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-primary/35 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10 dark:border-secondary/40 dark:text-secondary dark:hover:bg-secondary/20"
              >
                Get directions
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-white/55 via-primary/[0.04] to-secondary/[0.06] shadow-[0_8px_32px_rgba(0,123,255,0.1)] backdrop-blur-xl ring-1 ring-inset ring-white/70 dark:border-secondary/30 dark:from-white/[0.07] dark:via-primary/10 dark:to-secondary/15 dark:shadow-[0_12px_40px_rgba(108,92,231,0.18)] dark:ring-white/10">
            <div className="border-b border-primary/15 bg-gradient-to-r from-primary/12 via-secondary/10 to-accent/10 px-4 py-3 backdrop-blur-sm dark:border-white/15 dark:from-primary/20 dark:via-secondary/15 dark:to-accent/15">
              <h2 className="font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm font-semibold tracking-tight text-transparent dark:from-primary dark:to-accent">
                Patient reviews
              </h2>
              <p className="mt-1.5 text-xs font-bold tracking-wide text-primary dark:text-accent">
                Recent feedback from patients
              </p>
            </div>

            <div
              ref={reviewsSidebarScrollRef}
              tabIndex={0}
              className="hero-reviews-sidebar-scroll max-h-[min(240px,34vh)] overflow-y-auto overscroll-y-contain rounded-b-2xl px-1 pb-1"
            >
              <ul className="space-y-1.5 py-2">
                {reviewsSidebarItems.map((review, idx) => {
                  const tone =
                    idx % 3 === 0
                      ? "border-l-primary bg-gradient-to-r from-primary/10 to-transparent hover:from-primary/15 dark:from-primary/20 dark:hover:from-primary/25"
                      : idx % 3 === 1
                        ? "border-l-secondary bg-gradient-to-r from-secondary/10 to-transparent hover:from-secondary/15 dark:from-secondary/20 dark:hover:from-secondary/25"
                        : "border-l-accent bg-gradient-to-r from-accent/10 to-transparent hover:from-accent/15 dark:from-accent/15 dark:hover:from-accent/20";
                  const avatarRing =
                    idx % 3 === 0
                      ? "ring-primary/50"
                      : idx % 3 === 1
                        ? "ring-secondary/50"
                        : "ring-accent/50";
                  return (
                    <li key={`sidebar-review-${idx}`}>
                      <div
                        className={`mx-1 rounded-r-lg border-l-[3px] px-3 py-2.5 pl-2.5 transition-colors ${tone}`}
                      >
                        <div className="flex gap-2.5">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[11px] font-bold text-white shadow-md ring-2 ${avatarRing} dark:from-secondary dark:to-accent`}
                          >
                            {review.name?.charAt(0) || "?"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-text">{review.name}</p>
                                <p className="truncate text-[11px] font-medium text-primary dark:text-secondary">
                                  {review.treatment}
                                </p>
                              </div>
                              <StarRow rating={review.rating || 5} />
                            </div>
                            <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-text-secondary">
                              {review.feedback}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
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