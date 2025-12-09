import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { projectData } from '../../../data/projectData';

// ============================================================================
// SHARED STYLED COMPONENTS
// These can be imported and used by all custom project pages
// Override by creating new styled components in individual project files
// ============================================================================

export const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

export const MainContent = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
`;

export const ProjectContent = styled.div`
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

  @media screen and (max-width: 768px) {
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
`;

export const CustomTitle = styled.h2`
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

export const CustomCategory = styled.p`
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

export const CustomSubtitle = styled.p`
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 14px;
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

export const Gif = styled.img`
  width: 70%;
  margin: 20px auto;
  aspect-ratio: 16 / 9;
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

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CreditsSection = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto 30px auto;
  padding: 20px;
  border: 1px solid black;
  background-color: #fafafa;
`;

export const CreditsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media screen and (max-width: 768px) {
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

  &:last-child {
    margin-bottom: 0;
  }
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
  border-left: 2px solid #333;

  @media screen and (max-width: 768px) {
    padding-left: 15px;
  }
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

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
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

  @media screen and (max-width: 768px) {
    font-size: 11px;
    padding: 12px 15px;
    margin: 20px auto;
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

// ============================================================================
// SHARED UTILITIES
// ============================================================================

/**
 * Cleans YouTube embed codes to add consistent parameters
 */
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

/**
 * Custom hook to load original project data from projectData.js
 * @param {Object} project - The subsite project object
 * @returns {Object|null} - The original project data or null if not found
 */
export const useOriginalProject = (project) => {
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

  return originalProject;
};

/**
 * Gets the category prefix based on personal flag
 * @param {boolean} personal - Whether the project is personal
 * @returns {string} - 'PERSONAL' or 'PROFESSIONAL'
 */
export const getCategoryPrefix = (personal) => {
  return personal ? 'PERSONAL' : 'PROFESSIONAL';
};

/**
 * Constructs the back link to the subsite home
 * @param {string} subsiteId - The subsite ID
 * @returns {string} - The back link path
 */
export const getBackLink = (subsiteId) => {
  return `/${subsiteId}`;
};
