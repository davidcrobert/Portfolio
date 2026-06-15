import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { getProjectMediaEmbed } from '../data/projectMedia';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  CustomHeader,
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
} from './BaseProjectPage';
import { media } from '../styles/responsive';
import SystemDiagram from '../components/SystemDiagram';

const SPIRAL_NODES = [
  { id: 'ptz', label: 'PTZ Camera',     sublabel: 'AXIS Q6075-E',      nx: 0.25, ny: 0.20, camera: true, labelAbove: true },
  { id: 'api', label: 'Axis API',        sublabel: 'Python · VAPIX',    nx: 0.10, ny: 0.63 },
  { id: 'td',  label: 'TouchDesigner',   sublabel: 'image processing',  nx: 0.48, ny: 0.63 },
  { id: 'dmx', label: 'DMX Controller',  sublabel: 'ArtNet',            nx: 0.68, ny: 0.20, labelAbove: true },
  { id: 'led', label: 'LED Spiral',      sublabel: '300m · 7m ø',       nx: 0.87, ny: 0.63, special: 'spiral' },
];

const SPIRAL_EDGES = [
  { from: 'ptz', to: 'td',  label: 'RTSP feed' },
  { from: 'td',  to: 'api', label: 'HTTP commands' },
  { from: 'api', to: 'ptz', label: 'VAPIX control', dashed: true, bendX: -0.08 },
  { from: 'td',  to: 'dmx', label: 'DMX out' },
  { from: 'dmx', to: 'led', label: 'ArtNet' },
];

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 960px;
  margin: 30px auto 40px;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 68vw;
    justify-content: start;
    gap: 10px;
    margin: 24px auto 32px;
    max-width: 100%;
    padding: 0 16px 6px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x proximity;
    scroll-padding-inline: 16px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
`;

const ProjectDeck = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 20px;
  text-align: center;

  ${media.downTablet} {
    text-align: left;
  }
`;

const DeckSubtitle = styled.p`
  margin: 0;
  font-size: clamp(20px, 2vw, 28px);
  line-height: 1.35;
  letter-spacing: 0.01em;
`;

const DeckMeta = styled.p`
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.45;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const IntroBody = styled.div`
  margin-top: 30px;
`;

const GalleryCell = styled.div`
  flex: 0 1 calc((100% - 40px) / 5);
  max-width: calc((100% - 40px) / 5);
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #111;

  @media screen and (max-width: 768px) {
    max-width: none;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

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

const SpiralReflectorProjectPage = ({ project }) => {
  const backLink = getBackLink();
  const mediaEmbed = getProjectMediaEmbed(project);

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
            <ProjectDeck>
              <DeckSubtitle>
                Large-scale LED installation for Rafael Lozano-Hemmer, exhibited at the Museo de Arte Moderno, Mexico City.
              </DeckSubtitle>
              <DeckMeta>
                TouchDesigner · Python · DMX / ArtNet · REST API · PTZ camera control and synchronization
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                <i>Spiral Reflector</i> is a large-scale outdoor LED installation developed for artist <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">Rafael Lozano-Hemmer</InlineLink>,
                exhibited at the Museo de Arte Moderno in Mexico City. 300 metres of LED lights in a
                tubular diffuser form a spiral seven metres in diameter. A PTZ camera at the center
                continuously rotates, capturing the space — its image rendered in real time onto the
                spiral's length, casting bright points of light that track the camera's gaze.
              </CustomSubtitle>
            </IntroBody>
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

          {mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(mediaEmbed) }} />
          )}

          <SystemDiagram nodes={SPIRAL_NODES} edges={SPIRAL_EDGES} />

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Software developer. Developed the TouchDesigner system
                  that generates imagery and drives the LED strip over DMX / ArtNet, including
                  all visual effects. Built an async Python REST API for PTZ camera control
                  (Axis VAPIX) and image synchronization.  Scoped hardware requirements.
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


