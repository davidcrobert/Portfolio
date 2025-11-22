import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Sketch from '../components/Sketch';
import Header from '../components/Header';
import NotePlayer from '../components/NotePlayer';
import MinimalBlinkDetection from '../components/BlinkDetection';
import WelcomeOverlay from '../components/WelcomeOverlay';

const IndexContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Times New Roman', Times, serif;
  overflow: hidden;
  position: relative;
`;

const Nav = styled.nav`
  margin: 0;
  margin-top: -35px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  row-gap: 25px;
  align-content: center;
  justify-content: center;
  text-align: center;
  gap: 280px; // Adjusted gap for three items

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    gap: 30px;
  }
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: transform 0.2s linear;
  margin: 15px;

  &:hover {
    cursor: help;
    transform: rotateX(50deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin: 10px;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  margin-bottom: 0;
  position: relative;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
  }
`;

const FooterLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: transform 0.2s linear;

  &:hover {
    cursor: help;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const ContactLink = styled.a`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: lowercase;
  padding-bottom: 20px;
  color: black;
  text-decoration: none;
  font-size: 20px;
  transition: transform 0.2s linear;

  &:hover {
    cursor: help;
    transform: skew(-20deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    padding-bottom: 0;
  }
`;

const LeftSkew = styled(FooterLink)`
  &:hover {
    transform: skew(20deg);
  }
`;

const ResumeLink = styled.a`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: black;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: transform 0.2s linear;

  &:hover {
    cursor: help;
    transform: translateX(-50%) rotateX(50deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    position: static;
    transform: none;
    
    &:hover {
      transform: rotateX(50deg);
    }
  }
`;

// New styled component for the BLINK message
const BlinkMessage = styled.div`
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 10px;
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease-out;
  animation: pulse 2s infinite;
  height: 36px; /* Fixed height to prevent layout shifts */
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin-top: 5px;
    height: 30px; /* Adjusted height for mobile */
  }
`;

function Home() {
  const [playNoteTrigger, setPlayNoteTrigger] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [initialVisit, setInitialVisit] = useState(false);
  // Add a state to track the number of blinks
  const [blinkCount, setBlinkCount] = useState(0);

  // Check if this is the first visit when component mounts
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedPortfolio');
    if (!hasVisited) {
      setShowOverlay(true);
      setInitialVisit(true);
    }
  }, []);

  const handleBlink = () => {
    setPlayNoteTrigger(prev => prev + 1);
    // Increment the blink count
    setBlinkCount(prev => prev + 1);
  };

  const handleClick = () => {
    setPlayNoteTrigger(prev => prev + 1);
  };

  const handleOverlayEnter = () => {
    setShowOverlay(false);
    // Mark as visited in sessionStorage
    sessionStorage.setItem('hasVisitedPortfolio', 'true');
    // Trigger the first note play when overlay is dismissed
    setPlayNoteTrigger(prev => prev + 1);
  };

  return (
    <>
      {showOverlay && initialVisit && <WelcomeOverlay onEnter={handleOverlayEnter} />}
      <IndexContainer>
        {/* <Sketch /> */}
        <MinimalBlinkDetection onBlink={handleBlink} />
        <Header 
          title="David Robert"
          subtitle1="Creative technologist"
          subtitle2="& Interactive Designer"
        />
        
        {/* Always render the BLINK message but control visibility with props */}
        <BlinkMessage isVisible={1}>BLINK</BlinkMessage>
        
        <Nav>
          <NavLink to="/work">↳ Work</NavLink>
          {/* <NavLink to="/experiments" className="experiments">↓ Experiments</NavLink> */}
          <NavLink to="/art">↲ Art</NavLink>
        </Nav>

        <Footer>
          <LeftSkew to="/about">About Me</LeftSkew>
          <ResumeLink href="CV-DavidRobert.pdf" target="_blank" rel="noopener noreferrer">
            résumé
          </ResumeLink>
          <ContactLink 
            href="mailto:david.connor.r@gmail.com"
          >
            david.connor.r[at]gmail.com
          </ContactLink>
        </Footer>
        
        <NotePlayer play={showOverlay ? 0 : playNoteTrigger} />
      </IndexContainer>
    </>
  );
}

export default Home;