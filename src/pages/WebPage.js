import React from 'react';
import Category from '../components/Category';
import { projectData } from '../data/projectData';

const WebPage = () => {
  const { web } = projectData;

  return (
    <Category
      title={web.title}
      subtitle1={web.subtitle1}
      subtitle2={web.subtitle2}
      projects={web.projects}
    />
  );
};

export default WebPage;