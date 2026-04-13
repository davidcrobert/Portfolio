import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
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
  DocImage,
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
  useOriginalProject,
  cleanYouTubeEmbed,
  getBackLink,
  InlineLink
} from '../subsites/media_lab/projectPages/BaseProjectPage';
import { media } from '../styles/responsive';

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
  font-size: 22px;
  letter-spacing: 0.3px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-top: 20px;
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

const StyledCreditsSection = styled(CreditsSection)`
  margin-top: 40px;
`;

const ImageGrid = styled.div`
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

const MobileAlignedHeader = styled(CustomHeader)`
  ${media.downTablet} {
    text-align: left;
  }
`;

const AssemblyLineProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
          <MobileAlignedHeader>
            <CustomTitle>How can a human-robot system feel creatively collaborative?</CustomTitle>
            {/* <CustomCategory>[professional project]</CustomCategory> */}
            <CustomSubtitle>
              <i>Assembly Line</i> is a window installation developed as lead developer for Toronto Metropolitan
              University&apos;s <InlineLink href="https://www.torontomu.ca/design-technology-lab/" target="_blank" rel="noopener noreferrer">Design + Technology LAB</InlineLink>.
              The piece combines 3D projection mapping with an industrial KUKA
              robot to create collaborative artwork between machine and audience.
              <br />
              <br />
              Visitors draw gestures through workshop windows on a web portal. These 2D inputs are
              "manufactured" into temporary 3D forms by the robot — then dissolve.
              <EmphasisText>That which is made is inevitably unmade.</EmphasisText>
            </CustomSubtitle>
          </MobileAlignedHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Lead developer for the installation. Built the 3D projection mapping and choreography in
                  TouchDesigner, including live tracking of the robot&apos;s position. Developed the Node.js backend
                  that bridges the web portal to the physical installation. Created the basic drawing interface in
                  p5.js for gesture capture.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> — <CreditRole>Lead Developer</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Alexander Verni</CreditName> — <CreditRole>Web Development & Layout</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Design + Technology LAB, TMU</CreditName> — <CreditRole>Production</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </StyledCreditsSection>

          <ExternalLink
            href="https://www.cbc.ca/arts/in-toronto-here-s-where-you-can-make-art-with-a-giant-industrial-robot-1.6321499"
            target="_blank"
            rel="noopener noreferrer"
          >
            Featured by CBC Arts
          </ExternalLink>

          <ImageGrid>
            <ImageLink href="https://www.torontomu.ca/design-technology-lab/projects/assembly-line/" target="_blank" rel="noopener noreferrer">
              <StyledDocImage src="/images/projects/AssemblyLine/assembly-line3.jpg" alt="Assembly Line Detail" />
            </ImageLink>
            <ImageLink href="https://www.torontomu.ca/design-technology-lab/projects/assembly-line/" target="_blank" rel="noopener noreferrer">
              <StyledDocImage src="/images/projects/AssemblyLine/assembly-line4.jpg" alt="Assembly Line Robot" />
            </ImageLink>
          </ImageGrid>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default AssemblyLineProjectPage;
