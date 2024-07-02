import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.css';
import Header from './Header';

const ProjectSection = ({ project, index }) => (
  <section className={`${styles.project} ${styles[`projectCount${project.totalProjects}`]}`}>
    <Link 
      to={project.link} 
      // className={`${styles.title} ${index % 2 === 0 ? styles.left : styles.right}`}
      className={`${styles.title} ${styles.back}`}
    >
      {project.title}
    </Link>
    <p className={styles.description} dangerouslySetInnerHTML={{ __html: project.description }}></p>
  </section>
);

const Category = ({ title, subtitle1, subtitle2, projects }) => {
  return (
    <div className={styles.category}>
      <Header 
        title={title}
        subtitle1={subtitle1}
        subtitle2={subtitle2}
        backLink="/"
      />
      <section className={styles.projectList}>
        {projects.map((project, index) => (
          <ProjectSection 
            key={project.id} 
            project={{...project, totalProjects: projects.length}}
            index={index}
          />
        ))}
      </section>
    </div>
  );
};

export default Category;