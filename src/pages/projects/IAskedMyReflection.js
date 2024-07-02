import React from 'react';
import ProjectPage from '../../components/ProjectPage';
import styles from './IAskedMyReflection.module.css';

const IAskedMyReflectionProject = () => {
  const content = `
    <p>
      In <i>I ASKED MY REFLECTION ITS NAME AGAIN</i> users are given a simple direction at the
      beginning to move their mouse. From this point, a number of identical cursors slowly appear. 
      It becomes clear the cursors are imitating their movements. 
    </p>
    <p>
      The cursors imitate users' behaviour through a Markov model, where they learn patterns of behaviour 
      based on users' previous movements. As cursors appear and users become aware of the role they play in their movement, this 
      affects how they interact with the site. Which will in turn affect the cursors. Which will in turn affect the
      user. Which will in turn affect the cursors. Which will in turn affect the user.
    </p>
  `;

  return (
    <ProjectPage
      title="I ASKED MY REFLECTION ITS NAME AGAIN"
      subtitle1="Recursive"
      subtitle2="Interaction"
      question="How does it feel to be surrounded by yourself?"
      backLink="/web"
    >
      <iframe 
        className={styles.projectIframe} 
        src="https://i-asked-my-reflection-its-name-again.glitch.me" 
        title="I Asked My Reflection Its Name Again Demo"
      ></iframe>
      <div className={styles.contentContainer}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <p className={styles.technologies}>
          <i>Technologies:</i> JavaScript
        </p>
      </div>
    </ProjectPage>
  );
};

export default IAskedMyReflectionProject;