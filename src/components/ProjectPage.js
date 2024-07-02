import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import styles from './ProjectPage.module.css';

const ProjectPage = ({ title, subtitle1, subtitle2, question, content, technologies, backLink, mediaEmbed, additionalInfo, children }) => {
  return (
    <div className={styles.projectPage}>
      <Header
        title={title}
        subtitle1={subtitle1}
        subtitle2={subtitle2}
        backLink={backLink}
      />

      <h2 className={styles.designQuestion}>{question}</h2>
      
      <section className={styles.designContent}>
        <div dangerouslySetInnerHTML={{ __html: content }} />

        {mediaEmbed && (
          <div className={styles.mediaEmbed} dangerouslySetInnerHTML={{ __html: mediaEmbed }} />
        )}

        {children}

        {additionalInfo && (
          <div className={styles.additionalInfo} dangerouslySetInnerHTML={{ __html: additionalInfo }} />
        )}

        <p className={styles.technologies}>
          <i>Technologies:</i> {technologies}
        </p>
      </section>
    </div>
  );
};

export default ProjectPage;