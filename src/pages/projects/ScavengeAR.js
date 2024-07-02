import React from 'react';
import ProjectPage from '../../components/ProjectPage';
import styles from '../../components/ProjectPage.module.css';

const ScavengeARProject = () => {
  const content = `
    <p>
      Scavenge AR_ allows a small business to create a simple virtual environment to tie into their business. Customers are invited to join 
      the Metaverse-shop, where they can move through the space and see other users in real-time - this was managed using Node.js and WebSockets. 
    </p>

    <section class="${styles.scavengeGifs} ${styles.firstGifs}">
      <img src="../Assets/MultiUser.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Multi-user interaction"/>
      <img src="../Assets/QuestList.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Quest list"/>
      <img src="../Assets/SignUp.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Sign up process"/>
    </section>
    
    <p>
      In the Metaverse they can access "quests" that earn them and the virtual store points. These quests are tasks that have to be completed in-store 
      by scanning QR codes under certain circumstances - say a certain time of day or a certain number of days in a row. This logic was all handled in Node.js. 
      By completing a quest, they earn points towards their account, as well as a group total for the store. Once enough collective points are earned, the store "evolves."
    </p>

    <section class="${styles.scavengeGifs}">
      <img src="../Assets/EV1.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 1"/>
      <img src="../Assets/EV2.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 2"/>
      <img src="../Assets/EV3.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 3"/>
      <img src="../Assets/EV4.gif" class="${styles.scanvengeDoc} ${styles.gif}" alt="Evolution 4"/>
    </section>

    <p>
      Users are able to setup an account so that their data - what their avatar looks like, how many points they have, what quests they've completed - is all 
      unique and persistent, which was all handled using MongoDB.
    </p>

    <p>
      The interface was developed using React, and the 3D environment used Three.js.
    </p>

    <p>
      For my role in the project, I developed all of the traditional front-end aspects using React. I also did all of the back-end, building the persistent data structures, 
      the ability to complete quests by scanning QR codes based on specific conditions, as well as the multi-user environment - this was all Node.js, MongoDB, and WebSockets. 
      I also created the generative avatars using Three.js.
    </p>
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
      <p className={styles.warning}>
        There are some issues with this site, including that there are old avatars around and the entire store evolution 
        has happened even though no points have been earned. I unfortunately no longer have access to fix these issues.
      </p>
    </ProjectPage>
  );
};

export default ScavengeARProject;