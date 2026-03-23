import { useEffect, useRef } from "react";

/**
 * Horizontal swipe detection for touch on a ref element.
 * Re-runs when `deps` change so listeners attach after `ref.current` mounts (e.g. lightbox).
 * @param {React.RefObject<HTMLElement>} ref
 * @param {object} options
 * @param {() => void} [options.onSwipeLeft]
 * @param {() => void} [options.onSwipeRight]
 * @param {number} [options.threshold=50]
 * @param {number} [options.verticalTolerance=40]
 * @param {unknown[]} [deps] — extra deps (e.g. open state) so effect runs when ref target appears
 */
export function useSwipeHorizontal(
  ref,
  { onSwipeLeft, onSwipeRight, threshold = 50, verticalTolerance = 40 } = {},
  deps = []
) {
  const optsRef = useRef({ onSwipeLeft, onSwipeRight, threshold, verticalTolerance });
  optsRef.current = { onSwipeLeft, onSwipeRight, threshold, verticalTolerance };

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const startX = { current: 0 };
    const startY = { current: 0 };

    const onStart = (e) => {
      const t = e.touches ? e.touches[0] : e;
      startX.current = t.clientX;
      startY.current = t.clientY;
    };

    const onEnd = (e) => {
      const { onSwipeLeft: swL, onSwipeRight: swR, threshold: th, verticalTolerance: vt } =
        optsRef.current;
      if (!swL && !swR) return;
      const t = e.changedTouches ? e.changedTouches[0] : e;
      const dx = t.clientX - startX.current;
      const dy = t.clientY - startY.current;
      if (Math.abs(dy) > vt) return;
      if (dx < -th && swL) swL();
      else if (dx > th && swR) swR();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callers pass deps for ref mount timing
  }, [ref, ...deps]);
}
