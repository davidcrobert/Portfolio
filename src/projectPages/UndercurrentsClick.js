import { useEffect, useRef } from 'react';

const RADIUS = 20;
const SPEED  = 1500; // px per second along path

// Find where a ray from (x,y) in direction (dx,dy) first exits the viewport
function rayToEdge(x, y, dx, dy, w, h) {
  const ts = [];
  if (dx >  1e-9) ts.push((w - x) / dx);
  if (dx < -1e-9) ts.push(    -x  / dx);
  if (dy >  1e-9) ts.push((h - y) / dy);
  if (dy < -1e-9) ts.push(    -y  / dy);
  const t = Math.min(...ts.filter(v => v > 1e-9));
  return { x: x + t * dx, y: y + t * dy };
}

// 0=left 1=right 2=top 3=bottom
function whichEdge(pt, w, h) {
  if (pt.x < 2)     return 0;
  if (pt.x > w - 2) return 1;
  if (pt.y < 2)     return 2;
  return 3;
}

// Build path: straight in → clockwise circle (spins rotations) → straight out
// Entry/exit directions are fully random; circle is centred at (cx, cy).
function buildPath(cx, cy, vpW, vpH) {
  const R      = RADIUS;
  const spins  = 3 + Math.floor(Math.random() * 2); // 6–10
  const needLen = 20 + Math.random() * 40;           // 20–60 px

  // Random entry direction → clockwise tangent angle → entry edge point
  const αIn  = Math.random() * 2 * Math.PI;
  const dxIn = Math.cos(αIn), dyIn = Math.sin(αIn);
  // Clockwise tangent at θ is (-sinθ, cosθ). Match to (dxIn, dyIn): θ = atan2(-dxIn, dyIn)
  const θE  = Math.atan2(-dxIn, dyIn);
  const cex = cx + R * Math.cos(θE);
  const cey = cy + R * Math.sin(θE);
  const entryPt = rayToEdge(cex, cey, -dxIn, -dyIn, vpW, vpH);

  // Random exit direction — retry until it exits through a different edge
  let dxOut, dyOut, θX, cxx, cxy, exitPt, tries = 0;
  do {
    const αOut = Math.random() * 2 * Math.PI;
    dxOut = Math.cos(αOut); dyOut = Math.sin(αOut);
    θX    = Math.atan2(-dxOut, dyOut);
    cxx   = cx + R * Math.cos(θX);
    cxy   = cy + R * Math.sin(θX);
    exitPt = rayToEdge(cxx, cxy, dxOut, dyOut, vpW, vpH);
    tries++;
  } while (whichEdge(entryPt, vpW, vpH) === whichEdge(exitPt, vpW, vpH) && tries < 20);

  // Total clockwise arc: N full rotations + partial arc from θE to θX
  const partialArc = ((θX - θE) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  const totalArc   = spins * 2 * Math.PI + partialArc;

  const lenIn   = Math.hypot(cex - entryPt.x, cey - entryPt.y);
  const lenLoop = R * totalArc;
  const lenOut  = Math.hypot(exitPt.x - cxx, exitPt.y - cxy);
  const total   = lenIn + lenLoop + lenOut;

  return {
    cx, cy, R, θE, totalArc,
    entryX: entryPt.x, entryY: entryPt.y,
    cex, cey, cxx, cxy,
    exitX: exitPt.x, exitY: exitPt.y,
    dxIn, dyIn, dxOut, dyOut,
    lenIn, lenLoop, lenOut, total, needLen
  };
}

function samplePath(p, s) {
  if (s < 0) {
    // Off-screen behind entry
    return { x: p.entryX + p.dxIn * s, y: p.entryY + p.dyIn * s };
  }
  if (s < p.lenIn) {
    const t = p.lenIn > 0 ? s / p.lenIn : 0;
    return { x: p.entryX + (p.cex - p.entryX) * t, y: p.entryY + (p.cey - p.entryY) * t };
  }
  const sL = s - p.lenIn;
  if (sL < p.lenLoop) {
    const θ = p.θE + sL / p.R;
    return { x: p.cx + p.R * Math.cos(θ), y: p.cy + p.R * Math.sin(θ) };
  }
  const sO = s - p.lenIn - p.lenLoop;
  if (sO <= p.lenOut) {
    const t = p.lenOut > 0 ? sO / p.lenOut : 0;
    return { x: p.cxx + (p.exitX - p.cxx) * t, y: p.cxy + (p.exitY - p.cxy) * t };
  }
  // Off-screen past exit
  const excess = sO - p.lenOut;
  return { x: p.exitX + p.dxOut * excess, y: p.exitY + p.dyOut * excess };
}

export default function UndercurrentsClick() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx   = canvas.getContext('2d');
    const dpr   = Math.min(window.devicePixelRatio || 1, 2);
    const anims = [];
    let vpW, vpH, rafId, lastTime;

    const resize = () => {
      vpW = window.innerWidth;
      vpH = window.innerHeight;
      canvas.width  = Math.round(vpW * dpr);
      canvas.height = Math.round(vpH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onClick = (e) => {
      const p = buildPath(e.clientX, e.clientY, vpW, vpH);
      anims.push({ path: p, frontS: -p.needLen });
    };

    const draw = (now) => {
      rafId = requestAnimationFrame(draw);
      const elapsed = now - lastTime;
      lastTime = now;
      if (elapsed > 100) return; // skip after tab hidden

      ctx.clearRect(0, 0, vpW, vpH);

      for (let i = anims.length - 1; i >= 0; i--) {
        const anim = anims[i];
        anim.frontS += SPEED * (elapsed / 1000);

        const tailS = anim.frontS - anim.path.needLen;
        if (tailS > anim.path.total) { anims.splice(i, 1); continue; }

        const N = 40;
        ctx.beginPath();
        for (let k = 0; k <= N; k++) {
          const pt = samplePath(anim.path, tailS + (k / N) * anim.path.needLen);
          if (k === 0) ctx.moveTo(pt.x, pt.y);
          else         ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = '#111';
        ctx.lineWidth   = 1.5;
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.stroke();
      }
    };

    window.addEventListener('resize', resize);
    resize();
    lastTime = performance.now();
    rafId = requestAnimationFrame(draw);

    // Delay listener attachment so the navigation click that brought us here
    // doesn't immediately trigger an animation on arrival.
    const listenTimer = setTimeout(() => {
      document.addEventListener('click', onClick);
    }, 500);

    return () => {
      clearTimeout(listenTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
