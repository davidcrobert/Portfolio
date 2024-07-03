import React, { useState } from 'react';
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

  const handleProjectHover = (project) => {
    setHoveredProject(project);
  };

  const handleProjectLeave = () => {
    setHoveredProject(null);
  };

  const headerTitle = hoveredProject ? `${title}/${hoveredProject.title}` : title;
  const headerSubtitle1 = hoveredProject ? hoveredProject.subtitle1 : subtitle1;
  const headerSubtitle2 = hoveredProject ? hoveredProject.subtitle2 : subtitle2;
  const headerYear = hoveredProject ? hoveredProject.year : '';

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