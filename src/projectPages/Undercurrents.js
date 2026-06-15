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
import SystemDiagram from '../components/SystemDiagram';

const ProjectDeck = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto 20px;
  text-align: center;
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

const ImagePair = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: calc(100% - 4px);
  margin: 30px auto 40px;
`;

const WideImage = styled.img`
  flex: 1;
  min-width: 0;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
`;

const StyledCreditsSection = styled(CreditsSection)`
  margin-top: 40px;
`;

// ─── Diagram ──────────────────────────────────────────────────────────────────

const UC_NODES = [
  { id: 'ics',   label: 'Intercoms',     sublabel: '8 stations',           nx: 0.075, ny: 0.22, labelAbove: true },
  { id: 'dante', label: 'Dante',         sublabel: 'ADC · DAC · AoIP',     nx: 0.26,  ny: 0.62 },
  { id: 'td',    label: 'TouchDesigner', sublabel: 'audio · lighting',     nx: 0.48,  ny: 0.22, labelAbove: true },
  { id: 'leds',  label: 'LED Strands',   sublabel: 'ArtNet · cistern',     nx: 0.48,  ny: 0.78 },
  { id: 'ai',    label: 'AI API',        sublabel: 'Python · FAISS · LLM', nx: 0.71,  ny: 0.62 },
  { id: 'arch',  label: 'Archive',       sublabel: 'audio recordings',     nx: 0.92,  ny: 0.22, labelAbove: true },
];

const UC_EDGES = [
  { from: 'ics',   to: 'dante', label: 'mic',       bendX:  0.08 },
  { from: 'dante', to: 'ics',   label: 'speaker',   bendX: -0.08 },
  { from: 'dante', to: 'td',    label: 'AoIP',      bendX:  0.08 },
  { from: 'td',    to: 'dante', label: 'audio out', bendX: -0.08 },
  { from: 'td',    to: 'leds',  label: 'ArtNet' },
  { from: 'td',    to: 'ai',    label: 'clip',      bendX:  0.08 },
  { from: 'ai',    to: 'td',    label: 'response',  bendX: -0.08 },
  { from: 'ai',    to: 'arch',  label: 'write',     bendX:  0.08 },
  { from: 'arch',  to: 'ai',    label: 'search',    bendX: -0.08 },
];

const UndercurrentsProjectPage = ({ project }) => {
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
                An underground echo chamber of voice and light for Rafael Lozano-Hemmer, at the Buffalo Bayou Park Cistern, Houston.
              </DeckSubtitle>
              <DeckMeta>
                Python · TouchDesigner · DANTE Audio · DMX / ArtNet · REST API · ffmpeg · AI voice analysis
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                <i>Undercurrents</i> is an installation by <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">Rafael Lozano-Hemmer</InlineLink> inside
                an 87,500 sq ft underground cistern built in 1926 beneath Houston. Visitors speak
                into one of eight intercoms; their voice travels as light along branching paths,
                forking at the cistern's columns before arriving at another station mixed with
                echoes of past voices. Every recording joins a growing archive of messages
                left at the intercoms, which an AI searches to find the closest match to each
                new voice. Commissioned poems surface occasionally within this stream, accompanied
                by animated LED sequences.
              </CustomSubtitle>
            </IntroBody>
          </CustomHeader>

          <ImagePair>
            <WideImage
              src="/images/projects/Undercurrents/undercurrents1.jpg"
              alt="Undercurrents installation view 1"
            />
            <WideImage
              src="/images/projects/Undercurrents/undercurrents2.jpg"
              alt="Undercurrents installation view 2"
            />
          </ImagePair>

          {mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(mediaEmbed) }} />
          )}

          <SystemDiagram nodes={UC_NODES} edges={UC_EDGES} />

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Built the complete audio and intercom system in TouchDesigner: 8 DANTE
                  inputs and 16 DANTE outputs, intercom button handling, asynchronous API calls for
                  AI-selected responses, audio cleaning, and playback routing across the
                  eight stations.
                  <br /><br />
                  Built the Audio AI REST API, running on a dedicated second machine. Each incoming
                  clip is transcribed, converted to a text embedding, and run through a FAISS
                  search across tens of thousands of cistern recordings. An LLM picks the best
                  response from the resulting shortlist. Its position in the cistern is then
                  determined by UMAP, which projects the full embedding space into 2D so that
                  semantically similar recordings land on nearby columns. Incoming and outgoing
                  audio is normalized and transcoded with ffmpeg. The full stack ran
                  locally and averaged 0.3–0.7 seconds.
                  <br /><br />
                  Also wrote a GLSL jump-flood-algorithm tool for texture-based audio
                  spatialization - mapping an arbitrary source image onto the physical speaker
                  layout to position sound across the cistern.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>Rafael Lozano-Hemmer</CreditName> - <CreditRole>Artist</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert & Hugo Daoust</CreditName> - <CreditRole>Software</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>William Sutton, Lauria Clarke & Stephan Schulz</CreditName> - <CreditRole>Hardware</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Michael Nardone</CreditName> - <CreditRole>Curator</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </StyledCreditsSection>

          <ExternalLink
            href="https://www.lozano-hemmer.com/undercurrents.php"
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

export default UndercurrentsProjectPage;
