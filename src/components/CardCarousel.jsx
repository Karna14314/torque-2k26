import { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Infinite loop carousel — fills full width, auto-scrolls continuously,
 * supports mouse drag + touch swipe with momentum.
 * Loop math is derived from actual DOM measurements, not hardcoded constants.
 */
const CardCarousel = ({ items, type, autoScrollSpeed = 6000 }) => {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const setWidthRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const pauseTimer = useRef(null);
  const isPausedRef = useRef(false);
  const [ready, setReady] = useState(false);
  
  // Mobile detection for speed adjustment
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  // Slower on mobile for better UX
  const effectiveSpeed = isMobile ? autoScrollSpeed * 2.5 : autoScrollSpeed;
  const autoScrollSpeedRef = useRef(effectiveSpeed);

  // Update speed ref when prop changes or screen resizes
  useEffect(() => {
    const updateSpeed = () => {
      const mobile = window.innerWidth < 768;
      autoScrollSpeedRef.current = mobile ? autoScrollSpeed * 2.5 : autoScrollSpeed;
    };
    updateSpeed();
    window.addEventListener('resize', updateSpeed, { passive: true });
    return () => window.removeEventListener('resize', updateSpeed);
  }, [autoScrollSpeed]);

  // Triple the items so we always have content on both sides
  const looped = [...items, ...items, ...items];

  // Measure the actual rendered width of one set after mount
  const measureSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return 0;
    const card = track.children[0];
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    return (card.offsetWidth + gap) * items.length;
  }, [items.length]);

  // Auto-scroll loop - continuous infinite scroll
  const startLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      if (!isPausedRef.current && !isDragging.current) {
        const sw = setWidthRef.current;
        if (sw > 0) {
          // Continuous scroll speed - pixels per millisecond
          const baseSpeed = 0.04; // Adjust this for faster/slower scroll
          const scrollAmount = baseSpeed * delta;
          track.scrollLeft += scrollAmount;

          // Seamless infinite loop wrapping
          if (track.scrollLeft >= sw * 2) {
            track.scrollLeft = track.scrollLeft - sw;
          } else if (track.scrollLeft <= 0) {
            track.scrollLeft = track.scrollLeft + sw;
          }
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for content to render, then measure
    const init = () => {
      const sw = measureSetWidth();
      if (sw > 0) {
        setWidthRef.current = sw;
        track.scrollLeft = sw; // start in the middle set
        setReady(true);
        startLoop();
      } else {
        // Retry if not ready
        animRef.current = requestAnimationFrame(init);
      }
    };
    animRef.current = requestAnimationFrame(init);

    return () => cancelAnimationFrame(animRef.current);
  }, [measureSetWidth, startLoop]);

  // Re-measure on resize
  useEffect(() => {
    const onResize = () => {
      const sw = measureSetWidth();
      if (sw > 0) {
        const oldSw = setWidthRef.current;
        const ratio = trackRef.current.scrollLeft / oldSw;
        setWidthRef.current = sw;
        trackRef.current.scrollLeft = sw * ratio; // maintain relative position
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [measureSetWidth]);

  const pause = () => {
    clearTimeout(pauseTimer.current);
    isPausedRef.current = true;
  };
  const resume = (delay = 1200) => {
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => { isPausedRef.current = false; }, delay);
  };

  const wrapScroll = () => {
    const track = trackRef.current;
    const sw = setWidthRef.current;
    if (!track || sw <= 0) return;
    if (track.scrollLeft >= sw * 2) {
      track.scrollLeft -= sw;
    } else if (track.scrollLeft <= 1) {
      track.scrollLeft += sw;
    }
  };

  // ── Mouse drag ──────────────────────────────────────────
  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragScrollLeft.current = trackRef.current.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
    pause();
    trackRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    velocity.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
    trackRef.current.scrollLeft = dragScrollLeft.current - (e.pageX - dragStartX.current);
    wrapScroll();
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = 'grab';
    const flick = () => {
      if (Math.abs(velocity.current) > 0.5) {
        trackRef.current.scrollLeft -= velocity.current * 0.92;
        velocity.current *= 0.88;
        wrapScroll();
        requestAnimationFrame(flick);
      } else {
        resume(800);
      }
    };
    requestAnimationFrame(flick);
  };

  const onMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      trackRef.current.style.cursor = 'grab';
      resume(800);
    }
  };

  // ── Touch ───────────────────────────────────────────────
  const onTouchStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragScrollLeft.current = trackRef.current.scrollLeft;
    lastX.current = e.touches[0].clientX;
    velocity.current = 0;
    pause();
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    velocity.current = e.touches[0].clientX - lastX.current;
    lastX.current = e.touches[0].clientX;
    trackRef.current.scrollLeft = dragScrollLeft.current - (e.touches[0].clientX - dragStartX.current);
    wrapScroll();
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    const flick = () => {
      if (Math.abs(velocity.current) > 0.5) {
        trackRef.current.scrollLeft -= velocity.current * 0.92;
        velocity.current *= 0.88;
        wrapScroll();
        requestAnimationFrame(flick);
      } else {
        resume(800);
      }
    };
    requestAnimationFrame(flick);
  };

  // Click guard — don't navigate if user was dragging
  const handleCardClick = (item) => {
    if (Math.abs(velocity.current) > 2) return;
    navigate(type === 'workshop' ? `/workshop/${item.id}` : `/event/${item.id}`);
  };

  // Get category color based on event category
  const getCategoryColor = (category) => {
    const categories = {
      'Technical': 'rgba(59, 130, 246, 0.15)',
      'Design': 'rgba(168, 85, 247, 0.15)',
      'Gaming': 'rgba(239, 68, 68, 0.15)',
      'Workshop': 'rgba(212, 175, 55, 0.15)',
      'EVENT': 'rgba(212, 175, 55, 0.1)',
    };
    return categories[category] || 'rgba(212, 175, 55, 0.1)';
  };

  return (
    <div className="inf-carousel-root">
      <div className="inf-fade-left" />
      <div className="inf-fade-right" />

      <div
        ref={trackRef}
        className="inf-track"
        style={{ cursor: 'grab', opacity: ready ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {looped.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="inf-card"
            onClick={() => handleCardClick(item)}
          >
            <div className="inf-card-img-wrap">
              <img src={item.image} alt={item.name} className="inf-card-img" draggable={false} />
              <div className="inf-card-overlay" />
              <div className="inf-card-badge">
                {type === 'workshop' && item.emoji ? `${item.emoji} ` : ''}
                {type === 'workshop' ? 'WORKSHOP' : 'EVENT'}
              </div>
            </div>

            <div className="inf-card-body">
              <h3 className="inf-card-title">{item.name}</h3>
              <p className="inf-card-tagline">{item.tagline}</p>
              
              {/* Category and meta info */}
              <div className="inf-card-tags">
                {type === 'workshop' && (item.duration || item.level) && (
                  <>
                    {item.duration && <span className="inf-card-tag">⏱ {item.duration}</span>}
                    {item.level && <span className="inf-card-tag">📊 {item.level}</span>}
                  </>
                )}
                {type === 'event' && item.category && (
                  <span 
                    className="inf-card-tag"
                    style={{ background: getCategoryColor(item.category) }}
                  >
                    {item.category}
                  </span>
                )}
              </div>
              
              <button
                className="inf-card-btn"
                onClick={(e) => { e.stopPropagation(); handleCardClick(item); }}
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
