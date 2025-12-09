// Update your BlinkDetection.js component to check the current route
// and disable itself when not on the home page

import React, { useEffect, useRef, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as FaceMeshConnections from '@mediapipe/face_mesh';
import { useLocation } from 'react-router-dom';

const MinimalBlinkDetection = ({
  onBlink,
  enabledRoutes = ['/'],
  forceEnabled = false,
  disabled = false,
  className,
  style
}) => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);
  const [blinkCount, setBlinkCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const silentAlertRef = useRef(null);

  const isRouteEnabled = forceEnabled || enabledRoutes.includes(location.pathname);
  const isActive = isRouteEnabled && !disabled && !isBlocked;

  // Define all refs properly
  const wasBlinkingRef = useRef(false);
  const lastBlinkTimeRef = useRef(0);
  const blinkStartTimeRef = useRef(0);
  const onBlinkRef = useRef(onBlink);
  const setBlinkCountRef = useRef(setBlinkCount);

  const MIN_BLINK_DURATION = 50;
  const MIN_TIME_BETWEEN_BLINKS = 300;

  // EAR-related refs
  const baselineEAR = useRef(0.25);
  const framesCountRef = useRef(0);
  const earHistoryRef = useRef([]);
  const EAR_SMOOTHING_WINDOW = 5;
  const EAR_THRESHOLD_RATIO = 0.75;
  const INITIAL_CALIBRATION_FRAMES = 30;

  // Update refs when props/setters change
  useEffect(() => {
    onBlinkRef.current = onBlink;
    setBlinkCountRef.current = setBlinkCount;
  }, [onBlink]);

  const handleBlink = () => {
    setBlinkCountRef.current(prev => {
      console.log('BLINK!', prev + 1);
      return prev + 1;
    });
    if (onBlinkRef.current) {
      onBlinkRef.current();
    }
  };

  const handleBlinkRef = useRef(handleBlink);

  useEffect(() => {
    handleBlinkRef.current = handleBlink;
  });

  // Silence camera alert popups while this component is active on enabled routes
  useEffect(() => {
    if (!isRouteEnabled) return;
    const originalAlert = window.alert;
    const silentAlert = (msg) => {
      // keep a trace in the console for debugging without user interruption
      console.warn('[BlinkDetection suppressed alert]', msg);
    };
    silentAlertRef.current = silentAlert;
    window.alert = silentAlert;

    return () => {
      if (window.alert === silentAlertRef.current) {
        window.alert = originalAlert;
      }
      silentAlertRef.current = null;
    };
  }, [isRouteEnabled]);

  const getEyeAspectRatio = (landmarks) => {
    const [v1, v2] = [
      Math.abs(landmarks[1].y - landmarks[5].y),
      Math.abs(landmarks[2].y - landmarks[4].y)
    ];
    const h = Math.abs(landmarks[0].x - landmarks[3].x);
    return h !== 0 ? (v1 + v2) / (2 * h) : 0;
  };

  useEffect(() => {
    // Don't initialize if not on an enabled route
    if (!isActive || !canvasRef.current || !videoRef.current) {
      return () => { };
    }

    let mounted = true;
    let initialized = false;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    const initializeFaceMesh = async () => {
      try {
        if (!mounted || initialized) return;
        initialized = true;

        // Start camera immediately
        cameraRef.current = new Camera(video, {
          onFrame: async () => {
            if (faceMeshRef.current && mounted) {
              await faceMeshRef.current.send({ image: video });
            }
          },
          width: window.innerWidth,
          height: window.innerHeight,
        });

        try {
          await cameraRef.current.start();
        } catch (err) {
          if (mounted) {
            setIsBlocked(true);
          }
          return;
        }

        // Initialize FaceMesh in parallel
        faceMeshRef.current = new FaceMesh({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`;
          }
        });

        await faceMeshRef.current.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7,
        });

        if (mounted) {
          setIsInitialized(true);
        }

        faceMeshRef.current.onResults((results) => {
          if (!mounted) return;

          try {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (results.multiFaceLandmarks && results.multiFaceLandmarks[0]) {
              const landmarks = results.multiFaceLandmarks[0];

              const alpha = 0.25;
              const drawingStyles = {
                faceOval: { color: `rgba(0, 0, 0, ${alpha})`, lineWidth: 0.5 },
                eyes: { color: `rgba(0, 0, 0, ${alpha})`, lineWidth: 0.5 },
                lips: { color: `rgba(0, 0, 0, ${alpha})`, lineWidth: 0.5 },
                tesselation: { color: `rgba(0, 0, 0, ${alpha})`, lineWidth: 0.5 }
              };

              drawConnectors(ctx, landmarks, FaceMeshConnections.FACEMESH_TESSELATION, drawingStyles.tesselation);
              drawConnectors(ctx, landmarks, FaceMeshConnections.FACEMESH_RIGHT_EYE, drawingStyles.eyes);
              drawConnectors(ctx, landmarks, FaceMeshConnections.FACEMESH_LEFT_EYE, drawingStyles.eyes);
              drawConnectors(ctx, landmarks, FaceMeshConnections.FACEMESH_FACE_OVAL, drawingStyles.faceOval);
              drawConnectors(ctx, landmarks, FaceMeshConnections.FACEMESH_LIPS, drawingStyles.lips);

              drawLandmarks(ctx, landmarks, {
                color: 'rgba(0, 0, 0, 0.02)',
                lineWidth: 0.1,
                radius: 0.3,
              });

              // Calculate EAR for both eyes
              const leftEAR = getEyeAspectRatio([
                landmarks[362], landmarks[385], landmarks[387],
                landmarks[263], landmarks[373], landmarks[380]
              ]);

              const rightEAR = getEyeAspectRatio([
                landmarks[33], landmarks[160], landmarks[158],
                landmarks[133], landmarks[153], landmarks[144]
              ]);

              const avgEAR = (leftEAR + rightEAR) / 2;

              // Update baseline during initial calibration
              if (framesCountRef.current < INITIAL_CALIBRATION_FRAMES) {
                baselineEAR.current = (baselineEAR.current * framesCountRef.current + avgEAR) /
                  (framesCountRef.current + 1);
                framesCountRef.current++;
              }

              // Smooth EAR values
              earHistoryRef.current.push(avgEAR);
              if (earHistoryRef.current.length > EAR_SMOOTHING_WINDOW) {
                earHistoryRef.current.shift();
              }
              const smoothedEAR = earHistoryRef.current.reduce((a, b) => a + b, 0) / earHistoryRef.current.length;

              // Dynamic threshold
              const currentThreshold = baselineEAR.current * EAR_THRESHOLD_RATIO;
              const currentTime = Date.now();

              // Blink detection
              if (smoothedEAR < currentThreshold) {
                if (!wasBlinkingRef.current) {
                  blinkStartTimeRef.current = currentTime;
                  wasBlinkingRef.current = true;
                }
              } else {
                if (wasBlinkingRef.current) {
                  const blinkDuration = currentTime - blinkStartTimeRef.current;
                  const timeSinceLastBlink = currentTime - lastBlinkTimeRef.current;

                  if (blinkDuration >= MIN_BLINK_DURATION && timeSinceLastBlink >= MIN_TIME_BETWEEN_BLINKS) {
                    handleBlinkRef.current();
                    lastBlinkTimeRef.current = currentTime;
                  }

                  wasBlinkingRef.current = false;
                }
              }
            }

            ctx.restore();
          } catch (error) {
            console.error('Error in onResults:', error);
          }
        });

      } catch (error) {
        // Swallow permission/availability errors quietly so the UI doesn't show noisy logs
        const isPermissionIssue = error?.name === 'NotAllowedError' || error?.message?.toLowerCase().includes('permission');
        if (mounted && isPermissionIssue) {
          setIsBlocked(true);
          return;
        }
        console.error('Error initializing face mesh:', error);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Start initialization immediately
    initializeFaceMesh();

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);

      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }

      if (faceMeshRef.current) {
        try {
          faceMeshRef.current.close();
        } catch (error) {
          console.error('Error closing face mesh:', error);
        }
        faceMeshRef.current = null;
      }
    };
  }, [isActive]);

  // If the current route isn't enabled, don't render anything
  if (!isActive) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        ...style
      }}
    >
      <div style={{
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 1000,
        color: 'black',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '5px'
      }}>
        Blinks: {blinkCount}
      </div>
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: isInitialized ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

export default MinimalBlinkDetection;
