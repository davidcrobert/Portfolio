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
  getCategoryPrefix,
  getBackLink
} from './BaseProjectPage';

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
            <CustomTitle>How do you bring the orchestra home?</CustomTitle>
            <CustomCategory>[professional / group project]</CustomCategory>
            <CustomSubtitle>
              <i>Augmented Symphony</i> is a Social Sciences and Humanities Research
              Council-funded project that I designed and developed as a Research Assistant.
              It emerged from a research-creation collaboration between Toronto Metropolitan
              University and the National Arts Centre Orchestra. In response to a challenge
              from the principal investigators on how to enhance the digital delivery of
              orchestral music, I proposed and built an AR application that transforms any
              room into a personalized concert hall.
              <br />
              <br />
              The project allows users to place individual orchestra instruments around their space
              and walk through their own arranged symphony, experiencing spatial audio and interactive control
              over their listening experience.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <StyledCreditsSection>
            <CreditsGrid>
              <CreditsColumn>
                <CreditsHeader>My Role</CreditsHeader>
                <RoleDescription>
                  Sole developer and main experience designer. Proposed the AR spatial audio solution in response
                  to the research question. Developed the entire Unity application with AR Foundation for iOS and
                  Android. Designed the interaction model and spatial audio system. Co-authored the research paper
                  presented at EVA London 2022.
                </RoleDescription>
              </CreditsColumn>
              <CreditsColumn>
                <CreditsHeader>Credits</CreditsHeader>
                <CreditsList>
                  <CreditItem>
                    <CreditName>Dr. Cintia Cristia</CreditName> — <CreditRole>Lead Researcher</CreditRole>
                  </CreditItem>
                  <CreditItem>
                    <CreditName>David Bouchard</CreditName> — <CreditRole>Researcher</CreditRole>
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
            During the pandemic, orchestras faced a crisis: how do you deliver live performance
            through a screen? Traditional video streaming flattens the spatial dimensionality of orchestral music.
            Instruments occupy a physical space, sound moves around you, and this was being lost.
            <br />
            <br />
            I proposed that we reconstruct the spatial experience at home, with added affordances of the medium.

          </IntroSection>

          <DescriptionParagraph>
            <i>Augmented Symphony</i> uses AR to let users place individual instruments anywhere in their
            physical space. Walk closer to the strings section and their volume increases.
            Move toward the brass and feel the horns swell. You become the conductor of your own arrangement,
            experiencing the music not as a fixed recording, but as a malleable spatial environment.
            <br />
            <br />
            Built in Unity with AR Foundation, the app works across iOS and Android devices, using spatial audio
            to create realistic positional sound. Each instrument tracks independently, creating an immersive,
            spatial soundscape.
          </DescriptionParagraph>

          <StyledDocImage src="/images/projects/augmented-symphony.png" alt="Augmented Symphony AR Interface" />

          <DescriptionParagraph>
            The research contribution was exploring how interactivity and spatial agency could enhance digital
            music listening. The goal was not replicating the concert hall, but reimagining it for the home. Users could create
            arrangements to their personal liking, focusing on specific instruments, experiencing the music from perspectives
            no physical concert could offer.
            <br />
            <br />
            The project was presented at EVA London 2022 alongside a research paper examining how AR and spatial
            audio could transform home listening experiences. This went past just digital delivery,
            exploring spatial interaction design and embodied musical experience.
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
