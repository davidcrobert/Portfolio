import React from 'react';
import Category from '../components/Category';

const InstallationPage = () => {
  const projects = [
    {
      id: 1,
      title: "AN ANT HAS DRAWN A RECOGNIZABLE CARICATURE OF WINSTON CHURCHILL",
      link: "/projects/an-ant",
      description: "An isolated and ephemeral social performance<br><br>~TouchDesigner & Unity & Python~",
      year: "2023"
    },
    {
      id: 2,
      title: "Assembly Line",
      link: "/projects/assembly-line",
      description: "An interactive and collaborative performance between audience and robot for DesignTO 2022<br><br>~TouchDesigner & The Web~",
      year: "2022"
    },
    {
      id: 3,
      title: "Moth Melody",
      link: "/projects/moth-melody",
      description: "A musical, interactive, and collaborative tabletop-projection for children<br><br>~Unity & Arduino & Touchdesigner~",
      year: "2022"
    },
    {
      id: 4,
      title: "I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER",
      link: "/projects/i-cant-hear-you",
      description: "A networked experience about [mis]communication<br><br>~TouchDesigner~",
      year: "2022"
    }
  ];

  return (
    <Category
      title="Installation"
      subtitle1="Augmenting Environments"
      subtitle2="& Embodying Virtuality"
      projects={projects}
    />
  );
};

export default InstallationPage;