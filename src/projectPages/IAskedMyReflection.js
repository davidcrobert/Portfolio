import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ReflectionInteractive from '../components/ReflectionInteractive';
import {
  PageWrapper,
  MainContent,
  ProjectContent,
  CustomHeader,
  CustomTitle,
  useOriginalProject,
  getBackLink
} from '../subsites/media_lab/projectPages/BaseProjectPage';

// Interactive component container - centers the sketch and counteracts its internal offset
const InteractiveContainer = styled.div`
  width: 100%;
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* Counteract the 15% horizontal offset from the p5 sketch canvas */
  > div > canvas {
    transform: translate(15%, 0%) !important;
  }

  @media screen and (max-width: 768px) {
    margin: 8px auto 0;
  }
`;

const CompactHeader = styled(CustomHeader)`
  margin-bottom: 10px;
  padding: 12px 20px;
`;

const DeckMeta = styled.p`
  margin: 10px 0 0;
  font-size: 15px;
  line-height: 1.45;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
`;

const IAskedMyReflectionProjectPage = ({ project, subsiteContext, subsiteId }) => {
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
          {/* <CompactHeader>
            <CustomTitle>How would you act if there were 200 of you in a room?</CustomTitle>
            <DeckMeta>JavaScript · p5.js · AI</DeckMeta>
          </CompactHeader> */}

          <InteractiveContainer>
            <ReflectionInteractive />
          </InteractiveContainer>
        </ProjectContent>
      </MainContent>
    </PageWrapper>
  );
};

export default IAskedMyReflectionProjectPage;
