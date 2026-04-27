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
  getBackLink
} from '../subsites/media_lab/projectPages/BaseProjectPage';

const StyledCreditsSection = styled(CreditsSection)`
  margin-top: 40px;
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
  margin-top: 25px;
  font-size: 17px;
  letter-spacing: 0.3px;

  @media screen and (max-width: 768px) {
    font-size: 15px;
    margin-top: 20px;
  }
`;

const StyledDocImage = styled(DocImage)`
  border: 1px solid black;
  margin: 40px auto;
  display: block;
`;

const AugmentedSymphonyProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
            <CustomTitle>How do you bring the orchestra home?</CustomTitle>
            {/* <CustomCategory>[professional project]</CustomCategory> */}
            <CustomSubtitle>
              <i>Augmented Symphony</i> is a Social Sciences and Humanities Research
              Council-funded project that I designed and developed as a Research Assistant.
              It emerged from a research-creation collaboration between Toronto Metropolitan
              University and the National Arts Centre Orchestra. In response to a challenge
              from the principal investigators on how to enhance the digital delivery of
              orchestral music, I proposed and built an AR application that transforms any
              room into a personalized concert hall.
              <br /><br />
              The project allows users to place individual orchestra instruments around their
              space and walk through their own arranged symphony, experiencing spatial audio
              and interactive control over their listening experience.
            </CustomSubtitle>
          </CustomHeader>

          {mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(mediaEmbed) }} />
          )}

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Developer and experience designer. Proposed the AR spatial-audio solution
                  in response to the research question. Developed the entire Unity application using
                  AR Foundation for iOS and Android. Designed the interaction model and spatial audio
                  system. Co-authored the research paper presented at EVA London 2022.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>David Bouchard</CreditName> — <CreditRole>Researcher</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Dr. Cintia Cristia</CreditName> — <CreditRole>Researcher</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>Michael Bergmann</CreditName> — <CreditRole>Researcher</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Robert</CreditName> — <CreditRole>Research Assistant, Developer, Experience Designer</CreditRole>
                  </CreditItem>
                </CreditsList>
              </CreditsColumn>
            </CreditsGrid>
          </StyledCreditsSection>

          <IntroSection>
            During the pandemic, orchestras faced a problem: how do you deliver an orchestral performance
            through a screen? Traditional video streaming flattens the spatial dimensionality of
            orchestral music. Instruments occupy physical space, sound moves around you, and that
            experience was being lost.
            <br /><br />
            I proposed reconstructing the spatial experience at home, extended by the affordances made
            possible by the medium.
          </IntroSection>

          <DescriptionParagraph>
            <i>Augmented Symphony</i> uses AR to let users place individual instruments anywhere in their
            physical space. Walk closer to the strings and their volume increases. Move toward the brass
            and feel the horns swell. You become the conductor of your own arrangement, experiencing the
            music not as a fixed recording but as a malleable spatial environment.
            <br /><br />
            Built in Unity with AR Foundation, the app works across iOS and Android, using spatial audio
            to create realistic positional sound. Each instrument tracks independently, producing an
            immersive, dynamic soundscape.
          </DescriptionParagraph>

          <StyledDocImage src="/images/projects/augmented-symphony.png" alt="Augmented Symphony AR Interface" />

          <DescriptionParagraph>
            The research contribution was exploring how interactivity and spatial agency could enhance
            digital music listening. The goal was not to replicate the concert hall, but to reimagine it
            for the home. Users could create arrangements to their liking, focus on specific instruments,
            or experience the orchestra from perspectives no physical venue could offer.
            <br /><br />
            The project was presented at EVA London 2022 alongside a short paper. The project goes beyond simple digital delivery toward a model of
            spatial interaction design and embodied musical experience.
          </DescriptionParagraph>

          <ExternalLink
            href="https://www.scienceopen.com/hosted-document?doi=10.14236/ewic/EVA2022.39"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the Research Paper (EVA London 2022)
          </ExternalLink>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default AugmentedSymphonyProjectPage;
