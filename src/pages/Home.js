import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import Sketch from '../components/Sketch';
import Header from '../components/Header';

function Home() {
  return (
    <div className={styles.index}>
      <Sketch />
      <Header 
        title="David Robert"
        subtitle1="Creative technologist"
        subtitle2="& Arts Worker"
      />
      
      <nav className={styles.nav}>
        <Link to="/installation" className={`${styles.navLink} ${styles.skewBack}`}>↳ Installation</Link>
        <Link to="/virtual-environments" className={`${styles.navLink} ${styles.skewBack}`}>↳ Virtual Environments</Link>
        <Link to="/web" className={`${styles.navLink} ${styles.skewBack}`}>↳ Web</Link>
      </nav>

      <footer className={styles.footer}>
        <Link to="/about" className={`${styles.footerLink} ${styles.skewLeft}`}>About Me</Link>
        <a 
          className={`${styles.footerLink} ${styles.skewRight} ${styles.contact}`} 
          href="mailto:david.connor.r@gmail.com"
        >
          david.connor.r[at]gmail.com
        </a>
      </footer>
    </div>
  );
}

export default Home;