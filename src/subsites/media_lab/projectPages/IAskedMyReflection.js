import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import ReflectionInteractive from '../../../components/ReflectionInteractive';
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
  Quote,
  useOriginalProject,
  cleanYouTubeEmbed,
  getCategoryPrefix,
  getBackLink
} from './BaseProjectPage';

// Interactive component container - centers the sketch and counteracts its internal offset
const InteractiveContainer = styled.div`
  width: 100%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* Counteract the 15% horizontal offset from the p5 sketch canvas */
  > div > canvas {
    transform: translate(15%, 0%) !important;
  }

  @media screen and (max-width: 768px) {
    margin: 20px auto;
  }
`;

const IAskedMyReflectionProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
            <CustomTitle>If there are enough of you, can you lose track of yourself?</CustomTitle>
            <CustomCategory>[personal project]</CustomCategory>
            <CustomSubtitle>
              In <i>I ASKED MY REFLECTION ITS NAME AGAIN</i>, users are given a simple
              direction to move their mouse. As time goes on, more and more cursors
              appear, mimicking (though not copying) the user's movements.
            </CustomSubtitle>
          </CustomHeader>

          <InteractiveContainer>
            <ReflectionInteractive />
          </InteractiveContainer>

          <Quote>
            A cursor is our digital avatar - a projection of our body in the digital realm.
          </Quote>

          <DescriptionParagraph>
            The cursors imitate users' behavior based on their previous movements using a Markov chain model.
            As cursors appear and users become aware of the role they play in their movement, this affects
            how they interact with the site. Which will in turn affect the cursors. Which will in turn
            affect the user. Which will in turn affect the cursors.
            <br />
            <br />
            This project explores a sort of recursive interaction with AI. The ways in which
            intelligent systems transform our behaviour and how we transform them.
          </DescriptionParagraph>

          <DescriptionParagraph>
            As the experience progresses, users receive less and less actionable commands.
            It's their call what they want to do with that.
          </DescriptionParagraph>

          <Quote>
            Ask your reflection its name.
          </Quote>
        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default IAskedMyReflectionProjectPage;
