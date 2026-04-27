import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { projectData } from '../data/projectData';
import { media, spacing } from '../styles/responsive';

export const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const MainContent = styled.div`
  background-color: #f2f2f2;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
`;

export const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 0;
  padding: ${spacing.pageY} ${spacing.pageX} 48px;

  ${media.downTablet} {
    padding-bottom: 24px;
  }
`;

export const DescriptionParagraph = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: #000;
  line-height: 1.8;
  text-align: left;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  border: 1px solid black;
  padding: 10px;
  background-color: #fafafa;

  ${media.downTablet} {
    font-size: 14px;
  }
`;

export const CustomHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  max-width: 800px;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: #f2f2f2;

  ${media.downTablet} {
    padding: 0 0 16px;
    margin-bottom: 20px;
  }
`;

export const CustomTitle = styled.h2`
  font-family: 'Times New Roman', Times, serif;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: black;
  font-weight: 400;
  margin-bottom: 10px;

  ${media.downTablet} {
    font-size: 20px;
    letter-spacing: 1px;
  }
`;

export const CustomCategory = styled.p`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
  margin-bottom: 15px;
`;

export const CustomSubtitle = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  text-align: left;

  ${media.downTablet} {
    font-size: 14px;
    line-height: 1.7;
  }
`;

export const MediaEmbed = styled.div`
  width: 100%;
  max-width: 1000px;
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
      padding: 0;
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
`;

export const Gif = styled.img`
  width: 70%;
  max-width: 900px;
  margin: 20px auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;

  ${media.downTablet} {
    width: 100%;
  }
`;

export const DocImage = styled.img`
  width: 100%;
  max-width: 550px;
  margin: 20px auto;
  height: auto;
  display: block;
`;

export const Quote = styled.p`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 32px;
  color: #333;
  line-height: 1.8;
  text-align: center;
  font-style: italic;
  font-weight: bold;
`;

export const CreditsSection = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 40px auto 30px;
  padding: 20px;
  border: 1px solid black;
  background-color: #fafafa;
`;

export const CreditsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  ${media.downTablet} {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const CreditsColumn = styled.div`
  font-family: 'Times New Roman', Times, serif;
`;

export const CreditsHeader = styled.h4`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #000;
  margin-bottom: 12px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;

export const RoleDescription = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin: 0;
`;

export const CreditsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const CreditItem = styled.li`
  font-family: 'Times New Roman', Times, serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 8px;
`;

export const CreditName = styled.span`
  font-weight: 600;
`;

export const CreditRole = styled.span`
  font-style: italic;
  color: #666;
`;

export const ArtistQuoteSection = styled.div`
  margin: 25px 0;
  padding-left: 20px;
`;

export const ArtistQuoteLabel = styled.p`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 600;
`;

export const ArtistQuoteText = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  line-height: 1.7;
  color: #1a1a1a;
  font-style: italic;
  margin: 0;
`;

export const ExternalLink = styled.a`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 30px auto;
  padding: 15px 20px;
  border: 1px solid black;
  background-color: transparent;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-align: center;
  color: black;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: black;
    color: #f9f9f9;
    cursor: pointer;
  }
`;

export const InlineLink = styled.a`
  color: black;
  text-decoration: none;
  border-bottom: 1px solid black;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

export const cleanYouTubeEmbed = (embedCode) => {
  if (!embedCode || !embedCode.includes('youtube.com/embed/')) {
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

export const useOriginalProject = (project) => {
  const [originalProject, setOriginalProject] = useState(null);

  useEffect(() => {
    const lookupLink = project?.link;
    if (!lookupLink) return;

    for (const category in projectData) {
      const foundProject = projectData[category].projects.find(
        entry => entry.link === lookupLink
      );
      if (foundProject) {
        setOriginalProject(foundProject);
        break;
      }
    }
  }, [project]);

  return originalProject;
};

export const getCategoryPrefix = (personal) => {
  return personal ? 'PERSONAL' : 'PROFESSIONAL';
};

export const getBackLink = () => '/';
