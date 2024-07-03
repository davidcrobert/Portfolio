import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ title, subtitle1, subtitle2, year, backLink, backLinkText, showInfoButton, onInfoClick }) => {
  const [infoButtonText, setInfoButtonText] = useState('+');

  const toggleInfoButton = () => {
    setInfoButtonText(prevText => prevText === '+' ? '-' : '+');
    if (onInfoClick) {
      onInfoClick();
    }
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
        <div className={styles.headerButtons}>
          {showInfoButton && (
            <button onClick={toggleInfoButton} className={`${styles.infoButton} ${styles.headerButton}`}>INFO {infoButtonText}</button>
          )}
          {backLink && (
            <Link to={backLink} className={`${styles.back} ${styles.skew} ${styles.left} ${styles.headerButton}`}>{backLinkText || 'back'}</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;