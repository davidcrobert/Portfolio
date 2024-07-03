import React from 'react';
import Category from '../components/Category';

const WebPage = () => {
  const projects = [
    {
      id: 1,
      title: "ScavengeAR_",
      link: "/projects/scavenge-ar",
      description: "Helping small businesses enter the Metaverse<br><br>~Three.js, React, Node.js, Socket.io, MongoDB~",
      year: "2022"
    },
    {
      id: 2,
      title: "I Asked My Reflection Its Name Again",
      link: "/projects/i-asked-my-reflection",
      description: "Dancing with yourself<br><br>~JavaScript~",
      year: "2020"
    }
  ];

  return (
    <Category
      title="Web"
      subtitle1="World"
      subtitle2="& Wide & Web"
      projects={projects}
    />
  );
};

export default WebPage;