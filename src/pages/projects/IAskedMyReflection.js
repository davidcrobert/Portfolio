import React, { useState, useEffect } from 'react';
import ProjectPage from '../../components/ProjectPage';
import styles from './IAskedMyReflection.module.css';
import ReflectionInteractive from '../../components/ReflectionInteractive';

const IAskedMyReflectionProject = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateCanvasSize = () => {
      const containerWidth = document.querySelector(`.${styles.interactiveContainer}`).offsetWidth;
      setCanvasSize({
        width: Math.min(containerWidth, 800),
        height: Math.min(containerWidth / 2, 400)
      });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

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
      content={content}
      technologies="JavaScript, p5.js"
      backLink="/web"
    >
      <div className={styles.interactiveContainer}>
        <ReflectionInteractive width={canvasSize.width} height={canvasSize.height} />
      </div>
    </ProjectPage>
  );
};

export default IAskedMyReflectionProject;