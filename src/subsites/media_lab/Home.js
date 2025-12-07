import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Sketch from '../../components/Sketch';
import MinimalBlinkDetection from '../../components/BlinkDetection';
import NotePlayer from '../../components/NotePlayer';
import { mediaLabData } from './data';

// Toggle visual layer: set to 'face' for blink detector or 'sketch' for the animated line
const VISUAL_MODE = 'face';

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

const SplitContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Side = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  direction: ${props => props.$left ? 'rtl' : 'ltr'};

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 0;
  }
`;

const SideContent = styled.div`
  direction: ltr;
`;

const SideLabel = styled.div`
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  padding: 8px;
  border-bottom: 1px solid black;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
  z-index: 10;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding: 6px;
  }
`;

const ProjectList = styled.section`
  display: flex;
  flex-direction: column;
`;

const Project = styled.section`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  position: relative;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(25vh);
  min-height: 150px;

  &:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    height: 25vh;
    min-height: 120px;
    padding: 10px 0;
  }
`;

const ProjectTitle = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 24px;
  display: inline-block;
  text-transform: uppercase;
  padding-bottom: 10px;
  border-bottom: 1px black solid;
  transition: transform 0.2s linear;
  margin-bottom: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;

  &:hover {
    cursor: help;
    transform: rotateX(35deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    max-width: 65%;
    margin-bottom: 10px;
    padding-bottom: 5px;
  }
`;

const ProjectDescription = styled.p`
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0 10px;
    margin-bottom: 5px;
  }
`;

const ProjectTags = styled.p`
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 10px;
  color: #777;
  font-style: italic;

  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`;

const ImagePreview = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 50vh;
  z-index: 5;
  pointer-events: none;
  opacity: ${props => props.$visible ? 0.8 : 0};
  /*transition: opacity 0.3s ease-in-out;*/
  background-image: url(${props => props.$image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 768px) {
    width: 70vw;
    height: 40vh;
  }
`;

const PortfolioButton = styled(Link)`
  position: fixed;
  top: 25px;
  right: 20px;
  padding: 6px 12px;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 1001;
  transition: transform 0.2s linear;

  &:hover {
    transform: skew(-10deg);
    cursor: help;
  }

  @media screen and (max-width: 768px) {
    top: 15px;
    right: 10px;
    padding: 5px 10px;
    font-size: 9px;
  }
`;

function MediaLabHome() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageCache, setImageCache] = useState({});
  const [playNoteTrigger, setPlayNoteTrigger] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [faceEnabled, setFaceEnabled] = useState(true);

  // Split projects into professional and personal
  const personalProjects = mediaLabData.projects.filter(p => p.personal === true);
  const professionalProjects = mediaLabData.projects.filter(p => p.personal !== true);

  // Preload and cache image paths for all projects
  useEffect(() => {
    const allProjects = [...professionalProjects, ...personalProjects];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'tif'];

    allProjects.forEach(project => {
      const projectId = project.originalLink.split('/').pop();

      // Try each extension in order
      const tryLoadImage = (index = 0) => {
        if (index >= imageExtensions.length) {
          // No image found for any extension
          setImageCache(prev => ({ ...prev, [projectId]: null }));
          return;
        }

        const ext = imageExtensions[index];
        const imagePath = `/images/projects/${projectId}.${ext}`;
        const img = new Image();

        img.onload = () => {
          setImageCache(prev => ({ ...prev, [projectId]: imagePath }));
        };

        img.onerror = () => {
          // Try next extension
          tryLoadImage(index + 1);
        };

        img.src = imagePath;
      };

      tryLoadImage();
    });
  }, []);

  const handleProjectHover = (projectLink) => {
    const projectId = projectLink.split('/').pop();
    // Use cached image path (will be null if no image exists)
    setHoveredImage(imageCache[projectId] || null);
  };

  const handleProjectLeave = () => {
    setHoveredImage(null);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mediaLabAudioEnabled');
      if (stored !== null) {
        setAudioEnabled(stored === 'true');
      }
      const storedFace = localStorage.getItem('mediaLabFaceEnabled');
      if (storedFace !== null) {
        setFaceEnabled(storedFace === 'true');
      }
    } catch (e) {
      // Ignore storage errors (e.g., privacy mode)
    }
  }, []);

  const handleBlink = () => {
    if (audioEnabled) {
      setPlayNoteTrigger(prev => prev + 1);
    }
  };

  const handleClick = () => {
    // Allow manual start in case the browser blocks autoplay
    if (audioEnabled) {
      setPlayNoteTrigger(prev => prev + 1);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('mediaLabAudioEnabled', String(next));
      } catch (e) {
        // Ignore storage errors
      }
      return next;
    });
  };

  const toggleFace = () => {
    setFaceEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('mediaLabFaceEnabled', String(next));
      } catch (e) {
        // Ignore storage errors
      }
      return next;
    });
  };

  return (
    <IndexContainer onClick={handleClick}>
      {VISUAL_MODE === 'face' ? (
        <MinimalBlinkDetection
          forceEnabled
          enabledRoutes={['/media_lab']}
          disabled={!faceEnabled}
          onBlink={handleBlink}
        />
      ) : (
        <Sketch />
      )}
      <ImagePreview $visible={hoveredImage !== null} $image={hoveredImage} />
      {/* <PortfolioButton to="/">View Whole Portfolio</PortfolioButton> */}
      <Header
        title="David Robert"
        subtitle1="Critical Technologist"
        subtitle2="& Interactive Designer"
        hideBackButton={true}
        customButtons={[
          {
            label: audioEnabled ? 'Blink Audio: On' : 'Blink Audio: Off',
            onClick: toggleAudio,
            title: 'Toggle audio playback'
          },
          {
            label: faceEnabled ? 'Face Tracking: On' : 'Face Tracking: Off',
            onClick: toggleFace,
            title: 'Toggle face tracking'
          }
        ]}
        statement="
        Our constructed environment is valuable & vulnerable.
        I deal a lot with interactive spaces & how we relate to each other in them.
        I have a lot of thoughts [& concerns] about the body, social interaction, & embodied social interactions
        in the age of AI.
        "
        showAnimatedText={false}
      />

      <SplitContainer>
        <Side $left>
          <SideContent>
            <SideLabel $left>Personal [Individual]</SideLabel>
            <ProjectList>
              {personalProjects.map((project, index) => (
                <Project key={index}>
                  <ProjectTitle
                    to={`/media_lab/projects/${project.originalLink.split('/').pop()}`}
                    onMouseEnter={() => handleProjectHover(project.originalLink)}
                    onMouseLeave={handleProjectLeave}
                  >
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </Project>
              ))}
            </ProjectList>
          </SideContent>
        </Side>

        <Side>
          <SideContent>
            <SideLabel>Professional [Group]</SideLabel>
            <ProjectList>
              {professionalProjects.map((project, index) => (
                <Project key={index}>
                  <ProjectTitle
                    to={`/media_lab/projects/${project.originalLink.split('/').pop()}`}
                    onMouseEnter={() => handleProjectHover(project.originalLink)}
                    onMouseLeave={handleProjectLeave}
                  >
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                </Project>
              ))}
            </ProjectList>
          </SideContent>
        </Side>
      </SplitContainer>
      <NotePlayer play={audioEnabled ? playNoteTrigger : 0} />
    </IndexContainer>
  );
}

export default MediaLabHome;
