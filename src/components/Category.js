import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const CategoryContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
`;

const ProjectList = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  height: ${props => `calc((100vh - ${props.headerHeight}px) / ${Math.min(props.totalProjects, 4) + 0.5})`};

  &:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    height: ${props => `calc((100vh - ${props.headerHeight}px) / ${Math.min(props.totalProjects, 4) + 0.5})`};
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
  max-width: 60%;

  &:hover {
    cursor: help;
    transform: rotateX(35deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    max-width: 80%;
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

  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0 10px;
  }
`;

const ProjectSection = ({ project, onMouseEnter, onMouseLeave, headerHeight }) => (
  <Project totalProjects={project.totalProjects} headerHeight={headerHeight}>
    <ProjectTitle 
      to={project.link}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
    >
      {project.title}
    </ProjectTitle>
    <ProjectDescription dangerouslySetInnerHTML={{ __html: project.description }} />
  </Project>
);

const Category = ({ title, subtitle1, subtitle2, projects }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    checkIfMobile();
    updateHeaderHeight();

    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

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

  const headerTitle = isMobile ? title : (hoveredProject ? `${title}/ ${hoveredProject.title}` : `${title}/`);
  const headerSubtitle1 = isMobile ? subtitle1 : (hoveredProject ? hoveredProject.subtitle1 : subtitle1);
  const headerSubtitle2 = isMobile ? subtitle2 : (hoveredProject ? hoveredProject.subtitle2 : subtitle2);
  const headerYear = isMobile ? '' : (hoveredProject ? hoveredProject.year : '');

  return (
    <CategoryContainer>
      <Header 
        ref={headerRef}
        title={headerTitle}
        subtitle1={headerSubtitle1}
        subtitle2={headerSubtitle2}
        year={headerYear}
        backLink="/"
      />
      <ProjectList>
        {projects.map((project) => (
          <ProjectSection 
            key={project.id} 
            project={{...project, totalProjects: projects.length}}
            onMouseEnter={handleProjectHover}
            onMouseLeave={handleProjectLeave}
            headerHeight={headerHeight}
          />
        ))}
      </ProjectList>
    </CategoryContainer>
  );
};

export default Category;