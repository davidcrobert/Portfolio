import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import { getProjectMediaEmbed } from '../../../data/projectMedia';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  DescriptionParagraph,
  CustomHeader,
  CustomTitle,
  CustomCategory,
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
  getCategoryPrefix,
  getBackLink,
  InlineLink
} from './BaseProjectPage';

const IntroSection = styled(DescriptionParagraph)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const EmphasisText = styled.span`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-style: italic;
  display: block;
  text-align: center;
  margin-top: 25px;
  font-size: 17px;
  letter-spacing: 0.3px;

  @media screen and (max-width: 768px) {
    font-size: 15px;
    margin-top: 20px;
  }
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

const ShadowTunerProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const originalProject = useOriginalProject(project);

  if (!originalProject) {
    return null;
  }

  const backLink = getBackLink(subsiteId);
  const titlePrefix = getCategoryPrefix(project.personal);
  const mediaEmbed = getProjectMediaEmbed(project);

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
            <CustomTitle>How can AI help us hear what the world really sounds like?</CustomTitle>
            {/* <CustomCategory>[professional project]</CustomCategory> */}
            <CustomSubtitle>
              <i>Shadow Tuner</i> is an interactive installation I helped develop for
              artist <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">Rafael Lozano-Hemmer</InlineLink>,
              adapting a massive public artwork originally presented in Abu Dhabi into a scaled-down spherical LED display.
              <br /><br />
              The piece transforms the visitor's body into a global antenna: as their shadow moves across a spinning Earth,
              it tunes into thousands of live radio stations worldwide.
              <br /><br />
              In the new version I worked on, a custom AI system analyzes each audio stream, separating spoken
              word from music. This foregrounds human voices and gives each region of the planet a more localized,
              conversational texture.
            </CustomSubtitle>
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
                  radio streams. Re-architected the audio downloading pipeline for greater resiliency and
                  cross-platform compatibility.
                  Designed audio database schema and implemented data storage system.
                  Assisted with depth-camera tracking system in TouchDesigner for shadow-based interaction.
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
                    <CreditName>Hugo Daoust</CreditName> — <CreditRole>Visuals & Interaction Development</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Roy MacDonald</CreditName> — <CreditRole>Original Backend Development</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> — <CreditRole>New Backend & AI Development</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Luis Morales</CreditName> — <CreditRole>Previz</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Pierre Tremblay, Matthieu Vanier</CreditName> — <CreditRole>Video</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </CreditsSection>



          <DescriptionParagraph>
            Thousands of radio stations broadcast simultaneously across the globe. News, music, poetry,
            debates. A lot of signal, a lot of noise. How do you develop a sense of place?
            How do you tune into the voices? How do you find the conversations hidden in the noise?
            <br /><br />
            Our solution, and my job, was to build an AI system that could listen to the world and surface speech.
          </DescriptionParagraph>

          <ImageLink href="https://www.lozano-hemmer.com/shadow_tuner.php" target="_blank" rel="noopener noreferrer">
            <StyledDocImage src={"/images/projects/ShadowTuner/shadow-tuner_small.jpg"} alt="Shadow Tuner" />
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
            <StyledDocImage src={"/images/projects/ShadowTuner/shadow-tuner_large.jpg"} alt="Shadow Tuner" />
          </ImageLink>

          <DescriptionParagraph>
            This required building a resilient pipeline capable of downloading and analyzing thousands of
            geo-located radio streams in real time, handling network failures gracefully, and making quick
            decisions about audio content. The result is a global polyphony that foregrounds linguistic
            diversity: the news in Arabic, conversations in Mandarin, poetry in Portuguese.
            <br /><br />
            Your body becomes the tuning dial. Your shadow becomes the antenna. And the AI ensures that
            what you hear is not just noise, but the world speaking.
          </DescriptionParagraph>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default ShadowTunerProjectPage;
