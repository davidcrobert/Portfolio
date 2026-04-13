import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import FloatingImages from '../components/FloatingImages';
import { projectData } from '../data/projectData';
import { mainPortfolioConfig } from '../data/mainPortfolioData';
import { media, spacing } from '../styles/responsive';

const IndexContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Times New Roman', Times, serif;
  position: relative;
`;

const SplitContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: stretch;

  ${media.downTablet} {
    flex-direction: column;
    gap: 0;
  }
`;

const Side = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  direction: ${props => props.$left ? 'rtl' : 'ltr'};
  min-width: 0;

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
  padding: 12px ${spacing.pageX};
  flex-shrink: 0;
  border-top: 1px solid black;
  min-height: 56px;

  ${media.downTablet} {
    flex-direction: column;
    height: auto;
    gap: 10px;
    align-items: flex-start;
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

  ${media.downTablet} {
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

  ${media.downTablet} {
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

  ${media.downTablet} {
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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

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
    setHoveredProjectId(projectId);
  };

  const handleProjectLeave = () => {
    setHoveredProjectId(null);
  };

  const filteredArt = useMemo(() => (
    activeFilter === 'all'
      ? artProjects
      : artProjects.filter(p => p.tags && p.tags.includes(activeFilter))
  ), [activeFilter, artProjects]);

  const filteredWork = useMemo(() => (
    activeFilter === 'all'
      ? workProjects
      : workProjects.filter(p => p.tags && p.tags.includes(activeFilter))
  ), [activeFilter, workProjects]);

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

  const floatingImages = useMemo(() =>
    Object.entries(imageCache)
      .filter(([, src]) => src)
      .map(([id, src]) => ({ id, src })),
    [imageCache]
  );

  const activeImageIds = useMemo(() => new Set([
    ...filteredArt.map(p => p.link.split('/').pop()),
    ...filteredWork.map(p => p.link.split('/').pop()),
  ]), [filteredArt, filteredWork]);

  return (
    <IndexContainer>
      {/* <Sketch bottomBoundarySelector="footer" /> */}
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
                    onMouseEnter={!isMobile ? () => handleProjectHover(project.link) : undefined}
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
                    onMouseEnter={!isMobile ? () => handleProjectHover(project.link) : undefined}
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
