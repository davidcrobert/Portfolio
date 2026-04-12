import { useEffect, useRef } from 'react';

const SIZES = [175, 150, 195, 160, 185, 145, 170, 155, 190, 165];
const FLOAT_OPACITY = 0.35;
const SUMMON_OPACITY = 0.82;
const SUMMONED_W_RATIO = 0.4;
const SUMMONED_H_RATIO = 0.5;
const DRIFT_SPEED = 0.28;

function FloatingImages({ images, summonedId }) {
  const refs = useRef([]);
  const pos = useRef([]);
  const vel = useRef([]);
  const sizes = useRef([]);
  const imagesRef = useRef(images);
  const summonedIdRef = useRef(summonedId);
  const prevSummonedIdRef = useRef(null);
  const rafRef = useRef(null);
  const boundsRef = useRef({ top: 0, bottom: window.innerHeight });

  // Keep refs in sync without restarting RAF
  useEffect(() => { imagesRef.current = images; }, [images]);
  useEffect(() => { summonedIdRef.current = summonedId; }, [summonedId]);

  // Track the list area (between header and footer) and update on resize
  useEffect(() => {
    const updateBounds = () => {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const headerH = header ? header.offsetHeight : 0;
      const footerH = footer ? footer.offsetHeight : 44;
      boundsRef.current = { top: headerH, bottom: window.innerHeight - footerH };
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Initialize positions for any new images
  useEffect(() => {
    images.forEach((img, i) => {
      if (pos.current[i] !== undefined) return;
      const sz = SIZES[i % SIZES.length];
      const { top: listTop, bottom: listBottom } = boundsRef.current;
      pos.current[i] = {
        x: Math.random() * (window.innerWidth - sz),
        y: listTop + Math.random() * Math.max(0, listBottom - listTop - sz * 0.75),
      };
      vel.current[i] = {
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
      };
      sizes.current[i] = sz;

      const el = refs.current[i];
      if (el) {
        el.style.left = `${pos.current[i].x}px`;
        el.style.top = `${pos.current[i].y}px`;
        requestAnimationFrame(() => {
          if (!el) return;
          el.style.transition = 'opacity 1.5s ease';
          el.style.opacity = String(FLOAT_OPACITY);
        });
      }
    });
  }, [images]);

  // Handle summon and unsummon
  useEffect(() => {
    if (summonedId) {
      const idx = images.findIndex(img => img.id === summonedId);
      prevSummonedIdRef.current = summonedId;

      images.forEach((img, i) => {
        const el = refs.current[i];
        if (!el) return;

        if (i === idx) {
          const W = window.innerWidth;
          const H = window.innerHeight;
          const sz = sizes.current[i] || SIZES[i % SIZES.length];
          const floatW = sz;
          const floatH = sz * 0.75;

          // Compute the transform that moves the image's center to the viewport center
          // and scales it up to the summoned size — single property, no wobble
          const floatCenterX = pos.current[i].x + floatW / 2;
          const floatCenterY = pos.current[i].y + floatH / 2;
          const tx = W / 2 - floatCenterX;
          const ty = H / 2 - floatCenterY;
          const scaleX = (W * SUMMONED_W_RATIO) / floatW;
          const scaleY = (H * SUMMONED_H_RATIO) / floatH;

          // Counter-scale the border so it stays visually 1px regardless of scale
          el.style.borderTopWidth = `${(1 / scaleY).toFixed(4)}px`;
          el.style.borderBottomWidth = `${(1 / scaleY).toFixed(4)}px`;
          el.style.borderLeftWidth = `${(1 / scaleX).toFixed(4)}px`;
          el.style.borderRightWidth = `${(1 / scaleX).toFixed(4)}px`;

          el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease';
          el.style.transform = `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`;
          el.style.opacity = String(SUMMON_OPACITY);
          el.style.zIndex = '5';
        } else {
          el.style.transition = 'opacity 0.3s ease';
          el.style.opacity = '0';
        }
      });
    } else if (prevSummonedIdRef.current) {
      const prevIdx = images.findIndex(img => img.id === prevSummonedIdRef.current);
      prevSummonedIdRef.current = null;

      const summonedEl = refs.current[prevIdx];
      if (summonedEl) {
        // Animate transform back to identity — image flies back to float position and shrinks.
        // Simultaneously transition border-width back to 1px so it stays visually 1px throughout.
        summonedEl.style.transition = [
          'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          'opacity 0.4s ease',
          'border-top-width 0.5s ease',
          'border-bottom-width 0.5s ease',
          'border-left-width 0.5s ease',
          'border-right-width 0.5s ease',
        ].join(', ');
        summonedEl.style.transform = 'none';
        summonedEl.style.opacity = String(FLOAT_OPACITY);
        summonedEl.style.borderTopWidth = '1px';
        summonedEl.style.borderBottomWidth = '1px';
        summonedEl.style.borderLeftWidth = '1px';
        summonedEl.style.borderRightWidth = '1px';
        summonedEl.style.zIndex = '3';
      }

      images.forEach((img, i) => {
        if (i === prevIdx) return;
        const el = refs.current[i];
        if (!el) return;
        el.style.transition = 'opacity 0.5s ease';
        el.style.opacity = String(FLOAT_OPACITY);
      });
    }
  }, [summonedId, images]);

  // Single long-lived RAF loop — only updates left/top, never transform
  useEffect(() => {
    const animate = () => {
      const currentSummonedId = summonedIdRef.current;
      const imgs = imagesRef.current;

      imgs.forEach((img, i) => {
        if (img.id === currentSummonedId) return;

        const el = refs.current[i];
        const p = pos.current[i];
        const v = vel.current[i];
        if (!el || !p || !v) return;

        p.x += v.vx;
        p.y += v.vy;

        const W = window.innerWidth;
        const sz = sizes.current[i] || 160;
        const { top: listTop, bottom: listBottom } = boundsRef.current;

        // Allow at most 50% of the image outside the list area on any edge
        const minX = -(sz * 0.5);
        const maxX = W - sz * 0.5;
        const minY = listTop - sz * 0.75 * 0.5;
        const maxY = listBottom - sz * 0.75 * 0.5;

        if (p.x < minX) { p.x = minX; v.vx *= -1; }
        if (p.x > maxX) { p.x = maxX; v.vx *= -1; }
        if (p.y < minY) { p.y = minY; v.vy *= -1; }
        if (p.y > maxY) { p.y = maxY; v.vy *= -1; }

        el.style.left = `${p.x}px`;
        el.style.top = `${p.y}px`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
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

export default FloatingImages;
