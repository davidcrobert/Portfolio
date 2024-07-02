import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectPage.module.css';
import Header from './Header';

const ProjectPage = ({ title, subtitle1, subtitle2, question, content, technologies, backLink, mediaEmbed, children }) => {
  return (
    <div className={styles.projectPage}>
      <Header
        title={title}
        subtitle1={subtitle1}
        subtitle2={subtitle2}
        backLink={backLink}
      />

      <h2 className={styles.designQuestion}>{question}</h2>
      
      {children}

      <section className={styles.designContent}>
        {mediaEmbed && (
          <div className={styles.mediaEmbed} dangerouslySetInnerHTML={{ __html: mediaEmbed }} />
        )}

        <div dangerouslySetInnerHTML={{ __html: content }} />

        <p className={styles.technologies}>
          <i>Technologies:</i> {technologies}
        </p>
      </section>
    </div>
  );
};

export default ProjectPage;