import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [showInfo, setShowInfo] = useState(false);
  const infoPopupRef = useRef(null);

  const [project, setProject] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Find the project across all categories
    let foundProject = null;
    let foundCategoryData = null;

    for (const category in projectData) {
      foundProject = projectData[category].projects.find(p => p.link === `/projects/${projectId}`);
      if (foundProject) {
        foundCategoryData = projectData[category];
        break;
      }
    }

    if (foundProject && foundCategoryData) {
      setProject(foundProject);
      setCategoryData(foundCategoryData);
    } else {
      navigate('/404');
    }
  }, [projectId, navigate]);

  const toggleInfo = useCallback(() => {
    if (!isBlurred) {
      setIsBlurred(true);
      setShowInfo(true);
    } else {
      const infoPopup = infoPopupRef.current;
      if (infoPopup) {
        infoPopup.classList.add(styles.fadeOut);
        setIsBlurred(false);
        setTimeout(() => {
          setShowInfo(false);
        }, 750); // Match this with the CSS animation duration
      }
    }
  }, [isBlurred]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isBlurred) {
        toggleInfo();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isBlurred, toggleInfo]);

  if (!project || !categoryData) {
    return null; // or a loading spinner
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

  return (
    <div className={`${styles.projectPage} ${isBlurred ? styles.blurred : ''}`}>
      <Header
        title={`${categoryData.title}/${project.title}`}
        subtitle1={project.subtitle1}
        subtitle2={project.subtitle2}
        year={project.year}
        backLink={`/${categoryData.title.toLowerCase().replace(' ', '-')}`}
        showInfoButton={true}
        onInfoClick={toggleInfo}
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
      
      {showInfo && (
        <div ref={infoPopupRef} className={styles.infoPopup}>
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>Context</h3>
            <p>{project.infoPopup.context}</p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>Tech</h3>
            <p>{project.infoPopup.tech}</p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>Tools</h3>
            <p>{project.infoPopup.tools}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;