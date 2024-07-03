import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import ReflectionInteractive from '../../components/ReflectionInteractive';
import styles from './IAskedMyReflection.module.css';

const IAskedMyReflectionProject = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const updateCanvasSize = useCallback(() => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    setCanvasSize({
      width: Math.min(containerWidth * 0.8, 800),
      height: Math.min(containerHeight * 0.8, 600)
    });
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <div className={styles.projectContainer}>
      <Header 
        title="I ASKED MY REFLECTION ITS NAME AGAIN"
        subtitle1="Recursive"
        subtitle2="Interaction"
        backLink="/web"
      />
      <div className={styles.interactiveContainer}>
        <ReflectionInteractive width={canvasSize.width} height={canvasSize.height} />
      </div>
    </div>
  );
};

export default IAskedMyReflectionProject;