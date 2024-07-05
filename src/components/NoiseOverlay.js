import React, { useEffect, useRef } from 'react';
import {config} from '../config';

const NoiseOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const flicker = () => {
        return Math.random() > config.noiseOverlay.flickerProbability ? config.noiseOverlay.flickerIntensity : 1;
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
        ctx.globalAlpha = config.noiseOverlay.scanlineIntensity;
        for (let i = 0; i < canvas.height; i += 2) {
          ctx.fillStyle = i % 4 === 0 ? '#fff' : '#000';
          ctx.fillRect(0, i, canvas.width, 1);
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      };

    const animate = () => {
      time++;
      createNoise(context);
      createScanlines(context);

      context.globalCompositeOperation = 'hue';
      context.fillStyle = `hsl(${time % 360}, 100%, 50%)`;
      context.globalAlpha = config.noiseOverlay.colorShiftIntensity;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = 1;

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
        opacity: config.noiseOverlay.opacity,
        zIndex: config.noiseOverlay.zIndex,
      }}
    />
  );
};

export default NoiseOverlay;