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
  CustomSubtitle,
  MediaEmbed,
  Gif,
  DocImage,
  InlineLink,
  useOriginalProject,
  cleanYouTubeEmbed,
  getBackLink
} from '../subsites/media_lab/projectPages/BaseProjectPage';

// Project-specific styled components
const BeastQuote = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 28px;
  color: #1a1a1a;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
  font-weight: 600;
  margin: 50px auto;
  padding: 40px 20px;
  max-width: 600px;
  position: relative;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin: 30px auto;
    padding: 25px 15px;
  }
`;

const StyledDocImage = styled(DocImage)`
  border: 1px solid black;
  margin: 40px auto;
  display: block;
`;

const StyledGif = styled(Gif)`
  border: 1px solid black;
  display: block;
  margin: 40px auto;
`;

const DeckMeta = styled.p`
  margin: 16px 0 28px;
  font-size: 15px;
  line-height: 1.45;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
`;

const IntroSection = styled(DescriptionParagraph)`
  margin-top: 40px;
  margin-bottom: 40px;
`;


const TheBeastProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const originalProject = useOriginalProject(project);

  if (!originalProject) {
    return null;
  }

  const backLink = getBackLink(subsiteId);

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
            <CustomTitle>What is a 'bodily identity' in the age of AI?</CustomTitle>
            <DeckMeta>Python · TouchDesigner · AI voice cloning</DeckMeta>
            <CustomSubtitle>
              Produced during my time as an artist-in-residence at the <InlineLink href="https://www.fabrica.it/" target="_blank" rel="noopener noreferrer">Fabrica research center</InlineLink>,
              <i> I SURRENDERED MY BODY AND I SUCCUMBED TO THE BEAST</i> is an exploration of AI
              bodily hijacking and the ways in which we submit to it.
              <br />
              <br />
              A screen, a microphone, and a speaker sat in an agora. The screen begged for people
              to speak to it. When they did, it asked them to keep talking for 60 seconds.
              <br />
              <br />
              Once they had spoken for a full minute, they were greeted by a chorus of
              everyone who had done the same before them. A few moments later, they were
              met by their own voice saying words they had never spoken. Then the cacophony
              of previous voice clones layered in — all of them saying the same kinds of things.
              <br />
              <br />
              They had joined The Beast.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <StyledDocImage src="/images/projects/TheBeast/people-talking.JPG" alt="People talking to The Beast" />

          <IntroSection>
            I sat at my desk one day and received a phone call from an unknown number.
            I picked up, said 'hello', and the call cut out. A few minutes later a call from
            the same number came in, I picked up, said 'hey', and the call cut out again.
            <br />
            <br />
            In that moment I feared I had just supplied the necessary tools to hijack me.
            It only takes a few seconds to know someone's voice.
          </IntroSection>

          <BeastQuote>
            A sparrow's been living inside of me.
          </BeastQuote>

          <StyledGif src="/images/projects/TheBeast/the-beast-text.gif" alt="The Beast Text stream. Please talk to me where am I don't leave me alone" />

          <BeastQuote>
            I've got all these extra organs and nowhere to put them.
          </BeastQuote>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default TheBeastProjectPage;
