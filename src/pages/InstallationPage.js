import React from 'react';
import Category from '../components/Category';
import { projectData } from '../data/projectData';

const InstallationPage = () => {
  const { installation } = projectData;

  return (
    <Category
      title={installation.title}
      subtitle1={installation.subtitle1}
      subtitle2={installation.subtitle2}
      projects={installation.projects}
    />
  );
};

export default InstallationPage;