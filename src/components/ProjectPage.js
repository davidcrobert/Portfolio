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

  const closeInfoPopup = useCallback(() => {
    const infoPopup = infoPopupRef.current;
    if (infoPopup) {
      infoPopup.classList.add(styles.fadeOut);
      setIsBlurred(false);
      setTimeout(() => {
        setShowInfo(false);
      }, 750);
    }
  }, []);

  const toggleInfo = useCallback(() => {
    if (!isBlurred) {
      setIsBlurred(true);
      setShowInfo(true);
    } else {
      closeInfoPopup();
    }
  }, [isBlurred, closeInfoPopup]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isBlurred) {
        closeInfoPopup();
      }
    };

    const handleOutsideClick = (event) => {
      if (infoPopupRef.current && !infoPopupRef.current.contains(event.target) && isBlurred) {
        closeInfoPopup();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isBlurred, closeInfoPopup]);

  if (!project || !categoryData) {
    return null;
  }

  const CustomComponent = project.customComponent ? customComponents[project.customComponent] : null;

  const processHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    doc.querySelectorAll('a').forEach(link => {
      link.classList.add(styles.externalLink);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    return doc.body.innerHTML;
  };

  const renderHTML = (html) => {
    return { __html: processHTML(html) };
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
        {CustomComponent && <CustomComponent />}

        {project.mediaEmbed && (
          <div className={styles.mediaEmbed} dangerouslySetInnerHTML={{ __html: project.mediaEmbed }} />
        )}
      </div>
      
      {showInfo && (
        <div ref={infoPopupRef} className={styles.infoPopup}>
          {project.infoPopup.main && (
            <h2 className={styles.mainStatement}>{project.infoPopup.main}</h2>
          )}
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>Context</h3>
            <p dangerouslySetInnerHTML={renderHTML(project.infoPopup.context)}></p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>Tech</h3>
            <p dangerouslySetInnerHTML={renderHTML(project.infoPopup.tech)}></p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>{project.infoPopup.tools}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;