import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Sketch = () => {
  const sketchContainerRef = useRef();

  useEffect(() => {
    let canvas = null;
    const headerHeight = document.querySelector('header').offsetHeight;

    const sketch = (p) => {
      let pillarPoints = [];
      let highestY;
      let previousPoint = null;
      let xPos = null;
      let yPos = headerHeight;
      let direction = 1;
      const strokeWeight = 0.6;

      p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '2');
        p.clear();
        highestY = p.height;
      };

      p.draw = () => {
        if (xPos === null) return;

        yPos += direction;
        highestY = p.max(yPos, highestY);

        if (yPos > p.height) {
          direction *= -1;
          yPos = p.height;
        } else if (yPos < headerHeight) {
          direction *= -1;
          yPos = headerHeight;
        }
        
        xPos = p.lerp(p.pmouseX, p.mouseX, 0.25);
        pillarPoints.push({ x: xPos, y: yPos });

        let mappedX = p.map(xPos, 0, p.width, p.width * 0.5 - 40, p.width * 0.5 + 40);
        let currentPoint = { x: mappedX, y: yPos };

        if (previousPoint) {
          p.strokeWeight(strokeWeight);
          p.stroke(0);
          p.line(currentPoint.x, currentPoint.y, previousPoint.x, previousPoint.y);
        }

        previousPoint = currentPoint;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        redrawPillar();
      };

      p.mouseMoved = () => {
        if (xPos === null) {
          xPos = p.mouseX;
        }
      };

      const redrawPillar = () => {
        p.strokeWeight(strokeWeight);
        p.stroke(0);
        pillarPoints.forEach(point => {
          let mappedX = p.map(point.x, 0, p.width, p.width * 0.5 - 40, p.width * 0.5 + 40);
          let mappedY = p.map(point.y, 0, highestY, 0, p.height);
          p.point(mappedX, mappedY);
        });
      };
    };

    new p5(sketch, sketchContainerRef.current);

    return () => {
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);

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
        zIndex: 2, 
        pointerEvents: 'none' 
      }} 
    />
  );
};

export default Sketch;
