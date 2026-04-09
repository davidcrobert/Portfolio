import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Sketch from './Sketch';

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

  @media screen and (max-width: 768px) {
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
`;

const MetaSeparator = styled.span`
  width: 14px;
  height: 1px;
  background-color: #000;
  display: inline-block;
`;

const EmptyState = styled.div`
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const getProjectLink = (project, projectPathPrefix) => {
  const sourceLink = project.originalLink || project.link;
  const slug = sourceLink.split('/').pop();
  return `${projectPathPrefix}/${slug}`;
};

const getProjectSlug = (project) => {
  const sourceLink = project.originalLink || project.link;
  return sourceLink.split('/').pop();
};

function SplitPortfolioHome({
  title,
  subtitle1,
  subtitle2,
  sections,
  tags,
  statement,
  customButtons,
  showAnimatedText = false,
  projectPathPrefix = '/projects'
}) {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageCache, setImageCache] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const allProjects = sections.flatMap(section => section.projects);
    const imageExtensions = ['jpg', 'jpeg', 'png', 'tif'];

    allProjects.forEach(project => {
      const projectId = getProjectSlug(project);

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
  }, [sections]);

  const handleProjectHover = (project) => {
    const projectId = getProjectSlug(project);
    setHoveredImage(imageCache[projectId] || null);
  };

  const handleProjectLeave = () => {
    setHoveredImage(null);
  };

  const mergedButtons = customButtons || [];

  const filteredSections = sections.map(section => ({
    ...section,
    projects: activeFilter === 'all'
      ? section.projects
      : section.projects.filter(project => project.tags?.includes(activeFilter))
  }));

  return (
    <IndexContainer>
      <Sketch />
      <ImagePreview $visible={hoveredImage !== null} $image={hoveredImage} />
      <Header
        title={title}
        subtitle1={subtitle1}
        subtitle2={subtitle2}
        hideBackButton={true}
        customButtons={mergedButtons}
        statement={statement}
        showAnimatedText={showAnimatedText}
        tags={tags}
        activeFilter={activeFilter}
        onTagSelect={setActiveFilter}
      />

      <SplitContainer>
        {filteredSections.map((section, index) => (
          <Side key={section.label} $left={index === 0}>
            <SideContent>
              <SideLabel>{section.label}</SideLabel>
              <ProjectList>
                {section.projects.length > 0 ? (
                  section.projects.map(project => (
                    <Project key={project.link || project.originalLink}>
                      <ProjectTitle
                        to={getProjectLink(project, projectPathPrefix)}
                        onMouseEnter={() => handleProjectHover(project)}
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
                    </Project>
                  ))
                ) : (
                  <EmptyState>No projects match this filter.</EmptyState>
                )}
              </ProjectList>
            </SideContent>
          </Side>
        ))}
      </SplitContainer>
    </IndexContainer>
  );
}

export default SplitPortfolioHome;
