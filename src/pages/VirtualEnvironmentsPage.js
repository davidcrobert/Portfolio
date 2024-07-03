import React from 'react';
import Category from '../components/Category';
import { projectData } from '../data/projectData';

const VirtualEnvironmentsPage = () => {
  const { virtualEnvironments } = projectData;

  return (
    <Category
      title={virtualEnvironments.title}
      subtitle1={virtualEnvironments.subtitle1}
      subtitle2={virtualEnvironments.subtitle2}
      projects={virtualEnvironments.projects}
    />
  );
};

export default VirtualEnvironmentsPage;