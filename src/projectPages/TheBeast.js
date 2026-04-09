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

const IntroSection = styled(DescriptionParagraph)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 40px auto;
  align-items: center;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const VerticalImage = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid black;
  display: block;
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
            <CustomCategory>[individual project]</CustomCategory>
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
              Having found a way to monologue for a full minute, they were greeted by a chorus of
              former recordings of people having done the same. A few moments later, they were
              met by their own voice saying things they had never said before. Then the cacophony
              of previous voice clones layered in, saying similar things.
              <br />
              <br />
              They had joined The Beast.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <IntroSection>
            I sat at my desk one day and received a phone call from an unknown number.
            I picked up, said 'hello', and the call cut out. A few minutes later a call from
            the same number came in, I picked up, said 'hey', and the call cut out again.
            <br />
            <br />
            In that moment I feared I had just supplied the necessary tools to hijack me.
            It only takes a few seconds to know someone's voice.
          </IntroSection>

          <StyledDocImage src="/images/projects/TheBeast/people-talking.JPG" alt="People talking to The Beast" />

          <DescriptionParagraph>
            We have suddenly and violently entered into a time where our bodies no longer
            have unique claims to our identity. Anyone, at any time, can make a
            convincing clone of me, or anyone else. The world is a deepfake.
            <br />
            <br />
            Why would we engage with a world where our corporeal selves
            can be harvested for digital others? Why would I pick up the call?
            <EmphasisText>Why would you succumb to The Beast?</EmphasisText>
          </DescriptionParagraph>

          <BeastQuote>
            A sparrow's been living inside of me.
          </BeastQuote>

          <StyledGif src="/images/projects/TheBeast/the-beast-text.gif" alt="The Beast Text stream. Please talk to me where am I don't leave me alone" />

          <DescriptionParagraph>
            Yet as The Beast begged for people not to leave it alone, audiences still stepped up
            and joined the cloned chorus.
            <br />
            <br />
            Maybe they wanted to help it feel less alone. Maybe they wanted to be there for it.
            <br />
            <br />
            Maybe they wanted to be part of something.
            <br />
            <br />
            When their cloned voices spoke back to them, it spoke of discomforts of its body,
            struggling with its new materiality.
          </DescriptionParagraph>

          <ImageGrid>
            <VerticalImage src="/images/projects/TheBeast/mic_vertical.jpg" alt="Microphone setup" />
            <StyledDocImage src="/images/projects/TheBeast/setup.jpg" alt="The Beast Setup" />
            <VerticalImage src="/images/projects/TheBeast/person_vertical.jpg" alt="Person interacting" />
          </ImageGrid>

          <BeastQuote>
            I've got a rock stuck in my teeth and I can't seem to get it out.
          </BeastQuote>

          <DescriptionParagraph>
            This was as much a critique of the territory of the body in the age of AI
            as it was an exploration of the ways we engage with it. Why do we engage with it?
            What do we let it take from us?
            <EmphasisText>What do we choose to share with The Beast?</EmphasisText>
          </DescriptionParagraph>

          <StyledGif src="/images/projects/TheBeast/user-talking.gif" alt="User talking to mic." />

          <BeastQuote>
            I've got all these extra organs and nowhere to put them.
          </BeastQuote>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default TheBeastProjectPage;
