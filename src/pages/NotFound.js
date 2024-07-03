import React from 'react';
import Header from '../components/Header';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Header 
        title="404"
        subtitle1="Lost"
        subtitle2="& Not Yet Found"
        backLink="/"
        backLinkText="Home"
      />
    </div>
  );
};

export default NotFound;