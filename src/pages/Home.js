import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Sketch from '../components/Sketch';
import FloatingImages from '../components/FloatingImages';
import { projectData } from '../data/projectData';
import { mainPortfolioConfig } from '../data/mainPortfolioData';

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
  flex: 1;
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
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0 10px;
    margin-bottom: 5px;
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
`;

const ProjectTools = styled.div`
  margin-top: 14px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 9px;
  line-height: 1.3;
  color: #3a3a3a;

  @media screen and (max-width: 768px) {
    font-size: 8px;
  }
`;

const MetaSeparator = styled.span`
  width: 14px;
  height: 1px;
  background-color: #000;
  display: inline-block;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  flex-shrink: 0;
  border-top: 1px solid black;
  height: 44px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 10px;
    padding: 10px 15px;
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
    transform: skew(20deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const ContactLink = styled.a`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: lowercase;
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

function Home() {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [imageCache, setImageCache] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  const artProjects = projectData.art.projects;
  const workProjects = projectData.work.projects;

  // Preload and cache image paths for all projects
  useEffect(() => {
    const allProjects = [...artProjects, ...workProjects];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'tif'];

    allProjects.forEach(project => {
      const projectId = project.link.split('/').pop();

      const tryLoadImage = (index = 0) => {
        if (index >= imageExtensions.length) {
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
          tryLoadImage(index + 1);
        };
        img.src = imagePath;
      };

      tryLoadImage();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProjectHover = (projectLink) => {
    const projectId = projectLink.split('/').pop();
    setHoveredProjectId(projectId);
  };

  const handleProjectLeave = () => {
    setHoveredProjectId(null);
  };

  const filteredArt = activeFilter === 'all'
    ? artProjects
    : artProjects.filter(p => p.tags && p.tags.includes(activeFilter));

  const filteredWork = activeFilter === 'all'
    ? workProjects
    : workProjects.filter(p => p.tags && p.tags.includes(activeFilter));

  const formatTools = (project) => {
    const tools = project.infoPopup?.tools;
    if (!tools) return null;

    const formatted = tools
      .split('&')
      .map((tool) => tool.trim())
      .filter(Boolean)
      .join(' · ');

    return formatted ? `[${formatted}]` : null;
  };

  const floatingImages = useMemo(() => (
    [...filteredArt, ...filteredWork]
      .map((project) => {
        const projectId = project.link.split('/').pop();
        return {
          id: projectId,
          src: imageCache[projectId]
        };
      })
      .filter((image) => image.src)
  ), [filteredArt, filteredWork, imageCache]);

  const activeImageIds = useMemo(() => new Set([
    ...filteredArt.map(p => p.link.split('/').pop()),
    ...filteredWork.map(p => p.link.split('/').pop()),
  ]), [filteredArt, filteredWork]);

  return (
    <IndexContainer>
      <Sketch bottomBoundarySelector="footer" />
      <FloatingImages images={floatingImages} summonedId={hoveredProjectId} activeImageIds={activeImageIds} />
      <Header
        title="David Robert"
        subtitle1="Creative Technologist"
        subtitle2="& Interactive Systems Designer"
        hideBackButton={true}
        tags={mainPortfolioConfig.tags}
        activeFilter={activeFilter}
        onTagSelect={setActiveFilter}
      />

      <SplitContainer>
        <Side $left>
          <SideContent>
            <SideLabel>{mainPortfolioConfig.rightColumnLabel}</SideLabel>
            <ProjectList>
              {filteredWork.map((project, index) => (
                <Project key={project.id ?? index}>
                  <ProjectTitle
                    to={project.link}
                    onMouseEnter={() => handleProjectHover(project.link)}
                    onMouseLeave={handleProjectLeave}
                  >
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMeta>
                    {project.year && <span>{project.year}</span>}
                    {project.year && project.tags?.length ? <MetaSeparator /> : null}
                    {project.tags?.length ? <span>{project.tags.join(' · ')}</span> : null}
                  </ProjectMeta>
                  {formatTools(project) ? <ProjectTools>{formatTools(project)}</ProjectTools> : null}
                </Project>
              ))}
            </ProjectList>
          </SideContent>
        </Side>

        <Side>
          <SideContent>
            <SideLabel>{mainPortfolioConfig.leftColumnLabel}</SideLabel>
            <ProjectList>
              {filteredArt.map((project, index) => (
                <Project key={project.id ?? index}>
                  <ProjectTitle
                    to={project.link}
                    onMouseEnter={() => handleProjectHover(project.link)}
                    onMouseLeave={handleProjectLeave}
                  >
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMeta>
                    {project.year && <span>{project.year}</span>}
                    {project.year && project.tags?.length ? <MetaSeparator /> : null}
                    {project.tags?.length ? <span>{project.tags.join(' · ')}</span> : null}
                  </ProjectMeta>
                  {formatTools(project) ? <ProjectTools>{formatTools(project)}</ProjectTools> : null}
                </Project>
              ))}
            </ProjectList>
          </SideContent>
        </Side>
      </SplitContainer>

      <Footer>
        <FooterLink to="/about">About Me</FooterLink>
        <ResumeLink href="CV-DavidRobert.pdf" target="_blank" rel="noopener noreferrer">
          résumé
        </ResumeLink>
        <ContactLink href="mailto:david.connor.r@gmail.com">
          david.connor.r[at]gmail.com
        </ContactLink>
      </Footer>
    </IndexContainer>
  );
}

export default Home;
