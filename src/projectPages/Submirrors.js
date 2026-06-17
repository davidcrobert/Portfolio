import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  DescriptionParagraph,
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
  DocImage,
  InlineLink
} from './BaseProjectPage';
import { media } from '../styles/responsive';
import SystemDiagram from '../components/SystemDiagram';

// Project-specific styled components
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

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  margin: 40px auto;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  border: 1px solid black;

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;
    display: block;
  }
`;

const StyledDocImage = styled(DocImage)`
  border: 1px solid black;
  margin: 40px auto;
  display: block;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;

const ImageLink = styled.a`
  display: block;
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  text-decoration: none;
`;

const VideoCaption = styled.p`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
`;

const StyledCreditsSection = styled(CreditsSection)`
  margin-top: 40px;
`;

// ─── Diagram data ─────────────────────────────────────────────────────────────

const SUBMIRRORS_NODES = [
  { id: 'cam', label: 'Camera',        sublabel: 'live capture',          nx: 0.10, ny: 0.28, lens: true, labelAbove: true },
  { id: 'py',  label: 'Python',        sublabel: 'LivePortrait · AI',     nx: 0.40, ny: 0.70, aiNode: true },
  { id: 'td',  label: 'TouchDesigner', sublabel: 'control · compositing',  nx: 0.64, ny: 0.70, labelDx: 34 },
  { id: 'mir', label: 'Mirrors',       sublabel: 'full-frame display',    nx: 0.88, ny: 0.4, mirror: true, labelAbove: true, mirrorFace: true },
];

const SUBMIRRORS_EDGES = [
  { from: 'cam', to: 'py',  label: 'video in' },
  { from: 'py',  to: 'td',  label: 'NDI' },
  { from: 'py',  to: 'td',  label: 'face coords', bendY: -0.22 },
  { from: 'td',  to: 'py',  label: 'OSC', bendY: 0.16, dashed: true }, // TD pilots the face
  { from: 'td',  to: 'mir', label: 'render' },
];

const EmphasisText = styled.span`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  display: block;
  text-align: center;
  font-size: 17px;
  letter-spacing: 0.3px;

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const SubmirrorsProjectPage = ({ project }) => {
  return (
    <PageWrapper>
      <MainContent>
        <Header
          title={`WORK/ ${project.title}`}
          subtitle1={project.subtitle1}
          subtitle2={project.subtitle2}
          year={project.year}
          backLink="/"
        />

        <ProjectContent>
          <CustomHeader>
            <ProjectDeck>
              <DeckSubtitle>
                Interactive AI mirrors for Rafael Lozano-Hemmer.
              </DeckSubtitle>
              <DeckMeta>
                Python · TouchDesigner · AI · real-time facial puppeteering
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                <i>Recurrent Waiting</i> and <i>Recurrent Kafka</i> are interactive mirror installations
                developed for artist <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">Rafael Lozano-Hemmer</InlineLink>.
                Each piece captures a visitor's face in real time and uses an AI model to puppeteer and
                distort their reflection; blinking on a coded sequence, or redirecting the gaze to
                follow a scrolling teleprompter. The inference pipeline runs in Python, with
                TouchDesigner handling compositing and puppeteering control.
              </CustomSubtitle>
            </IntroBody>
          </CustomHeader>

          <VideoGrid>
            <div>
              <VideoContainer>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/u4MBTA7A7M8?si=3W3V2xiWlXZ1lUoo&controls=1&iv_load_policy=3&rel=0"
                  title="Recurrent Waiting"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </VideoContainer>
              <VideoCaption>Recurrent Waiting</VideoCaption>
            </div>
            <div>
              <VideoContainer>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/k5isAs7JQi0?si=m7spuju15Pgmy-4p&controls=1&iv_load_policy=3&rel=0"
                  title="Recurrent Kafka"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </VideoContainer>
              <VideoCaption>Recurrent Kafka</VideoCaption>
            </div>
          </VideoGrid>

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Sole developer of the AI puppeteering system. Built the LivePortrait integration for real-time facial
                  manipulation, including optimizations for live video feeds. Created Python-based puppet software and
                  developed the TouchDesigner compositing / puppeteering pipeline. Built the initial prototype
                  in ComfyUI.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>Rafael Lozano-Hemmer</CreditName> — <CreditRole>Artist</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> — <CreditRole>Software</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Lauria Clarke, Emily Green, Jade Séguéla, Stephan Schulz, William Sutton, Matthieu Vanier</CreditName> — <CreditRole>Production</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </StyledCreditsSection>

          <SystemDiagram nodes={SUBMIRRORS_NODES} edges={SUBMIRRORS_EDGES} />

          <ImageLink href="https://www.lozano-hemmer.com/recurrent_waiting.php" target="_blank" rel="noopener noreferrer">
            <StyledDocImage src="/images/projects/Submirrors/recurrent_waiting.jpg" alt="Recurrent Waiting" />
          </ImageLink>

          <DescriptionParagraph>
            <EmphasisText>From Atelier Lozano-Hemmer:</EmphasisText>
            "Recurrent Waiting" is an interactive mirror installation from the ongoing Submirror series, a body of work
            that explores the tension between self-perception, loss of control, and digital puppetry. These mirrors are
            recalcitrant, they do not reflect faithfully; they act with intention, manipulating the viewer's image to
            reveal a version of the self that is no longer entirely their own.
            <br /><br />
            In "Recurrent Waiting", the mirror replicates the viewer's image, but the reflection blinks erratically,
            accompanied by faint signalling sounds. This blinking follows a timed sequence that transmits Lucky's
            monologue from Samuel Beckett's "Waiting for Godot" in Morse code. The result is a fragmented, involuntary
            form of communication—technically generated by the viewer's presence, yet entirely outside their conscious
            intent.
          </DescriptionParagraph>

          <ImageLink href="https://www.lozano-hemmer.com/recurrent_kafka.php" target="_blank" rel="noopener noreferrer">
            <StyledDocImage src="/images/projects/Submirrors/recurrent_kafka.jpg" alt="Recurrent Kafka" />
          </ImageLink>

          <DescriptionParagraph>
            <EmphasisText>From Atelier Lozano-Hemmer:</EmphasisText>
            "Recurrent Kafka" is an interactive mirror installation from the ongoing Submirror series. In "Recurrent
            Kafka", the mirror replicates the viewer's image, but the reflected image gazes relentlessly at a
            teleprompter text that scrolls across the mirror and displays the collected works of Franz Kafka. The piece
            uses AI to create a live "rigged" clone of the viewer, controlling the direction of the eyes, the pose of
            the head, and the speed of movement.
          </DescriptionParagraph>

          <ExternalLink
            href="https://www.creativeapplications.net/project/submirror-self-perception-loss-of-control-and-digital-puppetry/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Featured by Creative Applications
          </ExternalLink>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default SubmirrorsProjectPage;


