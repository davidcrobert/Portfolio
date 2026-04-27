import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import parse from 'html-react-parser';
import Header from './Header';
import { projectData } from '../data/projectData';
import { getProjectMediaEmbed } from '../data/projectMedia';
import { media, spacing } from '../styles/responsive';

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const MainContent = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
`;

const ProjectContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 0;
  padding: ${spacing.pageY} ${spacing.pageX} 48px;
  transition: filter 0.75s ease-in-out;

  ${props => props.blurred && css`
    filter: blur(5px);
  `}

  ${media.downTablet} {
    padding-bottom: 24px;
  }
`;

const ProjectFlow = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  ${media.downTablet} {
    align-items: stretch;
    gap: 20px;
  }
`;

const MediaEmbed = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
    z-index: 101;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media screen and (min-width: 769px) {
    width: 65vw;

    &:has(> iframe:only-child) {
      height: 0;
      padding-bottom: 36.5625vw;
      position: relative;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    > div iframe {
      position: static;
      width: 100%;
      height: auto;
    }
  }

  ${media.downTablet} {
    iframe {
      max-height: none;
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const InfoPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1001;
  padding: 20px;
  overflow-y: auto;
  color: white;
  opacity: 0;
  animation: ${fadeIn} 0.75s ease-in-out forwards;

  &.fadeOut {
    animation: ${fadeOut} 0.75s ease-in-out forwards;
  }

  &::-webkit-scrollbar {
    width: 2px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f9f9f9;
    border-radius: 20px;
    border: transparent;
  }

  ${media.downTablet} {
    top: auto;
    left: 0;
    bottom: 0;
    transform: none;
    width: 100%;
    height: min(72vh, 640px);
    padding: 18px ${spacing.pageX} 24px;
  }
`;

const MobileInfoPanel = styled.section`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 20px ${spacing.pageX} 24px;
  border: 1px solid black;
  background-color: #111;
  color: #f9f9f9;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
  font-family: 'Times New Roman', Times, serif;
`;

const InfoHeader = styled.h3`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: #f9f9f9;
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f9f9f9;

  ${media.downTablet} {
    font-size: 20px;
  }
`;

const MainStatement = styled.h2`
  font-size: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 400;
  color: #f9f9f9;

  ${media.downTablet} {
    font-size: 18px;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: #f9f9f9;
  font-weight: 600;
  font-style: italic;
  cursor: help;
`;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const cleanYouTubeEmbed = (embedCode) => {
  if (!embedCode.includes('youtube.com/embed/')) {
    return embedCode;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(embedCode, 'text/html');
  const iframes = doc.querySelectorAll('iframe');

  if (iframes.length > 0) {
    iframes.forEach(iframe => {
      let src = iframe.getAttribute('src');
      src = src.includes('?') ? `${src}&` : `${src}?`;
      src += 'controls=1&iv_load_policy=3&rel=0';
      iframe.setAttribute('src', src);
    });

    return doc.body.innerHTML;
  }

  return embedCode;
};

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoPopupRef = useRef(null);
  const [project, setProject] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const findProjectAndCategory = async () => {
      try {
        const { mainPortfolioConfig } = await import('../data/mainPortfolioData');
        if (mainPortfolioConfig.customProjectPages?.[projectId]) {
          const customPageModule = await mainPortfolioConfig.customProjectPages[projectId]();
          const CustomPageComponent = customPageModule.default;

          for (const category in projectData) {
            const foundProject = projectData[category].projects.find(
              entry => entry.link === `/projects/${projectId}`
            );
            if (foundProject) {
              setProject({ customPageComponent: CustomPageComponent, ...foundProject });
              setCategoryData(projectData[category]);
              return;
            }
          }
        }
      } catch (error) {
        console.error(`Failed to load custom project page for ${projectId}:`, error);
      }

      for (const category in projectData) {
        const foundProject = projectData[category].projects.find(
          entry => entry.link === `/projects/${projectId}`
        );
        if (foundProject) {
          setProject(foundProject);
          setCategoryData(projectData[category]);
          return;
        }
      }

      navigate('/404');
    };

    findProjectAndCategory();
  }, [projectId, navigate]);

  const toggleInfo = useCallback(() => {
    setIsInfoOpen(prev => !prev);
  }, []);

  const closeInfoPopup = useCallback(() => {
    const infoPopup = infoPopupRef.current;
    if (infoPopup) {
      infoPopup.classList.add('fadeOut');
      setTimeout(() => {
        setIsInfoOpen(false);
      }, 750);
    }
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isInfoOpen) {
        closeInfoPopup();
      }
    };

    const handleOutsideClick = (event) => {
      if (infoPopupRef.current && !infoPopupRef.current.contains(event.target) && isInfoOpen) {
        closeInfoPopup();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isInfoOpen, closeInfoPopup]);

  if (!project || !categoryData) {
    return null;
  }

  if (project.customPageComponent) {
    const CustomPageComponent = project.customPageComponent;
    return <CustomPageComponent project={project} />;
  }

  const mediaEmbed = getProjectMediaEmbed(project);
  const projectInfo = project.infoPopup || null;
  const hasInfoContent = Boolean(
    projectInfo?.main ||
    projectInfo?.context ||
    projectInfo?.tech ||
    projectInfo?.tools
  );

  const renderContent = (content) => {
    const options = {
      replace: (domNode) => {
        if (domNode.name === 'a') {
          return (
            <ExternalLink
              href={domNode.attribs.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {domNode.children[0].data}
            </ExternalLink>
          );
        }
      }
    };

    return parse(content, options);
  };

  return (
    <PageWrapper>
      <MainContent>
        <Header
          title={`${categoryData.title}/ ${project.title}`}
          subtitle1={project.subtitle1}
          subtitle2={project.subtitle2}
          year={project.year}
          backLink="/"
          showInfoButton={hasInfoContent}
          onInfoClick={toggleInfo}
          isInfoOpen={isInfoOpen}
        />

        <ProjectContent blurred={isInfoOpen && !isMobile}>
          <ProjectFlow>
            {mediaEmbed && (
              <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(mediaEmbed) }} />
            )}

            {isMobile && isInfoOpen && hasInfoContent && (
              <MobileInfoPanel>
                {projectInfo?.main && (
                  <MainStatement>{projectInfo.main}</MainStatement>
                )}
                {projectInfo?.context && (
                  <InfoSection>
                    <InfoHeader>Context</InfoHeader>
                    <div>{renderContent(projectInfo.context)}</div>
                  </InfoSection>
                )}
                {projectInfo?.tech && (
                  <InfoSection>
                    <InfoHeader>Tech</InfoHeader>
                    <div>{renderContent(projectInfo.tech)}</div>
                  </InfoSection>
                )}
                {projectInfo?.tools && (
                  <InfoSection>
                    <InfoHeader>{projectInfo.tools}</InfoHeader>
                  </InfoSection>
                )}
              </MobileInfoPanel>
            )}
          </ProjectFlow>
        </ProjectContent>
      </MainContent>

      {isInfoOpen && !isMobile && hasInfoContent && (
        <InfoPopup ref={infoPopupRef}>
          {projectInfo?.main && (
            <MainStatement>{projectInfo.main}</MainStatement>
          )}
          {projectInfo?.context && (
            <InfoSection>
              <InfoHeader>Context</InfoHeader>
              <div>{renderContent(projectInfo.context)}</div>
            </InfoSection>
          )}
          {projectInfo?.tech && (
            <InfoSection>
              <InfoHeader>Tech</InfoHeader>
              <div>{renderContent(projectInfo.tech)}</div>
            </InfoSection>
          )}
          {projectInfo?.tools && (
            <InfoSection>
              <InfoHeader>{projectInfo.tools}</InfoHeader>
            </InfoSection>
          )}
        </InfoPopup>
      )}
    </PageWrapper>
  );
};

export default ProjectPage;
