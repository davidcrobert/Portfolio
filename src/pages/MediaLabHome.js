import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Sketch from '../components/Sketch';
import { subsiteData } from '../data/subsiteData';

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
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 20px;
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
  max-width: 100%;

  &:hover {
    cursor: help;
    transform: rotateX(35deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    max-width: 80%;
    margin-bottom: 10px;
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
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0 10px;
    margin-bottom: 5px;
  }
`;

const ProjectTags = styled.p`
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 10px;
  color: #777;
  font-style: italic;

  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 0px 15px;
  margin-bottom: 20px;
  position: relative;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    padding-bottom: 15px;
  }
`;

function MediaLabHome() {
  const subsite = subsiteData.media_lab;

  // Split projects into professional and personal
  const professionalProjects = subsite.projects.filter(p =>
    p.tags && p.tags.some(tag => ['interactive', 'ai', 'installation'].includes(tag))
  );
  const personalProjects = subsite.projects.filter(p =>
    p.tags && p.tags.some(tag => ['web', 'performance'].includes(tag))
  );

  return (
    <IndexContainer>
      <Sketch />
      <Header
        title="David Robert"
        subtitle1="Creative Technologist"
        subtitle2="& Media Designer"
        hideBackButton={true}
        statement="I am a Creative and Critical Technologist.
        I think that our constructed environment is valuable and vulnerable.
        I deal a lot with interactive spaces and how we relate to each other in them.
        It's also got a lot to do with voice. I guess how we talk to each other."
        showAnimatedText={true}
      />

      <SplitContainer>
        <Side $left>
          <SideContent>
            <SideLabel $left>Personal</SideLabel>
            <ProjectList>
              {personalProjects.map((project, index) => (
                <Project key={index}>
                  <ProjectTitle to={`/media_lab/projects/${project.originalLink.split('/').pop()}`}>
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  {project.tags && project.tags.length > 0 && (
                    <ProjectTags>{project.tags.join(' • ')}</ProjectTags>
                  )}
                </Project>
              ))}
            </ProjectList>
          </SideContent>
        </Side>

        <Side>
          <SideContent>
            <SideLabel>Professional</SideLabel>
            <ProjectList>
              {professionalProjects.map((project, index) => (
                <Project key={index}>
                  <ProjectTitle to={`/media_lab/projects/${project.originalLink.split('/').pop()}`}>
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  {project.tags && project.tags.length > 0 && (
                    <ProjectTags>{project.tags.join(' • ')}</ProjectTags>
                  )}
                </Project>
              ))}
            </ProjectList>
          </SideContent>
        </Side>
      </SplitContainer>

      <Footer />
    </IndexContainer>
  );
}

export default MediaLabHome;
