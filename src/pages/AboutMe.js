import React from 'react';
import styles from '../styles/AboutMe.module.css';
import Header from '../components/Header';

const AboutMe = () => {
  return (
    <div className={styles.aboutMe}>
      <Header 
        title="About Me"
        subtitle1="Professionally"
        subtitle2="& Personally"
        backLink="/"
      />

      <div className={styles.test}>
        <a className={`${styles.resume} ${styles.skew} ${styles.right}`} href="CV-DavidRobert.pdf" target="_blank" rel="noopener noreferrer">résumé</a>
      </div>

      <section className={styles.about}>
        <p className={styles.left}>I'm a Creative Technologist at <a href="https://antimodular.com/" target="_blank" rel="noopener noreferrer">Antimodular Research</a>, working for the artist Rafael Lozano-Hemmer</p>
        <p className={styles.right}>I studied Media Production [concentration in Digital Media] at Toronto Metropolitan University [TMU]</p>
        <p className={styles.left}>I use TouchDesigner, Unreal Engine, Unity, physical computing, and the web to create responsive environments</p>
        <p className={styles.right}>I'm originally from a small town in southern Ontario [Canada]</p>
        <p className={styles.left}>I was a Creative Technologist at TMU's <a href="https://www.ryerson.ca/design-technology-lab/" target="_blank" rel="noopener noreferrer">Design + Technology LAB</a></p>
        <p className={styles.right}>I currently live in Montreal [Canada]</p>
        <p className={styles.left}>I was a Research Assistant in the <a href="https://www.torontomu.ca/bergmann/research/tripl/" target="_blank" rel="noopener noreferrer">Technology Research in Performance Lab</a> on a project involving improvised human-AI co-performances using the OpenAI API</p>
        <p className={styles.right}>I'm interested in food and fashion</p>
        <p className={styles.left}>I was previously a Creative Developer Intern at <a href="https://www.jam3.com/" target="_blank" rel="noopener noreferrer">Jam3</a></p>
        <p className={styles.right}>I like techno and classical music</p>
        <p className={styles.left}>I also used to be a Research Assistant investigating <a href="http://dx.doi.org/10.14236/ewic/EVA2022.39" target="_blank" rel="noopener noreferrer">AR and spatialized sound</a> for user experience in digitally-delivered orchestral music</p>
        <p className={styles.right}>I value physical spaces</p>
        <p className={styles.left}>My dream work is to extend the lived environment through interactive technology</p>
        <p className={styles.right}>I really like projections</p>
      </section>
    </div>
  );
};

export default AboutMe;