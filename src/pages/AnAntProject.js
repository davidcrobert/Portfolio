import React from 'react';
import ProjectPage from '../components/ProjectPage';

const AnAntProject = () => {
  const content = `
    <p>
      A group of people were brought into a room. There was pizza. People got comfortable.
      In the middle of the room was a chair facing an open laptop. Across the far wall was a blank, white projection.
      <br><br>
      A member of the audience was invited to sit down in the chair. At this point a mesh of their face appeared on the white canvas, as well as the words
      "CLOSE YOUR EYES." They put the headphones in front of them on - they were silent.
      <br><br>
      When the participant-performer closed their eyes, the white faded out and revealed a visual driven by a boid-swarm simulation. The headphones 
      played the static audio of an old Hi-8 tape. Landmarks on the face acted as repellants to the boids. When the participant-performer 
      opened their eyes the visual disappeared and was replaced by the white screen before they could see the outcome.
      <br><br>
      Simulation was done in Unity - visuals handled in TouchDesigner - Python detected whether their eyes were open or closed.
      <br><br>
      The title is in reference to 
      <a href="https://philosophy.as.uky.edu/sites/default/files/Brains%20in%20a%20Vat%20-%20Hilary%20Putnam.pdf" target="_blank" rel="noopener noreferrer">this</a> Hilary Putnam essay.
    </p>
  `;

  const mediaEmbed = `
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/AfoHMi5Gyms" 
      title="YouTube video player"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  return (
    <ProjectPage
      title="AN ANT HAS DRAWN A RECOGNIZABLE CARICATURE OF WINSTON CHURCHILL"
      subtitle1="Isolated &"
      subtitle2="Fleeting"
      question="At what point are we an intelligent actor?"
      content={content}
      technologies="TouchDesigner, Unity, Python"
      backLink="/installation"
      mediaEmbed={mediaEmbed}
    />
  );
};

export default AnAntProject;