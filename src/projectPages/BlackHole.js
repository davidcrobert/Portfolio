import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  CustomHeader,
  CustomSubtitle,
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
  getBackLink
} from './BaseProjectPage';
import { media } from '../styles/responsive';

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

const LandscapeImagePair = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: calc(100% - 4px);
  margin: 30px auto 40px;
`;

const LandscapeImage = styled.img`
  flex: 1;
  min-width: 0;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
`;

const PortraitImagePair = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: calc(100% - 4px);
  margin: 30px auto 0;
`;

const PortraitImage = styled.img`
  flex: 1;
  min-width: 0;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
`;

const StyledCreditsSection = styled(CreditsSection)`
  margin-top: 40px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto 40px;
  aspect-ratio: 9 / 16;
  cursor: pointer;
  overflow: hidden;

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const VideoThumbnail = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M8 5v14l11-7z' fill='%23000'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 55% 50%;
    background-size: 40%;
    transition: transform 0.15s ease, background-color 0.15s ease;
  }

  ${VideoWrapper}:hover &::after {
    transform: scale(1.1);
    background-color: white;
  }
`;

const VIDEO_ID = 'o5_tFjF6zBQ';

const BlackHoleProjectPage = ({ project }) => {
  const backLink = getBackLink();
  const [videoActive, setVideoActive] = useState(false);

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
                A surveillance spiral that identifies and erases its viewers, for Rafael Lozano-Hemmer at Art Basel 2026.
              </DeckSubtitle>
              <DeckMeta>
              TouchDesigner · Python · GLSL · pixel mapping
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                <i>Black Hole</i> is a wall-mounted installation by{' '}
                <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">
                  Rafael Lozano-Hemmer
                </InlineLink>
                : a 220cm concave spiral of 14,755 LED bulbs with a surveillance camera at its centre.
                The camera identifies visitors in real time, drawing their portraits into the vortex
                before the spiral erases them — to look at it is also to be looked at, catalogued, and
                dissolved. I built the face-tracking and pixel-mapping pipeline in Python and
                TouchDesigner that translates live detections into the physical LED layout.
              </CustomSubtitle>
            </IntroBody>
          </CustomHeader>

          <LandscapeImagePair>
            <LandscapeImage src="/images/projects/BlackHole/blackhole1.jpg" alt="Black Hole installation view" />
            <LandscapeImage src="/images/projects/BlackHole/blackhole2.jpg" alt="Black Hole face tracking" />
          </LandscapeImagePair>

          <VideoWrapper onClick={() => setVideoActive(true)}>
            {videoActive ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=1&iv_load_policy=3&rel=0`}
                title="Black Hole"
                allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <>
                <VideoThumbnail
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt="Black Hole video"
                />
                <PlayButton />
              </>
            )}
          </VideoWrapper>

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Built the multi-face tracking pipeline in Python, managed via TDPyEnvManager
                  inside TouchDesigner, with asynchronous threading so detection runs without
                  blocking the render loop. The system identifies and assigns stable IDs to
                  faces in the live camera feed, maintaining continuity as the audience changes.
                  <br /><br />
                  Built the pixel-mapping system translating tracked coordinates into the
                  installation&apos;s physical LED layout. Wrote GLSL shaders for the visual
                  transition states.
                  <br /><br />
                  Early R&amp;D included a face-tracking prototype on a laptop RTX 4070 running
                  at 120 fps, though project requirements evolved with time to point in a different direction.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>Rafael Lozano-Hemmer</CreditName> - <CreditRole>Artist</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert & Hugo Daoust</CreditName> - <CreditRole>Software, Production</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>William Sutton, Sebastien Dallaire & Stephan Schulz</CreditName> - <CreditRole>Hardware, Production</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Emily Green</CreditName> - <CreditRole>Production</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </StyledCreditsSection>

          <PortraitImagePair>
            <PortraitImage src="/images/projects/BlackHole/blackhole3.jpg" alt="Black Hole interaction detail" />
            <PortraitImage src="/images/projects/BlackHole/blackhole4.jpg" alt="Black Hole interaction detail" />
          </PortraitImagePair>

          <ExternalLink
            href="https://www.lozano-hemmer.com/black_hole.php"
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

export default BlackHoleProjectPage;
