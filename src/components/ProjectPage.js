import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import parse from 'html-react-parser';
import Header from './Header';
import { projectData } from '../data/projectData';
import ScavengeARMedia from './ScavengeARMedia';
import ReflectionInteractive from './ReflectionInteractive';

const customComponents = {
  ScavengeARMedia,
  ReflectionInteractive
};

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
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 20px;
  transition: filter 0.75s ease-in-out;
  
  ${props => props.blurred && css`
    filter: blur(5px);
  `}

  @media screen and (max-width: 768px) {
    padding: 10px;
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

  @media screen and (min-width: 769px) {
    width: 65vw;
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

  @media screen and (max-width: 768px) {
    iframe {
      max-height: 70vh;
      transform: translateY(-25%);
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

  @media screen and (max-width: 768px) {
    width: 90vw;
    height: 80vh;
    padding: 15px;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoHeader = styled.h3`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: #f9f9f9;
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f9f9f9;

  @media screen and (max-width: 768px) {
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

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: #f9f9f9;
  font-weight: 800;
  font-style: italic;
  cursor: help;
`;



const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoPopupRef = useRef(null);
  const [project, setProject] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const findProjectAndCategory = () => {
      for (const category in projectData) {
        const foundProject = projectData[category].projects.find(p => p.link === `/projects/${projectId}`);
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

  const CustomComponent = project.customComponent ? customComponents[project.customComponent] : null;

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
          title={`${categoryData.title}/${project.title}`}
          subtitle1={project.subtitle1}
          subtitle2={project.subtitle2}
          year={project.year}
          backLink={`/${categoryData.title.toLowerCase().replace(' ', '-')}`}
          showInfoButton={true}
          onInfoClick={toggleInfo}
          isInfoOpen={isInfoOpen}
        />

        <ProjectContent blurred={isInfoOpen}>
          {CustomComponent && <CustomComponent />}

          {project.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: project.mediaEmbed }} />
          )}
        </ProjectContent>
      </MainContent>
      
      {isInfoOpen && (
        <InfoPopup ref={infoPopupRef}>
          {project.infoPopup.main && (
            <MainStatement>{project.infoPopup.main}</MainStatement>
          )}
          <InfoSection>
            <InfoHeader>Context</InfoHeader>
            <div>{renderContent(project.infoPopup.context)}</div>
          </InfoSection>
          <InfoSection>
            <InfoHeader>Tech</InfoHeader>
            <div>{renderContent(project.infoPopup.tech)}</div>
          </InfoSection>
          <InfoSection>
            <InfoHeader>{project.infoPopup.tools}</InfoHeader>
          </InfoSection>
        </InfoPopup>
      )}
    </PageWrapper>
  );
};

export default ProjectPage;