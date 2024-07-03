import React from 'react';
import Category from '../components/Category';

const VirtualEnvironmentsPage = () => {
  const projects = [
    {
      id: 1,
      title: "THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE",
      link: "/projects/600-spheres",
      description: "An embodied audio interaction<br><br>~Unity~",
      year: "2021"
    },
    {
      id: 2,
      title: "Augmented Symphony",
      link: "/projects/augmented-symphony",
      description: "Research project exploring spatial and interactive audio for audience experience<br><br>~Unity~",
      year: "2021"
    }
    // Add more projects here as needed
  ];

  return (
    <Category
      title="Virtual Environments"
      subtitle1="Digital worlds"
      subtitle2="& experiences"
      projects={projects}
    />
  );
};

export default VirtualEnvironmentsPage;