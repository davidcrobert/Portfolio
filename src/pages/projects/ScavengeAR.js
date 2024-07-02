import React from 'react';
import ProjectPage from '../../components/ProjectPage';
import styles from './ScavengeAR.module.css';

const ScavengeARProject = () => {
  const content = `
    <p>
      Made as a major project for my internship at <a href="https://www.jam3.com/"
      target="_blank" rel="noopener noreferrer">Jam3</a>, alongside one other Creative Developer Intern, two Design Interns, and a Production Intern.
      Our brief was to create a solution / prototype for a way to help bring small businesses into the Metaverse. To access the website directly, 
      use this <a href="https://d16ezodv61vppw.cloudfront.net/" target="_blank" rel="noopener noreferrer">link</a>. There are both desktop and mobile versions.
    </p>

    <p>
      Scavenge AR_ allows a small business to create a simple virtual environment to tie into their business. Customers are invited to join 
      the Metaverse-shop, where they can move through the space and see other users in real-time - this was managed using Node.js and WebSockets. 
    </p>

    <div class="${styles.gifContainer}">
      <img src="/assets/MultiUser.gif" class="${styles.gif}" alt="Multi-user interaction"/>
      <img src="/assets/QuestList.gif" class="${styles.gif}" alt="Quest list"/>
      <img src="/assets/SignUp.gif" class="${styles.gif}" alt="Sign up process"/>
    </div>
    
    <p>
      In the Metaverse they can access "quests" that earn them and the virtual store points. These quests are tasks that have to be completed in-store 
      by scanning QR codes under certain circumstances - say a certain time of day or a certain number of days in a row. This logic was all handled in Node.js. 
      By completing a quest, they earn points towards their account, as well as a group total for the store. Once enough collective points are earned, the store "evolves."
    </p>

    <section class="${styles.scavengeGifs}">
      <img src="/assets/EV1.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 1"/>
      <img src="/assets/EV2.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 2"/>
      <img src="/assets/EV3.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 3"/>
      <img src="/assets/EV4.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 4"/>
    </section>

    <!-- Rest of the content remains the same -->
  `;

  return (
    <ProjectPage
      title="ScavengeAR_"
      subtitle1="Small Businesses"
      subtitle2="& the Metaverse"
      question="How can we reduce the upfront cost/work for small businesses entering the Metaverse?"
      content={content}
      technologies="Three.js, Node.js, React, MongoDB"
      backLink="/web"
    >
    </ProjectPage>
  );
};

export default ScavengeARProject;