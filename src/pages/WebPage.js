import React from 'react';
import Category from '../components/Category';

const WebPage = () => {
  const projects = [
    {
      id: 1,
      title: "ScavengeAR_",
      link: "/projects/scavenge-ar",
      description: "Helping small businesses enter the Metaverse<br><br>[2022]<br><br>~Three.js, React, Node.js, Socket.io, MongoDB~"
    },
    {
      id: 2,
      title: "I Asked My Reflection Its Name Again",
      link: "/projects/i-asked-my-reflection",
      description: "Dancing with yourself<br><br>[2020]<br><br>~JavaScript~"
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