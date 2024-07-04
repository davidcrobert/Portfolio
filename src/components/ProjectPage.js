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
        }, 750);
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
    return null;
  }

  const CustomComponent = project.customComponent ? customComponents[project.customComponent] : null;

  const renderMultiLineText = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
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
          {project.infoPopup.mainStatement && (
            <h2 className={styles.mainStatement}>{project.infoPopup.mainStatement}</h2>
          )}
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>Context</h3>
            <p>{renderMultiLineText(project.infoPopup.context)}</p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>Tech</h3>
            <p>{renderMultiLineText(project.infoPopup.tech)}</p>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoHeader}>{renderMultiLineText(project.infoPopup.tools)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;