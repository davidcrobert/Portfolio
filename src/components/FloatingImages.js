import { useEffect, useRef } from 'react';

const SIZES = [175, 150, 195, 160, 185, 145, 170, 155, 190, 165];
const FLOAT_OPACITY = 0.3;
const MOBILE_FLOAT_OPACITY = 0.22;
const SUMMON_OPACITY = 0.82;
const MOBILE_SUMMON_OPACITY = 0.68;
const SUMMONED_W_RATIO = 0.4;
const SUMMONED_H_RATIO = 0.5;
const MOBILE_SUMMONED_W_RATIO = 0.28;
const MOBILE_SUMMONED_H_RATIO = 0.24;
const DRIFT_SPEED = 0.28;
const MAX_OFFSCREEN_RATIO = 0.6;
const MOBILE_SIZE_SCALE = 0.58;

function FloatingImages({ images, summonedId, activeImageIds }) {
  const refs = useRef({});
  const pos = useRef({});
  const vel = useRef({});
  const sizes = useRef({});
  const imagesRef = useRef(images);
  const summonedIdRef = useRef(summonedId);
  const prevSummonedIdRef = useRef(null);
  const rafRef = useRef(null);
  const returningIdRef = useRef(null);
  const returnTimeoutRef = useRef(null);
  const isMobileRef = useRef(window.innerWidth <= 768);

  const getSizeForViewport = (baseSize) => {
    return isMobileRef.current ? Math.round(baseSize * MOBILE_SIZE_SCALE) : baseSize;
  };

  const getFloatOpacity = () => (isMobileRef.current ? MOBILE_FLOAT_OPACITY : FLOAT_OPACITY);
  const getSummonOpacity = () => (isMobileRef.current ? MOBILE_SUMMON_OPACITY : SUMMON_OPACITY);
  const getSummonedWidthRatio = () => (isMobileRef.current ? MOBILE_SUMMONED_W_RATIO : SUMMONED_W_RATIO);
  const getSummonedHeightRatio = () => (isMobileRef.current ? MOBILE_SUMMONED_H_RATIO : SUMMONED_H_RATIO);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    summonedIdRef.current = summonedId;
  }, [summonedId]);

  const getVisibleBounds = () => {
    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('footer');
    const topBoundary = headerElement ? headerElement.getBoundingClientRect().bottom : 0;
    const bottomBoundary = footerElement ? footerElement.getBoundingClientRect().top : window.innerHeight;

    return {
      top: topBoundary,
      bottom: bottomBoundary > topBoundary ? bottomBoundary : window.innerHeight
    };
  };

  useEffect(() => {
    images.forEach((img, i) => {
      if (pos.current[img.id] === undefined) {
        const size = sizes.current[img.id] || getSizeForViewport(SIZES[i % SIZES.length]);
        const { top, bottom } = getVisibleBounds();
        const floatingHeight = size * 0.75;
        pos.current[img.id] = {
          x: Math.random() * (window.innerWidth - size),
          y: top + Math.random() * Math.max(bottom - top - floatingHeight, 0),
        };
        vel.current[img.id] = {
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
        };
        sizes.current[img.id] = size;
      }

      const el = refs.current[img.id];
      if (!el) return;

      el.style.left = `${pos.current[img.id].x}px`;
      el.style.top = `${pos.current[img.id].y}px`;
      el.style.width = `${sizes.current[img.id]}px`;
      el.style.height = `${sizes.current[img.id] * 0.75}px`;
      el.style.zIndex = '3';

      requestAnimationFrame(() => {
        if (!el) return;
        el.style.transition = 'opacity 1.5s ease';
        if (!activeImageIds?.has(img.id)) {
          el.style.opacity = '0';
          return;
        }
        el.style.opacity = summonedIdRef.current === img.id
          ? String(getSummonOpacity())
          : String(getFloatOpacity());
      });
    });
  }, [images, activeImageIds]);

  useEffect(() => {
    if (summonedId) {
      prevSummonedIdRef.current = summonedId;

      images.forEach((img) => {
        const el = refs.current[img.id];
        if (!el) return;

        if (img.id === summonedId) {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const summonedWidth = viewportWidth * getSummonedWidthRatio();
          const summonedHeight = viewportHeight * getSummonedHeightRatio();

          el.style.transition = [
            'left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            'top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            'height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            'opacity 0.3s ease',
          ].join(', ');
          el.style.left = `${(viewportWidth - summonedWidth) / 2}px`;
          el.style.top = `${(viewportHeight - summonedHeight) / 2}px`;
          el.style.width = `${summonedWidth}px`;
          el.style.height = `${summonedHeight}px`;
          el.style.opacity = String(getSummonOpacity());
          el.style.zIndex = '5';
          return;
        }

        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = '0';
      });

      return;
    }

    if (!prevSummonedIdRef.current) return;

    const returningId = prevSummonedIdRef.current;
    prevSummonedIdRef.current = null;
    returningIdRef.current = returningId;

    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }

    const summonedEl = refs.current[returningId];
    if (summonedEl && pos.current[returningId] && sizes.current[returningId]) {
      const floatingWidth = sizes.current[returningId];
      const floatingHeight = floatingWidth * 0.75;

      summonedEl.style.transition = [
        'left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'opacity 0.4s ease',
      ].join(', ');
      summonedEl.style.left = `${pos.current[returningId].x}px`;
      summonedEl.style.top = `${pos.current[returningId].y}px`;
      summonedEl.style.width = `${floatingWidth}px`;
      summonedEl.style.height = `${floatingHeight}px`;
      summonedEl.style.opacity = String(getFloatOpacity());
      summonedEl.style.zIndex = '3';
    }

    returnTimeoutRef.current = setTimeout(() => {
      if (returningIdRef.current === returningId) {
        returningIdRef.current = null;
      }
      returnTimeoutRef.current = null;
    }, 500);

    images.forEach((img) => {
      if (img.id === returningId) return;

      const el = refs.current[img.id];
      if (!el) return;
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = activeImageIds?.has(img.id) ? String(getFloatOpacity()) : '0';
    });
  }, [summonedId, images, activeImageIds]);

  useEffect(() => {
    const clampPosition = (id) => {
      const position = pos.current[id];
      const size = sizes.current[id];
      if (!position || !size) return;

      const viewportWidth = window.innerWidth;
      const floatingHeight = size * 0.75;
      const { top, bottom } = getVisibleBounds();
      const minX = -size * MAX_OFFSCREEN_RATIO;
      const maxX = viewportWidth - size * (1 - MAX_OFFSCREEN_RATIO);
      const minY = top - floatingHeight * MAX_OFFSCREEN_RATIO;
      const maxY = bottom - floatingHeight * (1 - MAX_OFFSCREEN_RATIO);

      position.x = Math.min(Math.max(position.x, minX), maxX);
      position.y = Math.min(Math.max(position.y, minY), maxY);
    };

    const syncViewportSizing = () => {
      const nextIsMobile = window.innerWidth <= 768;
      const modeChanged = nextIsMobile !== isMobileRef.current;
      isMobileRef.current = nextIsMobile;

      imagesRef.current.forEach((img, i) => {
        const nextSize = getSizeForViewport(SIZES[i % SIZES.length]);
        if (modeChanged || !sizes.current[img.id]) {
          sizes.current[img.id] = nextSize;
        }

        clampPosition(img.id);

        const el = refs.current[img.id];
        if (!el) return;
        el.style.width = `${sizes.current[img.id]}px`;
        el.style.height = `${sizes.current[img.id] * 0.75}px`;
        if (!summonedIdRef.current || summonedIdRef.current !== img.id) {
          el.style.opacity = activeImageIds?.has(img.id) ? String(getFloatOpacity()) : '0';
        }
      });
    };

    syncViewportSizing();
    window.addEventListener('resize', syncViewportSizing);
    return () => window.removeEventListener('resize', syncViewportSizing);
  }, [activeImageIds]);

  useEffect(() => {
    const animate = () => {
      const currentSummonedId = summonedIdRef.current;
      const returningId = returningIdRef.current;
      const currentImages = imagesRef.current;

      currentImages.forEach((img) => {
        if (img.id === currentSummonedId || img.id === returningId) return;

        const el = refs.current[img.id];
        const position = pos.current[img.id];
        const velocity = vel.current[img.id];
        if (!el || !position || !velocity) return;

        position.x += velocity.vx;
        position.y += velocity.vy;

        const viewportWidth = window.innerWidth;
        const floatingWidth = sizes.current[img.id] || 160;
        const floatingHeight = floatingWidth * 0.75;
        const { top, bottom } = getVisibleBounds();
        const minX = -floatingWidth * MAX_OFFSCREEN_RATIO;
        const maxX = viewportWidth - floatingWidth * (1 - MAX_OFFSCREEN_RATIO);
        const minY = top - floatingHeight * MAX_OFFSCREEN_RATIO;
        const maxY = bottom - floatingHeight * (1 - MAX_OFFSCREEN_RATIO);

        if (position.x < minX) {
          position.x = minX;
          velocity.vx *= -1;
        }
        if (position.x > maxX) {
          position.x = maxX;
          velocity.vx *= -1;
        }
        if (position.y < minY) {
          position.y = minY;
          velocity.vy *= -1;
        }
        if (position.y > maxY) {
          position.y = maxY;
          velocity.vy *= -1;
        }

        el.style.left = `${position.x}px`;
        el.style.top = `${position.y}px`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      {images.map((img, i) => (
        <div
          key={img.id}
          ref={el => {
            if (el) {
              refs.current[img.id] = el;
            } else {
              delete refs.current[img.id];
            }
          }}
          style={{
            position: 'absolute',
            width: `${sizes.current[img.id] || getSizeForViewport(SIZES[i % SIZES.length])}px`,
            height: `${(sizes.current[img.id] || getSizeForViewport(SIZES[i % SIZES.length])) * 0.75}px`,
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0,
            border: '1px solid black',
            left: 0,
            top: 0,
            zIndex: 3,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingImages;
