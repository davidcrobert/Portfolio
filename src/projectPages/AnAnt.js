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
  useOriginalProject,
  cleanYouTubeEmbed,
  getBackLink
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

const AnAntProjectPage = ({ project }) => {
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
          title={`ART/ ${project.title}`}
          subtitle1={project.subtitle1}
          subtitle2={project.subtitle2}
          year={project.year}
          backLink={backLink}
        />

        <ProjectContent>
          <CustomHeader>
            <ProjectDeck>
              <DeckSubtitle>
                An installation where the image only appears when the participant can no longer look at it.
              </DeckSubtitle>
              <DeckMeta>
                Unity · Python · TouchDesigner · eye detection · boid simulation
              </DeckMeta>
            </ProjectDeck>
            <IntroBody>
              <CustomSubtitle>
                In <i>AN ANT HAS DRAWN A RECOGNIZABLE CARICATURE OF WINSTON CHURCHILL</i>, a participant
                sits in front of a projection that withholds its image until they close their eyes.
                Python-based eye detection watches for that threshold; only then does the room shift from a
                blank command into a hidden visual field of swarming motion and degraded tape sound.
              </CustomSubtitle>
            </IntroBody>
          </CustomHeader>

          {mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(mediaEmbed) }} />
          )}
        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default AnAntProjectPage;


