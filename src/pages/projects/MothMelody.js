import React from 'react';
import ProjectPage from '../../components/ProjectPage';

const MothMelodyProject = () => {
  const content = `
    <p>
      My class partnered with the <a href="https://www.ontariosciencecentre.ca/" target="_blank" rel="noopener noreferrer">Ontario Science Centre</a>
      to produce interactive exhibits about insects for children. My team's is based on moths. Users can touch our table's lanterns, which would light up, and a corresponding 
      lantern in the centre projection would light-up as well. The moth is attracted to and moves towards this light - if it passes through a flower, a musical note 
      from a scale plays.
      <br><br>
      I programmed the entire installation. The interactions were handled using capacitive touch with an Arduino. This communicated to Unity, 
      which managed the game mechanics of the installation. Then TouchDesigner was used for some post-processing and the keystoning of the projection.
    </p>
  `;

  const mediaEmbed = `
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/1aOuyW_uDc0" 
      title="YouTube video player"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  return (
    <ProjectPage
      title="Moth Melody"
      subtitle1="An intro"
      subtitle2="to insects"
      question="How can we make bugs approachable for kids?"
      content={content}
      technologies="Unity, Arduino, Digital Fabrication, TouchDesigner"
      backLink="/installation"
      mediaEmbed={mediaEmbed}
    />
  );
};

export default MothMelodyProject;