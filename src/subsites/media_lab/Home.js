import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Sketch from '../../components/Sketch';
import { mediaLabData } from './data';
import { media, spacing } from '../../styles/responsive';

const IndexContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Times New Roman', Times, serif;
  position: relative;

  @media screen and (min-width: 769px) {
    height: 100vh;
    overflow: hidden;
  }
`;

const SplitContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;

  @media screen and (min-width: 769px) {
    overflow: hidden;
  }

  ${media.downTablet} {
    flex-direction: column;
  }
`;

const Side = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  direction: ${props => props.$left ? 'rtl' : 'ltr'};
  min-width: 0;

  @media screen and (min-width: 769px) {
    overflow-y: auto;
    overflow-x: hidden;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 0;
  }

  ${media.downTablet} {
    direction: ltr;
    overflow: visible;
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

  ${media.downTablet} {
    position: static;
    font-size: 11px;
    padding: 10px ${spacing.pageX};
    text-align: left;
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
  min-height: 180px;
  padding: ${spacing.cardPadding} 0;

  &:last-child {
    border-bottom: none;
  }

  ${media.downTablet} {
    width: 100%;
    min-height: 0;
    align-items: flex-start;
    text-align: left;
    padding: ${spacing.cardPadding} ${spacing.pageX};
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

  ${media.downTablet} {
    font-size: 20px;
    max-width: 100%;
    margin-bottom: 10px;
    padding-bottom: 5px;
    margin-left: 0;
    margin-right: 0;
  }
`;

const ProjectDescription = styled.p`
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 1px;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 8px;

  ${media.downTablet} {
    font-size: 12px;
    padding: 0;
    margin-bottom: 10px;
    text-align: left;
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
  background-image: url(${props => props.$image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid black;

  ${media.downTablet} {
    width: 70vw;
    height: 40vh;
  }
`;

const ProjectMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 10px;
  color: #3a3a3a;
  margin-top: 4px;
  justify-content: center;
  flex-wrap: wrap;

  ${media.downTablet} {
    justify-content: flex-start;
  }
`;

const MetaSeparator = styled.span`
  width: 14px;
  height: 1px;
  background-color: #000;
  display: inline-block;
`;

function MediaLabHome() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageCache, setImageCache] = useState({});
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  // Split projects into professional and personal
  const personalProjects = mediaLabData.projects.filter(p => p.personal === true);
  const professionalProjects = mediaLabData.projects.filter(p => p.personal !== true);

  // Preload and cache image paths for all projects
  useEffect(() => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'tif'];

    mediaLabData.projects.forEach(project => {
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProjectHover = (projectLink) => {
    if (isMobile) {
      return;
    }
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
      {!isMobile && <ImagePreview $visible={hoveredImage !== null} $image={hoveredImage} />}
      <Header
        title="David Robert"
        subtitle1="Critical Technologist"
        subtitle2="& Interactive Systems Designer"
        hideBackButton={true}
        statement="
        Thanks for coming by!
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
                    onMouseEnter={!isMobile ? () => handleProjectHover(project.originalLink) : undefined}
                    onMouseLeave={!isMobile ? handleProjectLeave : undefined}
                  >
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMeta>
                    {project.year && <span>{project.year}</span>}
                    {project.year && project.tags?.length ? <MetaSeparator /> : null}
                    {project.tags?.length ? <span>{project.tags.join(' · ')}</span> : null}
                  </ProjectMeta>
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
                    onMouseEnter={!isMobile ? () => handleProjectHover(project.originalLink) : undefined}
                    onMouseLeave={!isMobile ? handleProjectLeave : undefined}
                  >
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMeta>
                    {project.year && <span>{project.year}</span>}
                    {project.year && project.tags?.length ? <MetaSeparator /> : null}
                    {project.tags?.length ? <span>{project.tags.join(' · ')}</span> : null}
                  </ProjectMeta>
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
