import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import styles from './ProjectPage.module.css';
import { projectData } from '../data/projectData';
import ScavengeARMedia from './ScavengeARMedia';
import ReflectionInteractive from './ReflectionInteractive';

const customComponents = {
  ScavengeARMedia,
  ReflectionInteractive
};

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isBlurred, setIsBlurred] = useState(false);

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

  const CustomComponent = project.customComponent ? customComponents[project.customComponent] : null;

  // Function to apply external link styling
  const applyExternalLinkStyling = (html) => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.querySelectorAll('a');
    links.forEach(link => {
      if (link.getAttribute('target') === '_blank') {
        link.classList.add(styles.externalLink);
      }
    });
    return doc.body.innerHTML;
  };

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <div className={`${styles.projectPage} ${isBlurred ? styles.blurred : ''}`}>
      <Header
        title={`${categoryData.title}/${project.title}`}
        subtitle1={project.subtitle1}
        subtitle2={project.subtitle2}
        year={project.year}
        backLink={`/${categoryData.title.toLowerCase().replace(' ', '-')}`}
        showInfoButton={true}
        onInfoClick={toggleBlur}
      />

      <div className={styles.projectContent}>
        {project.question && <h2 className={styles.designQuestion}>{project.question}</h2>}
        
        <section className={styles.designContent}>
          {project.content && (
            <div dangerouslySetInnerHTML={{ __html: applyExternalLinkStyling(project.content) }} />
          )}

          {CustomComponent && <CustomComponent />}

          {project.mediaEmbed && (
            <div className={styles.mediaEmbed} dangerouslySetInnerHTML={{ __html: project.mediaEmbed }} />
          )}

          {project.additionalInfo && (
            <div className={styles.additionalInfo} dangerouslySetInnerHTML={{ __html: applyExternalLinkStyling(project.additionalInfo) }} />
          )}

          {project.technologies && project.technologies.length > 0 && (
            <p className={styles.technologies}>
              <i>Technologies:</i> {project.technologies}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProjectPage;