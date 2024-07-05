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
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoPopupRef = useRef(null);
  const [project, setProject] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const findProjectAndCategory = () => {
      for (const category in projectData) {
        const foundProject = projectData[category].projects.find(p => p.link === `/projects/${projectId}`);
        if (foundProject) {
          setProject(foundProject);
          setCategoryData(projectData[category]);
          return;
        }
      }
      navigate('/404');
    };

    findProjectAndCategory();
  }, [projectId, navigate]);

  const toggleInfo = useCallback(() => {
    setIsInfoOpen(prev => !prev);
  }, []);

  const closeInfoPopup = useCallback(() => {
    const infoPopup = infoPopupRef.current;
    if (infoPopup) {
      infoPopup.classList.add(styles.fadeOut);
      setTimeout(() => {
        setIsInfoOpen(false);
      }, 750);
    }
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isInfoOpen) {
        closeInfoPopup();
      }
    };

    const handleOutsideClick = (event) => {
      if (infoPopupRef.current && !infoPopupRef.current.contains(event.target) && isInfoOpen) {
        closeInfoPopup();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isInfoOpen, closeInfoPopup]);

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
    <div className={`${styles.projectPage} ${isInfoOpen ? styles.blurred : ''}`}>
      <Header
        title={`${categoryData.title}/${project.title}`}
        subtitle1={project.subtitle1}
        subtitle2={project.subtitle2}
        year={project.year}
        backLink={`/${categoryData.title.toLowerCase().replace(' ', '-')}`}
        showInfoButton={true}
        onInfoClick={toggleInfo}
        isInfoOpen={isInfoOpen}
      />

      <div className={styles.projectContent}>
        {CustomComponent && <CustomComponent />}

        {project.mediaEmbed && (
          <div className={styles.mediaEmbed} dangerouslySetInnerHTML={{ __html: project.mediaEmbed }} />
        )}
      </div>
      
      {isInfoOpen && (
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