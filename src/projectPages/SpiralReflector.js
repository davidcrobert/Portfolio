import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  CustomHeader,
  CustomCategory,
  CustomSubtitle,
  MediaEmbed,
  CreditsSection,
  CreditsGrid,
  CreditsColumn,
  CreditsHeader,
  RoleDescription,
  CreditsList,
  CreditItem,
  CreditName,
  CreditRole,
  ExternalLink,
  InlineLink,
  cleanYouTubeEmbed,
  getBackLink
} from '../subsites/media_lab/projectPages/BaseProjectPage';

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 960px;
  margin: 30px auto 40px;

  @media screen and (max-width: 768px) {
    grid-auto-flow: column;
    grid-auto-columns: 72vw;
    grid-template-columns: none;
    gap: 8px;
    margin: 24px auto 32px;
    padding-bottom: 6px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
`;

const GalleryCell = styled.div`
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #111;
  scroll-snap-align: start;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.85;
      cursor: pointer;
    }
  }
`;

const StyledCreditsSection = styled(CreditsSection)`
  margin-top: 40px;
`;

const GALLERY_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SpiralReflectorProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const backLink = getBackLink(subsiteId);

  return (
    <PageWrapper>
      <MainContent>
        <Header
          title={`WORK/ ${project.title}`}
          subtitle1={project.subtitle1}
          subtitle2={project.subtitle2}
          year={project.year}
          backLink={backLink}
        />

        <ProjectContent>
          <CustomHeader>
            <CustomCategory>[professional / group project]</CustomCategory>
            <CustomSubtitle>
              <i>Spiral Reflector</i> is a large-scale LED installation I developed as a software
              engineer for artist <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">Rafael Lozano-Hemmer</InlineLink>,
              exhibited at the Museo de Arte Moderno in Mexico City. 300 metres of LED lights in a
              tubular diffuser form a spiral seven-metres in diameter. A PTZ camera at the center
              continuously rotates and captures images that are rendered to the single-line
              'canvas', casting bright points down the spiral.
            </CustomSubtitle>
          </CustomHeader>

          <ImageGallery>
            {GALLERY_IMAGES.map(n => (
              <GalleryCell key={n}>
                <img
                  src={`/images/projects/SpiralReflector/${n}.jpg`}
                  alt={`Spiral Reflector ${n}`}
                />
              </GalleryCell>
            ))}
          </ImageGallery>

          {project.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(project.mediaEmbed) }} />
          )}

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Software developer. Developed the camera control and synchronization in Python.
                  Built the TouchDesigner system that generates images and renders them to the
                  linear DMX light as a canvas, as well as all other visual effects. Planned hardware
                  requirements.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>Rafael Lozano-Hemmer</CreditName> - <CreditRole>Artist</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> - <CreditRole>Software</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Stephan Schultz & William Sutton</CreditName> - <CreditRole>Hardware</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Antimodular Studio & Proyectos Especiales - Arte Abierto</CreditName> - <CreditRole>Production</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </StyledCreditsSection>

          <ExternalLink
            href="https://www.lozano-hemmer.com/spiral_reflector.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on lozano-hemmer.com
          </ExternalLink>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default SpiralReflectorProjectPage;
