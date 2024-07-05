import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.css';
import Header from './Header';

const ProjectSection = ({ project, index, onMouseEnter, onMouseLeave }) => (
  <section className={`${styles.project} ${styles[`projectCount${project.totalProjects}`]}`}>
    <Link 
      to={project.link} 
      className={`${styles.title} ${styles.back}`}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
    >
      {project.title}
    </Link>
    <p className={styles.description} dangerouslySetInnerHTML={{ __html: project.description }}></p>
  </section>
);

const Category = ({ title, subtitle1, subtitle2, projects }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleProjectHover = (project) => {
    if (!isMobile) {
      setHoveredProject(project);
    }
  };

  const handleProjectLeave = () => {
    if (!isMobile) {
      setHoveredProject(null);
    }
  };

  const headerTitle = isMobile ? title : (hoveredProject ? `${title}/${hoveredProject.title}` : `${title}/`);
  const headerSubtitle1 = isMobile ? subtitle1 : (hoveredProject ? hoveredProject.subtitle1 : subtitle1);
  const headerSubtitle2 = isMobile ? subtitle2 : (hoveredProject ? hoveredProject.subtitle2 : subtitle2);
  const headerYear = isMobile ? '' : (hoveredProject ? hoveredProject.year : '');

  return (
    <div className={styles.category}>
      <Header 
        title={headerTitle}
        subtitle1={headerSubtitle1}
        subtitle2={headerSubtitle2}
        year={headerYear}
        backLink="/"
      />
      <section className={styles.projectList}>
        {projects.map((project, index) => (
          <ProjectSection 
            key={project.id} 
            project={{...project, totalProjects: projects.length}}
            index={index}
            onMouseEnter={handleProjectHover}
            onMouseLeave={handleProjectLeave}
          />
        ))}
      </section>
    </div>
  );
};

export default Category;