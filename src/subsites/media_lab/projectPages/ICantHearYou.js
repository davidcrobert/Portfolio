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

const ICantHearYouProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
            <CustomTitle>Will we try to help someone even if we know we probably can't?</CustomTitle>
            <CustomCategory>[personal project]</CustomCategory>
            <CustomSubtitle>
              <i>I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER</i> is a networked performance
              about miscommunication and the limits of empathy. One person sits alone in a dark room, unable to hear
              a group trying to speak to them. The group can hear the isolated person, but the person cannot hear the group,
              seeing only a translation in the form of abstract visual patterns on the wall.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <IntroSection>
            I separated people. One participant went alone into a large, dark studio. Their phone was taken.
            They sat in a high chair with only a microphone and a wall of projected green lines for company.
            The rest of the group stayed in a warmly lit room, seated in a semi-circle, facing each other.
            <br />
            <br />
            They were connected by an audio stream. The group could hear the participant. The participant could hear nothing.
            <EmphasisText>What they did was up to them.</EmphasisText>
          </IntroSection>

          <DescriptionParagraph>
            The participant sat in silence, watching green lines shift and pulse on the wall. A real-time
            visualization of the group's attempts to communicate. They could see that something was being said,
            but the content remained inaccessible. The group could hear the participant try to understand,
            try to connect.
          </DescriptionParagraph>

          <ParticipantQuote>
            "It's lonely down here, it really is."
          </ParticipantQuote>

          <DescriptionParagraph>
            This asymmetry created a peculiar dynamic. The group surely knew there was no way to actually converse.
            And yet they tried. And even though there was no meaning to actually extract, the participant
            responded to silence, to patterns, to nothing.
          </DescriptionParagraph>

          <ParticipantQuote>
            "The hardest part is knowing what to say to you."
          </ParticipantQuote>

          <DescriptionParagraph>
            Each performance lasted about 20 minutes.
            As time passed, the isolated participant's sense of the situation would shift. The breakdown of human communication
            had collapsed, and now they were just conversing with an abstraction. A digital being of sorts. What began as confusion
            became something stranger. They were, well, alone.
          </DescriptionParagraph>

          <DescriptionParagraph>
            The piece asks: if we know our efforts to help are futile, will we still try? Do we not want this person to be alone?
            <br />
            <br />
            How groups handle discomfort is an important thing. What are we willing to do for others, and how far does it go?
            How long are we able to maintain a trust, a human connection, when we are so separated?
          </DescriptionParagraph>

          <ParticipantQuote>
            "Now I'm at this point where it doesn't even feel like I'm interacting with humans anymore."
          </ParticipantQuote>

        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default ICantHearYouProjectPage;
