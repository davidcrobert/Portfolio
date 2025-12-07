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
  getBackLink
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

const ShadowTunerProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
          <CustomHeader>
            <CustomTitle>What does the world sound like when we listen for voices?</CustomTitle>
            <CustomCategory>[professional project]</CustomCategory>
            <CustomSubtitle>
              <i>Shadow Tuner</i> is an interactive installation I developed for artist Rafael Lozano-Hemmer,
              first presented as a massive public artwork in Abu Dhabi. It transforms the visitor's body into
              a global antenna, casting shadows across a spinning Earth to tune into thousands of live radio
              stations worldwide.
              <br />
              <br />
              The piece features a custom AI system that analyzes audio streams in real-time, separating
              spoken word from music—surfacing human voices, conversations, and the polyphonic diversity of
              world languages.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <CreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Developed the AI analyzer to differentiate spoken word from music across thousands of live
                  radio streams. Re-architected the audio downloading pipeline for greater resiliency and
                  cross-platform compatibility.
                  Designed audio database schema and implemented data storage system for efficient retrieval of
                  radio station metadata and audio streams.
                  Assisted with depth-camera tracking system in TouchDesigner for shadow-based interaction.
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



          <IntroSection>
            Thousands of radio stations broadcast simultaneously across the globe. News, music, poetry,
            arguments, laughter—an overwhelming cacophony of human expression. How do you develop a sense
            of place? How do you tune in to the voices? How do you find the conversations hidden in the noise?
            <br />
            <br />
            This was the challenge: build an AI that could listen to the world and surface speech.
          </IntroSection>

          <DescriptionParagraph>
            The installation displays a rotating Earth—either projected onto a massive inflatable sphere
            in public spaces, or shown on a custom spherical LED display. As visitors move in front of it,
            their shadows fall across continents and oceans. Each shadow triggers live radio stations from
            the cities it touches.
            <br />
            <br />
            But here's the key intervention: the AI analyzer I built constantly monitors these streams,
            prioritizing stations broadcasting spoken word over those playing music.
          </DescriptionParagraph>

          <DescriptionParagraph>
            This required building a resilient pipeline that could download and analyze thousands of
            geo-located radio streams in real-time, handle network failures gracefully, and make split-second
            decisions about audio content. The result is a global polyphony that emphasizes linguistic
            diversity—news in Arabic, conversations in Mandarin, poetry in Portuguese.
            <br />
            <br />
            Your body becomes the tuning dial. Your shadow becomes the antenna. And the AI ensures that
            what you hear is not just noise, but the conversations of the world.
          </DescriptionParagraph>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default ShadowTunerProjectPage;
