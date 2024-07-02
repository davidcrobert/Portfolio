import React from 'react';
import ProjectPage from '../../components/ProjectPage';
import styles from '../../components/ProjectPage.module.css';

const AssemblyLineProject = () => {
  const content = `
    <p>
      Designed and developed by a team from Toronto Metropolitan University's Design + Technology LAB, <i>Assembly Line</i> emerged from the
      conditions brought on by Covid-19. Hoping to still capture the magic of an interactive installation,
      we explored ways to involve an audience in the experience while remaining distanced. Users submit 'gestures' through a web portal and watch them
      materialize in the projection. 
    </p>
    <p>
      Tracking of the box for mapping is done live using an HTC VIVE Tracker.
    </p>
    <p>
      I led the design and development, as well as solely developing the projection in TouchDesigner as well as the interactive components of the website (front-end and back-end).
    </p>
  `;

  const additionalInfo = `
    <p class="${styles.media}">
      <i>Assembly Line</i> was featured in DesignTO 2022.
    </p>
    <p class="${styles.media}">
      The CBC wrote an <a class="${styles.externalLink}"  href="https://www.cbc.ca/arts/in-toronto-here-s-where-you-can-make-art-with-a-giant-industrial-robot-1.6321499" target="_blank" rel="noopener noreferrer">article</a> about it.
    </p>
  `;

  const mediaEmbed = `
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/HDGwEiiztQw" 
      title="YouTube video player"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  return (
    <ProjectPage
      title="Assembly Line"
      subtitle1="An industrial approach"
      subtitle2="to digital interaction"
      question="How can we create meaningful interactions with installations while maintaining social distance?"
      content={content}
      additionalInfo={additionalInfo}
      technologies="TouchDesigner, OpenVR, JavaScript, Node.js, Projection, KUKA Robot Arm"
      backLink="/installation"
      mediaEmbed={mediaEmbed}
    />
  );
};

export default AssemblyLineProject;