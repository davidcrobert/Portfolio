import React from 'react';
import Category from '../components/Category';

const AugmentedRealityPage = () => {
  const projects = [
    {
      id: 1,
      title: "Augmented Symphony",
      link: "/projects/augmented-symphony",
      description: "Research project exploring spatial and interactive audio for audience experience<br><br>[2021]<br><br>~Unity~<br><br><b>Accepted to EVA London 2022</b>"
    }
    // Add more projects here as needed
  ];

  return (
    <Category
      title="Augmented Reality"
      subtitle1="Digital"
      subtitle2="& physical"
      projects={projects}
    />
  );
};

export default AugmentedRealityPage;