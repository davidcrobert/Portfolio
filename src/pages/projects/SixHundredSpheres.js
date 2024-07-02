import React from 'react';
import ProjectPage from '../../components/ProjectPage';

const SixHundredSpheresProject = () => {
  const content = `
    <p>
      <i>THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE</i> is an interface for exploring your voice. It invites users to speak for 30 seconds before tearing that into 600 distinct audio grains.
      These grains are arranged in the shape of a sphere, which users can interact with through a Leap Motion Controller. When a user's fingertip 'collides' with a grain,
      it plays its grain back. This creates a uniquely vocal context that must be interacted with spatially - it makes users aware of their voices
      as digital, three-dimensional media. A flick of the finger captures a lisp, a click of the tongue, a warble of the voice.
    </p>
  `;

  const mediaEmbed = `
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/RHDl9PVFnQk" 
      title="YouTube video player"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  return (
    <ProjectPage
      title="THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE"
      subtitle1="Spatialized sound"
      subtitle2="Sonified movements"
      question="How can sound be recontextualized through space?"
      content={content}
      technologies="Unity, hand tracking"
      backLink="/virtual-environments"
      mediaEmbed={mediaEmbed}
    />
  );
};

export default SixHundredSpheresProject;