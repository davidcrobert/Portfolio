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

const IntroSection = styled(DescriptionParagraph)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ReflectionQuote = styled(Quote)`
  font-size: 24px;
  margin: 40px auto;
  padding: 30px 20px;
  max-width: 600px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 20px 15px;
    margin: 30px auto;
  }
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
            <CustomTitle>How would you act if there were 200 of you in a room?</CustomTitle>
            {/* <CustomCategory>[individual project]</CustomCategory> */}
            <CustomSubtitle>
              In <i>I ASKED MY REFLECTION ITS NAME AGAIN</i>, users are given a simple
              direction to move their mouse. As time goes on, more and more cursors
              appear, mimicking (though not copying) the user's movements.
            </CustomSubtitle>
          </CustomHeader>

          <InteractiveContainer>
            <ReflectionInteractive />
          </InteractiveContainer>

          <ReflectionQuote>
            A cursor is our digital avatar.<br /> A projection of our body in the digital realm.
          </ReflectionQuote>

          <IntroSection>
            The cursors imitate users' behavior based on their previous movements using a Markov chain model.
            As cursors appear and users become aware of the role they play in their movement, this affects
            how they interact with the site. Which will in turn affect the cursors. Which will in turn
            affect the user. Which will in turn affect the cursors.
            <br />
            <br />
            This project explores a sort of recursive interaction with AI. The ways in which
            intelligent systems transform our behaviour and how we transform them.
          </IntroSection>

          <DescriptionParagraph>
            As the experience progresses, users receive inactionable commands.
            It's their call what they want to do with that.
          </DescriptionParagraph>

          <ReflectionQuote>
            Ask your reflection its name.
          </ReflectionQuote>
          <ReflectionQuote>
            I asked my reflection its name again.
          </ReflectionQuote>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default IAskedMyReflectionProjectPage;
