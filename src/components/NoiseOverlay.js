import React, { useEffect, useRef } from 'react';

const NoiseOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const flicker = () => {
        return Math.random() > 0.95 ? 0.6 : 1;
    };

    const createNoise = (ctx) => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      const opacity = flicker();

      for (let i = 0; i < buffer.length; i++) {
        const noise = Math.random() * 255;
        buffer[i] = (noise | (noise << 8) | (noise << 16) | (opacity * 255 << 24)) >>> 0;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const createScanlines = (ctx) => {
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < canvas.height; i += 2) {
          ctx.fillStyle = i % 4 === 0 ? '#fff' : '#000';
          ctx.fillRect(0, i, canvas.width, 1);
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      };

    const animate = () => {
      createNoise(context);
      createScanlines(context);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.1,
        zIndex: 9999,
      }}
    />
  );
};

export default NoiseOverlay;