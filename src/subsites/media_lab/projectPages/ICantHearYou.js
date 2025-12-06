import React from 'react';
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
            <CustomTitle>I'm Sorry I Can't Hear You - Custom Content Here</CustomTitle>
            <CustomCategory>[personal project]</CustomCategory>
            <CustomSubtitle>
              Add your custom content and description for this project here.
            </CustomSubtitle>
          </CustomHeader>

          {originalProject.mediaEmbed && (
            <MediaEmbed dangerouslySetInnerHTML={{ __html: cleanYouTubeEmbed(originalProject.mediaEmbed) }} />
          )}

          <DescriptionParagraph>
            This is a placeholder paragraph for I Can't Hear You.
            Replace this with your custom content highlighting the project's relevance to Media Lab.
          </DescriptionParagraph>

          {/* Add more custom content sections here */}
        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default ICantHearYouProjectPage;
