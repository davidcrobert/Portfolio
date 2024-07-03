import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ title, subtitle1, subtitle2, year, backLink, backLinkText, showInfoButton }) => {
  const [infoButtonText, setInfoButtonText] = useState('+');

  const toggleInfoButton = () => {
    setInfoButtonText(prevText => prevText === '+' ? '-' : '+');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.intro}>
          {title}
          {year && <span className={styles.year}> [{year}]</span>}
        </h1>
        <h2 className={`${styles.subtext} ${styles.intro}`}>{subtitle1}</h2>
        <h2 className={`${styles.subtext} ${styles.intro} ${styles.secondSubtext}`}>{subtitle2}</h2>
        {showInfoButton && (
          <button onClick={toggleInfoButton} className={styles.infoButton}>INFO {infoButtonText}</button>
        )}
        {backLink && (
          <Link to={backLink} className={`${styles.back} ${styles.skew} ${styles.left}`}>{backLinkText || 'back'}</Link>
        )}
      </div>
    </header>
  );
};

export default Header;