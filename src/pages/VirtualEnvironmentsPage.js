import React from 'react';
import Category from '../components/Category';

const VirtualEnvironmentsPage = () => {
  const projects = [
    {
      id: 1,
      title: "THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE",
      link: "/projects/600-spheres",
      description: "An embodied audio interaction<br><br>[2021]<br><br>~Unity~"
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