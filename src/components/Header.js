import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ title, subtitle1, subtitle2, backLink }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.intro}>{title}</h1>
      <h2 className={`${styles.subtext} ${styles.intro}`}>{subtitle1}</h2>
      <h2 className={`${styles.subtext} ${styles.intro} ${styles.secondSubtext}`}>{subtitle2}</h2>
      {backLink && (
        <Link to={backLink} className={`${styles.back} ${styles.skew} ${styles.left}`}>Back</Link>
      )}
    </header>
  );
};

export default Header;