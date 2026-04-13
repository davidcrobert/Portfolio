import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import { media, spacing } from '../styles/responsive';

// Main container for the category page
const CategoryContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
`;

// Container for the list of projects
const ProjectList = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

// Project item - fixed to make sizes consistent across categories
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
  padding: ${spacing.cardPadding} 0;
  
  /* Set fixed height based on viewport size, regardless of how many projects */
  min-height: 150px;

  &:last-child {
    border-bottom: none;
  }

  /* On larger screens, allow more height per project when there are only 1-3 projects */
  @media screen and (min-width: 769px) {
    height: ${props => {
      // Adjust height based on number of projects
      switch(props.totalProjects) {
        case 1: return 'calc(75vh)'; // Single project gets more space
        case 2: return 'calc(37.5vh)'; // Two projects get half the space
        case 3: return 'calc(33vh)'; // Three projects
        default: return 'calc(25vh)'; // More than three gets standard size
      }
    }};
  }

  /* Mobile-specific styling */
  ${media.downTablet} {
    width: 100%;
    min-height: 0;
    text-align: left;
    align-items: flex-start;
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

  /* Hover effect */
  &:hover {
    cursor: help;
    transform: rotateX(35deg);
  }

  /* Mobile-specific styling */
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

  /* Mobile-specific styling */
  ${media.downTablet} {
    font-size: 12px;
    padding: 0;
    margin-bottom: 10px;
    text-align: left;
  }
`;

// Technologies list styling
const ProjectTechnologies = styled.p`
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
  font-size: 12px;
  color: #555;
  margin-bottom: 4px;

  /* Mobile-specific styling */
  ${media.downTablet} {
    font-size: 11px;
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

  /* Mobile-specific styling */
  ${media.downTablet} {
    font-size: 10px;
    text-align: left;
  }
`;

// Component for an individual project in the list
const ProjectSection = ({ project, onMouseEnter, onMouseLeave }) => {
  // Extract tools from the infoPopup if available
  const technologies = project.infoPopup?.tools || null;
  
  return (
    <Project totalProjects={project.totalProjects}>
      <ProjectTitle 
        to={project.link}
        onMouseEnter={() => onMouseEnter(project)}
        onMouseLeave={onMouseLeave}
      >
        {project.title}
      </ProjectTitle>
      <ProjectDescription dangerouslySetInnerHTML={{ __html: project.description }} />
      {technologies && (
        <ProjectTechnologies>~{technologies}~</ProjectTechnologies>
      )}
      {project.tags && project.tags.length > 0 && (
        <ProjectTags>{project.tags.join(' • ')}</ProjectTags>
      )}
    </Project>
  );
};

// Main Category component
const Category = ({ title, subtitle1, subtitle2, projects, tags }) => {
  // State for tracking hovered project and mobile detection
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

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

  // Dynamic header content based on hover state
  const headerTitle = isMobile ? title : (hoveredProject ? `${title}/ ${hoveredProject.title}` : `${title}/`);
  const headerSubtitle1 = isMobile ? subtitle1 : (hoveredProject ? hoveredProject.subtitle1 : subtitle1);
  const headerSubtitle2 = isMobile ? subtitle2 : (hoveredProject ? hoveredProject.subtitle2 : subtitle2);
  const headerYear = isMobile ? '' : (hoveredProject ? hoveredProject.year : '');

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags && project.tags.includes(activeFilter));

  return (
    <CategoryContainer>
      <Header 
        title={headerTitle}
        subtitle1={headerSubtitle1}
        subtitle2={headerSubtitle2}
        year={headerYear}
        backLink="/"
        tags={tags}
        activeFilter={activeFilter}
        onTagSelect={setActiveFilter}
      />
      
      <ProjectList>
        {filteredProjects.map((project) => (
          <ProjectSection 
            key={project.id} 
            project={{...project, totalProjects: filteredProjects.length}}
            onMouseEnter={handleProjectHover}
            onMouseLeave={handleProjectLeave}
          />
        ))}
      </ProjectList>
    </CategoryContainer>
  );
};

export default Category;
