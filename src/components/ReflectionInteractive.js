import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const ReflectionInteractive = ({ width, height }) => {
  const sketchRef = useRef();
  // console.log(width, height); // Debugging statement to verify props
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const scaleMultiplier = 0.75;
  width = screenWidth * scaleMultiplier;
  height = screenHeight * scaleMultiplier;

  useEffect(() => {
    const sketch = (p) => {
      let texts = [
        "MOVE YOUR MOUSE", "THROW YOUR VOICE", 'TEACH YOUR SELF', "HUG YOUR YOUNG", 
        "ENJOY YOUR WORRIES", "HOLD YOUR NOSE", "FORGET YOUR FACE", "WATCH YOUR TONGUE", 
        "MASH YOUR TEETH", "ASK YOUR REFLECTION ITS NAME", "QUIT YOUR WHINING", 
        "SCREAM YOUR WORDS", "DROP YOUR THOUGHTS", "UNCLENCH YOUR FIST", "THROW YOUR VOICE", 
        "DIM YOUR LIGHTS", "BEG YOUR GOD", "CLOSE YOUR EYES", "WASH YOUR WORRIES", 
        "I ASKED MY REFLECTION ITS NAME AGAIN"
      ];

      const font = "Times New Roman";
      const baseCreateFrequency = 2000;
      const fastestAdd = 200;
      const startTime = 5000;
      const maxCursors = 130;
      const order = 3;

      let movements = [];
      let ngrams = {};
      let cursor;
      let recorder = [];
      let middleText;
      let lastTimeCreated = 0;
      let beginTime = 0;
      let cursorMade = false;

      p.preload = () => {
        cursor = p.loadImage(
          "https://cdn.glitch.com/edc62a79-8d78-45a8-90a2-ee7203b43e3e%2Fcursor.png?v=1606717695408"
        );
      };

      p.setup = () => {
        let canvas = p.createCanvas(width, height);
        cursor.resize(13, 15);
        p.noCursor();
        p.textFont(font);
        p.textSize(width / 80);
        p.textAlign(p.CENTER);

        canvas.style("transform", `translate(15%, 10%)`);
        canvas.style("border", "1px solid black");
        // canvas.style("transform", `translate(-${(45 * scaleMultiplier) / 2}%, 10%)`);
      };

      p.windowResized = () => {
        p.resizeCanvas(width, height);
        p.textSize(width / 90);
      };

      p.draw = () => {
        let textChoice = p.map(recorder.length, 0, maxCursors, 0, texts.length - 1);
        textChoice = p.floor(textChoice);
        middleText = beginTime !== 0 ? texts[textChoice] : "CLICK YOUR MOUSE";

        p.background(255);
        p.fill("black");

        let countDown = p.ceil((startTime + beginTime - p.millis()) / 1000);
        if (beginTime !== 0 && countDown > 0)
          p.text(middleText + " - " + countDown, p.width / 2, p.height / 2);
        else
          p.text(middleText, p.width / 2, p.height / 2);

        p.image(cursor, p.mouseX, p.mouseY);

        if (beginTime > 0) {
          let movement = p.createVector(
            p.round(p.mouseX - p.pmouseX),
            p.round(p.mouseY - p.pmouseY)
          );

          if (p.mouseX > 0 && p.mouseY > 0 && p.mouseX < p.width && p.mouseY < p.height) {
            movements.push(movement);

            if (movements.length > order) {
              let gram = [];
              p.arrayCopy(movements, movements.length - order - 1, gram, 0, order);

              if (!ngrams[gram]) {
                ngrams[gram] = [];
              }
              let nextMove = movements[movements.length - 1];
              ngrams[gram].push(nextMove);
            }
          }

          let currentTime = p.millis() - beginTime;

          if (currentTime >= startTime) {
            if (cursorMade === false && recorder.length <= maxCursors) {
              let falseCursor = {
                current: p.random(Object.keys(ngrams)),
                position: p.createVector(p.mouseX, p.mouseY)
              };
              lastTimeCreated = currentTime;
              recorder.push(falseCursor);
              cursorMade = true;
            } else {
              for (let falseCursor of recorder) {
                if (p.frameCount % 2 === 0) {
                  markov(falseCursor);
                  borderCheck(falseCursor);
                }
                p.image(cursor, falseCursor.position.x, falseCursor.position.y);
              }
            }

            let intervalTime = p.map(recorder.length, 1, maxCursors, baseCreateFrequency, fastestAdd);
            if (currentTime > lastTimeCreated + intervalTime) cursorMade = false;

            while (movements.length > order * 10) movements.shift();
          }
        }
      };

      function markov(falseCursor) {
        let possibilities = ngrams[falseCursor.current];

        while (!possibilities) {
          falseCursor.current = p.random(Object.keys(ngrams));
          possibilities = ngrams[falseCursor.current];
        }

        let next = p.random(possibilities);
        falseCursor.position = p5.Vector.add(falseCursor.position, next);

        let result = falseCursor.current + "," + next;

        let sliceStart;
        for (let i = 1; i < result.length; i++) {
          if (result[i] === "p") {
            sliceStart = i;
            break;
          }
        }
        result = result.slice(sliceStart, result.length);
        falseCursor.current = result;
      }

      function borderCheck(falseCursor) {
        if (falseCursor.position.x < 0 - cursor.width) falseCursor.position.x = p.width;
        if (falseCursor.position.x > p.width) falseCursor.position.x = 0 - cursor.width;
        if (falseCursor.position.y < 0 - cursor.height) falseCursor.position.y = p.height;
        if (falseCursor.position.y > p.height) falseCursor.position.y = 0 - cursor.height;
      }

      p.mouseClicked = () => {
        if (beginTime === 0) {
          beginTime = p.millis();
        }
      };
    };

    const sketchInstance = new p5(sketch, sketchRef.current);

    return () => {
      sketchInstance.remove();
    };
  }, [width, height]);

  return <div ref={sketchRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default ReflectionInteractive;
