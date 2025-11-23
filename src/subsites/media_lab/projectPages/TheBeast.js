import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import { projectData } from '../../../data/projectData';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const CustomHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  border-bottom: 1px solid black;
`;

const CustomTitle = styled.h2`
  font-family: 'Times New Roman', Times, serif;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: black;
  font-weight: 400;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const CustomCategory = styled.p`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const CustomSubtitle = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: #333;
  line-height: 1.8;

  @media screen and (max-width: 768px) {
    font-size: 14px;
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
  }

  @media screen and (max-width: 768px) {
    iframe {
      max-height: 70vh;
      transform: translateY(-25%);
    }
  }
`;

const TheBeastProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const [originalProject, setOriginalProject] = useState(null);

  useEffect(() => {
    for (const category in projectData) {
      const foundProject = projectData[category].projects.find(
        p => p.link === project.originalLink
      );
      if (foundProject) {
        setOriginalProject(foundProject);
        break;
      }
    }
  }, [project]);

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

  if (!originalProject) {
    return null;
  }

  const backLink = `/${subsiteId}`;
  const titlePrefix = project.personal ? 'PERSONAL' : 'PROFESSIONAL';

  return (
    <PageWrapper>
      <MainContent>
        <Header
          title={`${titlePrefix}/ ${project.title}`}
          subtitle1={project.subtitle1}
          subtitle2={project.subtitle2}
          year={project.year}
          backLink={backLink}
        />

        <ProjectContent>
          <CustomHeader>
            <CustomTitle>Context</CustomTitle>
            <CustomCategory>[individual project]</CustomCategory>
            <CustomSubtitle>
              A proof of concept showing that custom project pages work within the subsite system
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}
        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default TheBeastProjectPage;
