import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import Sketch from '../components/Sketch';

function Home() {
  return (
    <div className={styles.index}>
    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"
        integrity="sha512-w1Bktzax55ZbjW5Mqjz8+mKz4KqRjEUU35Dpq/ath29yskKqIGwNIHiFNp03m/OiJWDXvdQ1/g6aV+l4PeVO7Q=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="sketch.js"></script> */}
      <Sketch />
      <header className={styles.header}>
        <h1 className={styles.intro}>David Robert</h1>
        <h2 className={`${styles.subtext} ${styles.intro}`}>Creative technologist</h2>
        <h2 className={`${styles.subtext} ${styles.intro} ${styles.secondSubtext}`}>& interactive developer</h2>
      </header>
      
      <nav className={styles.nav}>
        <Link to="/installation" className={`${styles.navLink} ${styles.skewLeft}`}>↳ Installation</Link>
        <Link to="/virtual-environments" className={`${styles.navLink} ${styles.skewLeft}`}>↳ Virtual Environments</Link>
        <Link to="/augmented-reality" className={`${styles.navLink} ${styles.skewRight}`}>↳ Augmented Reality</Link>
        <Link to="/web" className={`${styles.navLink} ${styles.skewRight}`}>↳ Web</Link>
      </nav>

      <footer className={styles.footer}>
        <Link to="/about" className={`${styles.footerLink} ${styles.skewLeft}`}>About Me</Link>
        <a 
          className={`${styles.footerLink} ${styles.skewRight} ${styles.contact}`} 
          href="mailto:david.connor.r@gmail.com"
        >david.connor.r[at]gmail.com</a>
      </footer>
    </div>
  );
}

export default Home;