import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import styles from './ProjectPage.module.css';
import { projectData } from '../data/projectData';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Find the project across all categories
  let project, categoryData;
  for (const category in projectData) {
    const foundProject = projectData[category].projects.find(p => p.link === `/projects/${projectId}`);
    if (foundProject) {
      project = foundProject;
      categoryData = projectData[category];
      break;
    }
  }

  if (!project) {
    navigate('/404');
    return null;
  }

  return (
    <div className={styles.projectPage}>
      <Header
        title={`${categoryData.title}/${project.title}`}
        subtitle1={project.subtitle1}
        subtitle2={project.subtitle2}
        year={project.year}
        backLink={`/${categoryData.title.toLowerCase().replace(' ', '-')}`}
      />

      <h2 className={styles.designQuestion}>{project.question}</h2>
      
      <section className={styles.designContent}>
        <div dangerouslySetInnerHTML={{ __html: project.content }} />

        {project.mediaEmbed && (
          <div className={styles.mediaEmbed} dangerouslySetInnerHTML={{ __html: project.mediaEmbed }} />
        )}

        {project.additionalInfo && (
          <div className={styles.additionalInfo} dangerouslySetInnerHTML={{ __html: project.additionalInfo }} />
        )}

        <p className={styles.technologies}>
          <i>Technologies:</i> {project.technologies}
        </p>
      </section>
    </div>
  );
};

export default ProjectPage;