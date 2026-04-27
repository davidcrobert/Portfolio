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
  useOriginalProject,
  cleanYouTubeEmbed,
  getBackLink,
  InlineLink
} from '../subsites/media_lab/projectPages/BaseProjectPage';

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

const StyledCreditsSection = styled(CreditsSection)`
  margin-top: 40px;
`;

const RemotePulseProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const originalProject = useOriginalProject(project);

  if (!originalProject) {
    return null;
  }

  const backLink = getBackLink(subsiteId);
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
                Networked biometric installation connecting two remote pulse-sensing stations over the internet.
              </DeckSubtitle>
              <DeckMeta>
                Arduino · MQTT · firmware refactor · networked haptics · installation resilience
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                <i>Remote Pulse</i> is an interactive installation consisting of two identical
                pulse-sensing stations that share each participant&apos;s heartbeat with the other in
                real time. Developed for artist{' '}
                <InlineLink href="https://www.lozano-hemmer.com/" target="_blank" rel="noopener noreferrer">
                  Rafael Lozano-Hemmer
                </InlineLink>
                , the piece turns biometric data into a tactile connection across distance.
                <br />
                <br />
                This engagement focused on updating the underlying technologies and refactoring
                the firmware — improving resilience, modernizing the codebase, and generalizing
                it for reuse across future deployments of related artworks.
              </CustomSubtitle>
            </IntroBody>
          </CustomHeader>

          {mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(mediaEmbed) }} />
          )}

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Contribution</CreditsHeader>
                <RoleDescription>
                  Refactored the Arduino firmware to bring the system in line with modern practices,
                  improve reliability, and generalize the codebase for reuse across related artworks.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>Rafael Lozano-Hemmer</CreditName> - <CreditRole>Artist</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Stephan Schulz</CreditName> - <CreditRole>Software</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> - <CreditRole>Firmware refactor and system updates</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </StyledCreditsSection>
        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default RemotePulseProjectPage;
