import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { getProjectMediaEmbed } from '../data/projectMedia';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  DescriptionParagraph,
  CustomHeader,
  CustomSubtitle,
  DocImage,
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
  useOriginalProject,
  cleanYouTubeEmbed,
  getBackLink,
  InlineLink
} from './BaseProjectPage';

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

const ImageLink = styled.a`
  display: block;
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  text-decoration: none;
`;

const StyledDocImage = styled(DocImage)`
  border: 1px solid black;
  margin-bottom: 30px;
  margin-top: 30px;
  display: block;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
    cursor: pointer;
  }
`;

const ShadowTunerProjectPage = ({ project }) => {
  const originalProject = useOriginalProject(project);

  if (!originalProject) {
    return null;
  }

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
                Interactive radio installation adapted for a spherical LED display, with AI-assisted live audio analysis.
              </DeckSubtitle>
              <DeckMeta>
                Python · TouchDesigner · RealSense depth camera · AI audio analysis · PowerShell · ffmpeg · hardware integration
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                <i>Shadow Tuner</i> is an interactive installation developed for
                artist <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">Rafael Lozano-Hemmer</InlineLink>,
                adapting a large-scale public artwork originally presented on an inflatable sphere in Abu Dhabi into a custom spherical LED display.
                <br /><br />
                The piece transforms the visitor&apos;s body into a global antenna: as their shadow moves across a spinning Earth,
                it tunes into thousands of live radio stations worldwide.
                <br /><br />
                In the new version I worked on, a custom AI system analyzes each audio stream, separating spoken
                word from music. This foregrounds human voices and gives each region of the planet a more localized,
                conversational texture.
              </CustomSubtitle>
            </IntroBody>
          </CustomHeader>

          {mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(mediaEmbed) }} />
          )}

          <CreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Developed the AI analyzer to differentiate spoken word from music across thousands of live
                  radio streams. Re-architected the audio downloading and transcoding pipeline around ffmpeg
                  for greater resiliency and clearer data collection.
                  Designed audio database schema and implemented data storage system.
                  Assisted with depth-camera (RealSense) tracking system in TouchDesigner for shadow-based interaction.
                  <br />
                  <br />
                  Also planned out, sourced, and assembled hardware components.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>Rafael Lozano-Hemmer</CreditName> — <CreditRole>Artist</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> — <CreditRole>Backend & AI Development</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Hugo Daoust</CreditName> — <CreditRole>Visuals & Interaction Development</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>William Sutton</CreditName> — <CreditRole>Industrial Design & Fabrication</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </CreditsSection>

          <DescriptionParagraph>
            Thousands of radio stations broadcast simultaneously across the globe — news, music, poetry,
            debates. How do you develop a sense of place? How do you find the conversations hidden in the noise?
            <br /><br />
            The solution was to build an AI system that could listen to the world and surface speech.
          </DescriptionParagraph>

          <ImageLink href="https://www.lozano-hemmer.com/shadow_tuner.php" target="_blank" rel="noopener noreferrer">
            <StyledDocImage src={"/images/projects/ShadowTuner/shadow-tuner_small.webp"} alt="Shadow Tuner" />
          </ImageLink>

          <DescriptionParagraph>
            The installation displays a rotating Earth, either projected onto a massive inflatable sphere in public
            spaces or rendered on a custom spherical LED display. As visitors move in front of it, their
            shadows sweep across continents and oceans. Each shadow triggers live radio stations from the
            regions it touches.
            <br /><br />
            The AI analyzer I built continuously monitors these streams, playing only human speech rather
            than music or ambient audio. This gives each region its own linguistic texture, rather than
            hearing the same pop songs no matter where you stand.
          </DescriptionParagraph>

          <ImageLink href="https://www.lozano-hemmer.com/shadow_tuner.php" target="_blank" rel="noopener noreferrer">
            <StyledDocImage src={"/images/projects/ShadowTuner/shadow-tuner_large.webp"} alt="Shadow Tuner" />
          </ImageLink>

          <DescriptionParagraph>
            This required building a resilient pipeline capable of downloading and analyzing thousands of
            geo-located radio streams in real time, handling network failures gracefully, and making quick
            decisions about audio content. The result is a global polyphony that foregrounds linguistic
            diversity: the news in Arabic, conversations in Mandarin, poetry in Portuguese.
            <br /><br />
            Your body becomes the tuning dial. Your shadow becomes the antenna.
          </DescriptionParagraph>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default ShadowTunerProjectPage;


