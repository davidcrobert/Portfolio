import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.css';
import Header from './Header';

const Category = ({ title, subtitle1, subtitle2, projects }) => {
  const projectCount = projects.length;

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
          <section 
            key={project.id} 
            className={`${styles.project} ${styles[`projectCount${projectCount}`]}`}
          >
            <Link 
              to={project.link} 
              className={`${styles.title} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              {project.title}
            </Link>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: project.description }}></p>
          </section>
        ))}
      </section>
    </div>
  );
};

export default Category;