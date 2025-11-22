import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9; // Match the home page background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.75s ease-in-out;
  font-family: 'Times New Roman', Times, serif;
`;

const OverlayContent = styled.div`
  text-align: center;
  color: black; // Changed to black to match your theme
  
  h1 {
    font-size: 20px; // Increased from 16px by ~25%
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: 5px;
    margin-left: 30px; // Added to match h2 alignment
  }
  
  h2 {
    font-size: 9px; // Increased from 7px by ~25%
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-weight: 400;
    margin-left: 30px; // Add the same left margin as your secondary subtitles
  }
  
  button {
    background: none;
    border: none;
    color: black;
    font-size: 13px; // Increased from 10px by ~25%
    text-transform: uppercase;
    cursor: help; // Changed to match your other interactive elements
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: transform 0.2s linear;
    opacity: ${props => props.isReady ? 1 : 0.5};
    pointer-events: ${props => props.isReady ? 'auto' : 'none'};
    
    &:hover {
      transform: skew(-20deg);
    }
  }
`;

const WelcomeOverlay = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Give MediaPipe a head start to initialize
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleEnter = () => {
    if (!isReady) return;
    setIsVisible(false);
    // Call onEnter after the fade animation completes
    setTimeout(() => {
      onEnter();
    }, 750);
  };
  
  return (
    <OverlayContainer isVisible={isVisible}>
      <OverlayContent isReady={isReady}>
        <h1>Welcome to my portfolio</h1>
        <h2>Please turn on your audio and enable your camera</h2>
        <button onClick={handleEnter}>~ENTER~</button>
      </OverlayContent>
    </OverlayContainer>
  );
};

export default WelcomeOverlay;