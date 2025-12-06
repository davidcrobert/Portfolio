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
  Gif,
  DocImage,
  Quote,
  useOriginalProject,
  cleanYouTubeEmbed,
  getCategoryPrefix,
  getBackLink
} from './BaseProjectPage';

// Project-specific styled component override
const BeastQuote = styled(Quote)`
  /* BeastQuote uses same styling as base Quote */
`;

const TheBeastProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
            <CustomTitle>What is a 'bodily identity' in the age of AI?</CustomTitle>
            <CustomCategory>[individual project]</CustomCategory>
            <CustomSubtitle>
              Produced during my time as an artist-in-residence at Fabrica,
              <i> I SURRENDERED MY BODY AND I SUCCUMBED TO THE BEAST</i> is an exploration of AI
              bodily-hijacking and the ways in which we submit to it.
              <br />
              <br />
              A screen, a microphone, and a speaker sat in an agora. The screen begged for people
              to speak to it. Upon indulging it, it prompted them to speak to it for 60 seconds.
              <br />
              <br />
              Having found a way to monologue for 60 seconds, they were greeted by a chorus of
              former recordings of people having done the same. A few moments later, they were
              met by their own voice saying things they had never said before.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <DescriptionParagraph>
            I sat at my desk one day and received a phone call from an unknown number.
            I picked up, said 'hello', and the call cut out. A few minutes later a call from
            the same number came in, I picked up, said 'hello', and the call cut out.
            <br />
            <br />
            I feared, in this moment, I had just supplied the necessary tools to hijack me.
          </DescriptionParagraph>

          <DocImage src="/images/projects/TheBeast/people-talking.jpg" alt="The Beast Text" />

          <DescriptionParagraph>
            We have suddenly and violently entered into a time where our bodies no longer
            have unique claims to our identity. Anyone, at any time, can make a reliably
            believable clone of me, or anyone else.
            <br />
            <br />
            Why would we engage with a world where our corporeal selves
            can be harvested for digital others? Why would I pick up the call?
            <br />
            <br />
            <span style={{ fontFamily: 'Segoe UI', fontStyle: 'italic', textAlign: 'center' }}>Why would you succumb to The Beast?</span>
          </DescriptionParagraph>

          <BeastQuote>
            A sparrow's been living inside of me.
          </BeastQuote>

          <Gif src="/images/projects/TheBeast/the-beast-text.gif" alt="The Beast Text stream. Please talk to me where am I don't leave me alone" />

          <DescriptionParagraph>
            Yet as the The Beast begged for people not to leave it alone, audiences still stepped up
            and joined the cloned chorus.
            <br />
            <br />
            When their cloned voices spoke back to them, it spoke of discomforts of its body,
            struggling with its new materiality.
          </DescriptionParagraph>

          <DocImage src="/images/projects/TheBeast/setup.jpg" alt="The Beast Setup" />

          <BeastQuote>
            I've got a rock stuck in my teeth and I can't seem to get it out.
          </BeastQuote>

          <DescriptionParagraph>
            This was as much a critique of the territory of the body in the age of AI
            as it was an exploration of the ways we engage with it. Why do we engage with it?
            What do we let it take from us?
            <br />
            <br />
            <span style={{ fontFamily: 'Segoe UI', fontStyle: 'italic', textAlign: 'center' }}>
              What do we choose to share with The Beast?
            </span>
          </DescriptionParagraph>

          <Gif src="/images/projects/TheBeast/user-talking.gif" alt="User talking to mic." />

          <BeastQuote>
            I've got all these extra organs and nowhere to put them.
          </BeastQuote>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default TheBeastProjectPage;
