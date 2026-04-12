import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
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

const MothMelodyProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const originalProject = useOriginalProject(project);

  if (!originalProject) {
    return null;
  }

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
            <ProjectDeck>
              <DeckSubtitle>
                Collaborative tabletop installation for the Ontario Science Centre, built around touch, light, and sound.
              </DeckSubtitle>
              <DeckMeta>
                Unity · Arduino · TouchDesigner
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                <i>Moth Melody</i> was developed for the{' '}
                <InlineLink href="https://www.ontariosciencecentre.ca/" target="_blank" rel="noopener noreferrer">
                  Ontario Science Centre
                </InlineLink>
                {' '}as an interactive exhibit for children. Visitors touch lanterns around the table,
                causing matching lights to activate in the projected world and guiding a moth across the
                surface. As it passes through flowers, the interaction produces musical notes and turns the
                installation into a simple collaborative instrument.
              </CustomSubtitle>
            </IntroBody>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Contribution</CreditsHeader>
                <RoleDescription>
                  Led software development and hardware integration. Built the interaction system
                  linking capacitive-touch inputs on the physical lanterns to the moth's behavior,
                  musical responses, and projected visuals across the tabletop.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> - <CreditRole>Software development and hardware integration</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Alex Verni</CreditName> - <CreditRole>Fabrication and hardware</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Stacy Cernova</CreditName> - <CreditRole>Visual design</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Anthony Baloukas</CreditName> - <CreditRole>Production assistance</CreditRole>
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

export default MothMelodyProjectPage;
