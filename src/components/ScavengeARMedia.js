import React from 'react';
import styles from './ScavengeAR.module.css';

const ScavengeARMedia = () => {
  return (
    <div>
      <div className={styles.gifContainer}>
        <img src="/assets/MultiUser.gif" className={styles.gif} alt="Multi-user interaction"/>
        <img src="/assets/QuestList.gif" className={styles.gif} alt="Quest list"/>
        <img src="/assets/SignUp.gif" className={styles.gif} alt="Sign up process"/>
      </div>
      
      <section className={styles.scavengeGifs}>
        <img src="/assets/EV1.gif" className={styles.scanvengeDoc} alt="Evolution 1"/>
        <img src="/assets/EV2.gif" className={styles.scanvengeDoc} alt="Evolution 2"/>
        <img src="/assets/EV3.gif" className={styles.scanvengeDoc} alt="Evolution 3"/>
        <img src="/assets/EV4.gif" className={styles.scanvengeDoc} alt="Evolution 4"/>
      </section>
    </div>
  );
};

export default ScavengeARMedia;