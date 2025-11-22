import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Sketch from '../../components/Sketch';
import { mediaLabData } from './data';

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
  max-width: 100%;

  &:hover {
    cursor: help;
    transform: rotateX(35deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    max-width: 80%;
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
  width: 50vw;
  height: 50vh;
  z-index: 5;
  pointer-events: none;
  opacity: ${props => props.$visible ? 0.8 : 0};
  /*transition: opacity 0.3s ease-in-out;*/
  background-image: url(${props => props.$image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 768px) {
    width: 70vw;
    height: 40vh;
  }
`;

function MediaLabHome() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageCache, setImageCache] = useState({});

  // Split projects into professional and personal
  const personalProjects = mediaLabData.projects.filter(p => p.personal === true);
  const professionalProjects = mediaLabData.projects.filter(p => p.personal !== true);

  // Preload and cache image paths for all projects
  useEffect(() => {
    const allProjects = [...professionalProjects, ...personalProjects];
    const imageExtensions = ['jpg', 'jpeg', 'png'];

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

  return (
    <IndexContainer>
      <Sketch />
      <ImagePreview $visible={hoveredImage !== null} $image={hoveredImage} />
      <Header
        title="David Robert"
        subtitle1="Critical Technologist"
        subtitle2="& Interactive Designer"
        hideBackButton={true}
        statement="
        Our constructed environment is valuable & vulnerable.
        I deal a lot with interactive spaces & how we relate to each other in them.
        I have a lot of thoughts [& concerns] about the body, social interaction, & embodied social interactions 
        in the age of AI.
        "
        showAnimatedText={true}
      />

      <SplitContainer>
        <Side $left>
          <SideContent>
            <SideLabel $left>Personal</SideLabel>
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
            <SideLabel>Professional</SideLabel>
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
    </IndexContainer>
  );
}

export default MediaLabHome;
