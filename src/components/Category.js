import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const CategoryContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: calc(100vh - 150px);
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
  height: ${props => {
    switch(props.totalProjects) {
      case 1: return 'calc(100vh - 150px)';
      case 2: return 'calc(50vh - 40px)';
      case 3: return 'calc(33.33vh - 20px)';
      default: return 'calc(25vh - 18px)';
    }
  }};
  min-height: 150px;

  &:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    height: ${props => props.totalProjects === 1 ? 'calc(100vh - 150px)' : 'calc(25vh - 40px)'};
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

const ProjectSection = ({ project, onMouseEnter, onMouseLeave }) => (
  <Project totalProjects={project.totalProjects}>
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

  const headerTitle = isMobile ? title : (hoveredProject ? `${title}/${hoveredProject.title}` : `${title}/`);
  const headerSubtitle1 = isMobile ? subtitle1 : (hoveredProject ? hoveredProject.subtitle1 : subtitle1);
  const headerSubtitle2 = isMobile ? subtitle2 : (hoveredProject ? hoveredProject.subtitle2 : subtitle2);
  const headerYear = isMobile ? '' : (hoveredProject ? hoveredProject.year : '');

  return (
    <CategoryContainer>
      <Header 
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
          />
        ))}
      </ProjectList>
    </CategoryContainer>
  );
};

export default Category;