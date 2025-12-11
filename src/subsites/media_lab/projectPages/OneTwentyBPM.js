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

const Instructions = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  line-height: 1.8;
  text-align: left;
  
  max-width: 500px;
  background-color: #fafafa;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 15px;
  }
`;

const InstructionLine = styled.p`
  margin: 8px 0;
  font-style: italic;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ParticipantQuote = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  color: #1a1a1a;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
  font-weight: 500;
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

const StyledDocImage = styled(DocImage)`
  border: 1px solid black;
  margin: 40px auto;
  display: block;
`;

const OneTwentyBPMProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
            <CustomTitle>Will we accept our discomfort in order to stop someone else's?</CustomTitle>
            <CustomCategory>[individual project]</CustomCategory>
            <CustomSubtitle>
              <i>ONE HUNDRED AND TWENTY BEATS PER MINUTE</i> is a networked performance about collective responsibility.
              An audience on Zoom watched a machine strike me in the head, over and over, while I sat alone
              in a room. They could stop it by talking. They could start it again by staying quiet.
              What they chose to do was entirely up to them.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <DescriptionParagraph>
            Before the performance began, I posted instructions in the Zoom chat with my camera off.
            There was no further explanation. Just rules.
          </DescriptionParagraph>

          <Instructions>
            <InstructionLine>Enough noise stops the machine</InstructionLine>
            <InstructionLine>Enough quiet starts the machine</InstructionLine>
            <InstructionLine>You are welcome to participate</InstructionLine>
            <InstructionLine>You do not have to participate</InstructionLine>
            <InstructionLine>I do not care if or how you participate</InstructionLine>
            <InstructionLine>If you are to participate please use only your own voice or body</InstructionLine>
          </Instructions>

          <DescriptionParagraph>
            Then I turned on my camera. The source of the clicking sound was revealed. The rest was up to my audience.
            <br />
            <br />
            In the 3 times I performed this piece, no audience started talking immediately. There was some confusion. A lot of
            discomfort. An inability to be the first one to start talking.
            <br />
            <br />
            With time people came out of their shells. They started talking to each other.
          </DescriptionParagraph>

          <ParticipantQuote>
            Oh is that, like, actually going to hurt him?
          </ParticipantQuote>

          <DescriptionParagraph>
            Each performance lasted 15 minutes. That is a long time to sustain a strained conversation with people you hardly know.
            That is a long time to watch someone sit in silence and get hit in the head.
            The audience had to find the will and way to sustain conversation
            for that long over Zoom. In all 3 performances, the groups lost their momentum and failed to keep up conversation.
            <br />
            <br />
            All 3 performances ended with me getting hit in the head.
            <br />
            <br />
            The piece created a feedback loop of discomfort. Both physical and social.
          </DescriptionParagraph>

          <ParticipantQuote>
            And we don't personally personally know you, or, I don't personally know you, David, but I don't want you to go through this.
          </ParticipantQuote>

          <DescriptionParagraph>
            What do we owe each other? <br /> Are we able to endure discomfort to help someone else?
          </DescriptionParagraph>

          <ParticipantQuote>
            WE'VE RUN OUT OF THINGS TO SAY
          </ParticipantQuote>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default OneTwentyBPMProjectPage;
