import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Sketch = ({ bottomBoundarySelector }) => {
  const sketchContainerRef = useRef();

  useEffect(() => {
    let canvas = null;
    let p5Instance = null;

    const getHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      return headerElement ? headerElement.offsetHeight : 0;
    };

    const getBottomBoundary = () => {
      if (!bottomBoundarySelector) {
        return window.innerHeight;
      }

      const boundaryElement = document.querySelector(bottomBoundarySelector);
      return boundaryElement ? boundaryElement.getBoundingClientRect().top : window.innerHeight;
    };

    const sketch = (p) => {
      let pillarPoints = [];
      let previousPoint = null;
      let xRatio = null;
      let yPos = 0;
      let direction = 1;
      const strokeWeight = 0.6;
      let headerHeight = getHeaderHeight();
      let bottomBoundary = getBottomBoundary();

      const getDrawableHeight = () => {
        const drawableHeight = bottomBoundary - headerHeight;
        return drawableHeight > 0 ? drawableHeight : 1;
      };

      const getNormalizedY = (y) => {
        return p.constrain((y - headerHeight) / getDrawableHeight(), 0, 1);
      };

      const denormalizePoint = (point) => {
        const centerBandHalfWidth = 40;
        return {
          x: p.map(
            point.xRatio,
            0,
            1,
            p.width * 0.5 - centerBandHalfWidth,
            p.width * 0.5 + centerBandHalfWidth
          ),
          y: headerHeight + point.yRatio * getDrawableHeight()
        };
      };

      const drawSegment = (fromPoint, toPoint) => {
        p.strokeWeight(strokeWeight);
        p.stroke(0);
        p.line(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y);
      };

      const redrawPillar = () => {
        p.clear();

        if (pillarPoints.length < 2) {
          return;
        }

        for (let i = 1; i < pillarPoints.length; i += 1) {
          drawSegment(denormalizePoint(pillarPoints[i - 1]), denormalizePoint(pillarPoints[i]));
        }
      };

      const refreshBounds = () => {
        headerHeight = getHeaderHeight();
        bottomBoundary = getBottomBoundary();
        yPos = p.constrain(yPos, headerHeight, bottomBoundary);
      };

      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '2');
        refreshBounds();
        p.clear();
        yPos = headerHeight;
      };

      p.draw = () => {
        if (xRatio === null) return;

        refreshBounds();

        yPos += direction;

        if (yPos > bottomBoundary) {
          direction *= -1;
          yPos = bottomBoundary;
        } else if (yPos < headerHeight) {
          direction *= -1;
          yPos = headerHeight;
        }

        const smoothedX = p.lerp(p.pmouseX, p.mouseX, 0.25);
        const currentPoint = {
          xRatio: p.constrain(smoothedX / p.width, 0, 1),
          yRatio: getNormalizedY(yPos)
        };

        pillarPoints.push(currentPoint);

        if (previousPoint) {
          drawSegment(denormalizePoint(previousPoint), denormalizePoint(currentPoint));
        }

        previousPoint = currentPoint;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        refreshBounds();
        redrawPillar();
      };

      p.mouseMoved = () => {
        if (xRatio === null) {
          xRatio = p.constrain(p.mouseX / p.width, 0, 1);
          previousPoint = {
            xRatio,
            yRatio: getNormalizedY(yPos)
          };
        }
      };
    };

    p5Instance = new p5(sketch, sketchContainerRef.current);

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      } else if (canvas) {
        canvas.remove();
      }
    };
  }, [bottomBoundarySelector]);

  return (
    <div 
      ref={sketchContainerRef} 
      style={{ 
        position: 'absolute', 
        overflow: 'hidden', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 11, 
        pointerEvents: 'none' 
      }} 
    />
  );
};

export default Sketch;
