import { useEffect, useRef } from 'react';

const SIZES = [175, 150, 195, 160, 185, 145, 170, 155, 190, 165];
const FLOAT_OPACITY = 0.3;
const SUMMON_OPACITY = 0.82;
const SUMMONED_W_RATIO = 0.4;
const SUMMONED_H_RATIO = 0.5;
const DRIFT_SPEED = 0.28;

function FloatingImagesFixed({ images, summonedId }) {
  const refs = useRef([]);
  const pos = useRef([]);
  const vel = useRef([]);
  const sizes = useRef([]);
  const imagesRef = useRef(images);
  const summonedIdRef = useRef(summonedId);
  const prevSummonedIdRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    summonedIdRef.current = summonedId;
  }, [summonedId]);

  useEffect(() => {
    images.forEach((img, i) => {
      if (pos.current[i] !== undefined) return;

      const size = SIZES[i % SIZES.length];
      pos.current[i] = {
        x: Math.random() * (window.innerWidth - size),
        y: Math.random() * (window.innerHeight - size * 0.75),
      };
      vel.current[i] = {
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
      };
      sizes.current[i] = size;

      const el = refs.current[i];
      if (!el) return;

      el.style.left = `${pos.current[i].x}px`;
      el.style.top = `${pos.current[i].y}px`;

      requestAnimationFrame(() => {
        if (!el) return;
        el.style.transition = 'opacity 1.5s ease';
        el.style.opacity = String(FLOAT_OPACITY);
      });
    });
  }, [images]);

  useEffect(() => {
    if (summonedId) {
      const idx = images.findIndex(img => img.id === summonedId);
      prevSummonedIdRef.current = summonedId;

      images.forEach((img, i) => {
        const el = refs.current[i];
        if (!el) return;

        if (i === idx) {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const summonedWidth = viewportWidth * SUMMONED_W_RATIO;
          const summonedHeight = viewportHeight * SUMMONED_H_RATIO;

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
          el.style.opacity = String(SUMMON_OPACITY);
          el.style.zIndex = '5';
          return;
        }

        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = '0';
      });

      return;
    }

    if (!prevSummonedIdRef.current) return;

    const prevIdx = images.findIndex(img => img.id === prevSummonedIdRef.current);
    prevSummonedIdRef.current = null;

    const summonedEl = refs.current[prevIdx];
    if (summonedEl && pos.current[prevIdx] && sizes.current[prevIdx]) {
      const floatingWidth = sizes.current[prevIdx];
      const floatingHeight = floatingWidth * 0.75;

      summonedEl.style.transition = [
        'left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'opacity 0.4s ease',
      ].join(', ');
      summonedEl.style.left = `${pos.current[prevIdx].x}px`;
      summonedEl.style.top = `${pos.current[prevIdx].y}px`;
      summonedEl.style.width = `${floatingWidth}px`;
      summonedEl.style.height = `${floatingHeight}px`;
      summonedEl.style.opacity = String(FLOAT_OPACITY);
      summonedEl.style.zIndex = '3';
    }

    images.forEach((img, i) => {
      if (i === prevIdx) return;

      const el = refs.current[i];
      if (!el) return;
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = String(FLOAT_OPACITY);
    });
  }, [summonedId, images]);

  useEffect(() => {
    const animate = () => {
      const currentSummonedId = summonedIdRef.current;
      const currentImages = imagesRef.current;

      currentImages.forEach((img, i) => {
        if (img.id === currentSummonedId) return;

        const el = refs.current[i];
        const position = pos.current[i];
        const velocity = vel.current[i];
        if (!el || !position || !velocity) return;

        position.x += velocity.vx;
        position.y += velocity.vy;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const floatingWidth = sizes.current[i] || 160;

        if (position.x < -floatingWidth) {
          position.x = -floatingWidth;
          velocity.vx *= -1;
        }
        if (position.x > viewportWidth) {
          position.x = viewportWidth;
          velocity.vx *= -1;
        }
        if (position.y < -floatingWidth * 0.75) {
          position.y = -floatingWidth * 0.75;
          velocity.vy *= -1;
        }
        if (position.y > viewportHeight) {
          position.y = viewportHeight;
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
          ref={el => { refs.current[i] = el; }}
          style={{
            position: 'absolute',
            width: `${SIZES[i % SIZES.length]}px`,
            height: `${SIZES[i % SIZES.length] * 0.75}px`,
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

export default FloatingImagesFixed;
