import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { getSubsite } from '../data/subsiteData';
import { media, spacing } from '../styles/responsive';

// Main container for the subsite page
const SubSiteContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
`;

// Introduction section for custom subsite messaging
const IntroSection = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px ${spacing.pageX};
  text-align: center;
  border-bottom: 1px solid black;

  ${media.downTablet} {
    width: 100%;
    text-align: left;
    padding: 28px ${spacing.pageX};
  }
`;

const IntroStatement = styled.h2`
  font-size: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 400;
  margin-bottom: 30px;
  line-height: 1.4;

  ${media.downTablet} {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const IntroDescription = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  max-width: 700px;
  margin: 0 auto;

  ${media.downTablet} {
    font-size: 14px;
    line-height: 1.6;
  }
`;

// Container for the list of projects
const ProjectList = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// Project item
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
  min-height: 150px;
  padding: ${spacing.cardPadding} 0;

  &:last-child {
    border-bottom: none;
  }

  @media screen and (min-width: 769px) {
    height: ${props => {
      switch(props.totalProjects) {
        case 1: return 'calc(75vh)';
        case 2: return 'calc(37.5vh)';
        case 3: return 'calc(33vh)';
        default: return 'calc(25vh)';
      }
    }};
  }

  ${media.downTablet} {
    width: 100%;
    min-height: 0;
    align-items: flex-start;
    text-align: left;
    padding: ${spacing.cardPadding} ${spacing.pageX};
  }
`;

// Project title styling
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

  ${media.downTablet} {
    font-size: 20px;
    max-width: 100%;
    margin-bottom: 10px;
    padding-bottom: 5px;
    margin-left: 0;
    margin-right: 0;
  }
`;

// Project description styling
const ProjectDescription = styled.p`
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
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

// Project tags styling
const ProjectTags = styled.p`
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 10px;
  color: #777;
  font-style: italic;

  ${media.downTablet} {
    font-size: 10px;
    text-align: left;
  }
`;

// Component for an individual project in the list
const ProjectSection = ({ project, subsiteId, onMouseEnter, onMouseLeave, totalProjects }) => {
  return (
    <Project totalProjects={totalProjects}>
      <ProjectTitle
        to={`/${subsiteId}/projects/${project.originalLink.split('/').pop()}`}
        onMouseEnter={() => onMouseEnter(project)}
        onMouseLeave={onMouseLeave}
      >
        {project.title}
      </ProjectTitle>
      <ProjectDescription>{project.description}</ProjectDescription>
      {project.tags && project.tags.length > 0 && (
        <ProjectTags>{project.tags.join(' • ')}</ProjectTags>
      )}
    </Project>
  );
};

// Main SubSitePage component
const SubSitePage = () => {
  const { subsiteId } = useParams();
  const navigate = useNavigate();
  const [subsite, setSubsite] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const subsiteData = getSubsite(subsiteId);
    if (!subsiteData) {
      navigate('/404');
      return;
    }
    setSubsite(subsiteData);
  }, [subsiteId, navigate]);

  // Effect to detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Handlers for project hover state
  const handleProjectHover = (project) => {
    if (!isMobile) {
      setHoveredProject(project);
    }
  };

  const handleProjectLeave = () => {
    if (!isMobile) {
      setHoveredProject(null);
    }
  };

  if (!subsite) {
    return null;
  }

  // Dynamic header content based on hover state
  const headerTitle = isMobile
    ? subsite.title
    : (hoveredProject ? `${subsite.title}/ ${hoveredProject.title}` : `${subsite.title}/`);
  const headerSubtitle1 = isMobile
    ? subsite.intro.subtitle1
    : (hoveredProject ? hoveredProject.subtitle1 : subsite.intro.subtitle1);
  const headerSubtitle2 = isMobile
    ? subsite.intro.subtitle2
    : (hoveredProject ? hoveredProject.subtitle2 : subsite.intro.subtitle2);
  const headerYear = isMobile ? '' : (hoveredProject ? hoveredProject.year : '');

  return (
    <SubSiteContainer>
      <Header
        title={headerTitle}
        subtitle1={headerSubtitle1}
        subtitle2={headerSubtitle2}
        year={headerYear}
        backLink="/"
      />

      <IntroSection>
        <IntroStatement>{subsite.intro.statement}</IntroStatement>
        <IntroDescription>{subsite.intro.description}</IntroDescription>
      </IntroSection>

      <ProjectList>
        {subsite.projects.map((project, index) => (
          <ProjectSection
            key={index}
            project={project}
            subsiteId={subsiteId}
            onMouseEnter={handleProjectHover}
            onMouseLeave={handleProjectLeave}
            totalProjects={subsite.projects.length}
          />
        ))}
      </ProjectList>
    </SubSiteContainer>
  );
};

export default SubSitePage;
