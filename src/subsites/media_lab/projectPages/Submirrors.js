import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  DescriptionParagraph,
  CustomHeader,
  CustomTitle,
  CustomCategory,
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
  ArtistQuoteSection,
  ArtistQuoteLabel,
  ArtistQuoteText,
  ExternalLink,
  useOriginalProject,
  getCategoryPrefix,
  getBackLink,
  DocImage,
  InlineLink
} from './BaseProjectPage';
import { media } from '../../../styles/responsive';

// Project-specific styled components
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

const IntroSection = styled(DescriptionParagraph)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

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

const MobileAlignedHeader = styled(CustomHeader)`
  ${media.downTablet} {
    text-align: left;
  }
`;

const SubmirrorsProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const originalProject = useOriginalProject(project);

  if (!originalProject) {
    return null;
  }

  const backLink = getBackLink(subsiteId);
  const titlePrefix = getCategoryPrefix(project.personal);

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
          <MobileAlignedHeader>
            <CustomTitle>How does it feel to lose control of your own reflection?</CustomTitle>
            {/* <CustomCategory>[professional project]</CustomCategory> */}
            <CustomSubtitle>
              <i>Recurrent Waiting</i> and <i>Recurrent Kafka</i> [the Submirror series] are interactive mirror installations
              I developed for artist <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">Rafael Lozano-Hemmer</InlineLink>. The works explore the tension between self-perception,
              loss of control, and digital puppetry.
              <ArtistQuoteSection>
                <ArtistQuoteLabel>In the artist's words:</ArtistQuoteLabel>
                <ArtistQuoteText>
                  "These mirrors are recalcitrant, they do not reflect faithfully; they act with intention,
                  manipulating the viewer's image to reveal a version of the self that is no longer entirely their own."
                </ArtistQuoteText>
              </ArtistQuoteSection>
            </CustomSubtitle>
          </MobileAlignedHeader>

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

          <CreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Sole developer of the AI puppeteering system. Built the LivePortrait integration for real-time facial
                  manipulation, including optimizations for live video feeds. Created Python-based puppet software and
                  developed the TouchDesigner compositing / puppeteering pipeline. Built the initial installation prototype
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
                    <CreditName>David Robert</CreditName> — <CreditRole>Sole Developer</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Lauria Clarke, Emily Green, Jade Séguéla, Stephan Schulz, William Sutton, Matthieu Vanier</CreditName> — <CreditRole>Production</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </CreditsSection>



          <ImageLink href="https://www.lozano-hemmer.com/recurrent_waiting.php" target="_blank" rel="noopener noreferrer">
            <StyledDocImage src="/images/projects/Submirrors/recurrent_waiting.jpg" alt="Recurrent Waiting" />
          </ImageLink>

          <DescriptionParagraph>
            <EmphasisText>From Atelier Lozano-Hemmer:</EmphasisText>
            “Recurrent Waiting” is an interactive mirror installation from the ongoing Submirror series, a body of work that explores the tension between self-perception, loss of control, and digital puppetry. These mirrors are recalcitrant, they do not reflect faithfully; they act with intention, manipulating the viewer’s image to reveal a version of the self that is no longer entirely their own.
            <br /><br />
            In “Recurrent Waiting”, the mirror replicates the viewer’s image, but the reflection blinks erratically, accompanied by faint signalling sounds. This blinking follows a timed sequence that transmits Lucky’s monologue from Samuel Beckett’s “Waiting for Godot” in Morse code. The result is a fragmented, involuntary form of communication—technically generated by the viewer’s presence, yet entirely outside their conscious intent. The experience is uncanny: your reflection blinks compulsively, as if trying to convey something urgent from behind the glass.
            <br /><br />
            Drawing on Beckett’s themes of absurdity and existential dislocation, the work transforms the mirror into a stage where the viewer becomes both puppet and performer, animated by a script they neither authored nor control. As with other pieces in the Submirror series, “Recurrent Waiting” questions the stability of self-image under automated observation. It asks what happens when technology doesn’t just observe us—but represents us, poorly, poetically, and without consent.
          </DescriptionParagraph>

          <ImageLink href="https://www.lozano-hemmer.com/recurrent_kafka.php" target="_blank" rel="noopener noreferrer">
            <StyledDocImage src="/images/projects/Submirrors/recurrent_kafka.jpg" alt="Recurrent Kafka" />
          </ImageLink>

          <DescriptionParagraph>
            <EmphasisText>From Atelier Lozano-Hemmer:</EmphasisText>
            “Recurrent Kafka” is an interactive mirror installation from the ongoing Submirror series, a body of work that explores the tension between self-perception, loss of control, and digital puppetry. These mirrors are recalcitrant, they do not reflect faithfully; they act with intention, manipulating the viewer’s image to reveal a version of the self that is no longer entirely their own.
            <br /><br />
            In “Recurrent Kafka”, the mirror replicates the viewer’s image, but the reflected image—the virtual subject—gazes relentlessly at a teleprompter text that scrolls across the mirror and displays the collected works of Franz Kafka. The piece uses AI to create a live “rigged” clone of the viewer, controlling the direction of the eyes, the pose of the head, and the speed of movement. The viewer is disoriented —at once, reading Kafka’s writings while also watching their own face fixed on the ceaseless flow of words.
            <br /><br />
            This real-time distortion is resonant with Kafka's body of work, which is often marked by a protagonist embarking upon a deeply serious, potentially senseless, ambiguous task that is both forced upon them and impossible to complete. As with other pieces in the Submirror series, "Recurrent Kafka" questions the stability of self-image under automated observation. It asks what happens when technology doesn't just observe us—but represents us, poorly, poetically, and without consent.
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
