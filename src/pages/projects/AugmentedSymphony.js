import React from 'react';
import ProjectPage from '../../components/ProjectPage';
import styles from '../../components/ProjectPage.module.css';

const AugmentedSymphonyProject = () => {
  const content = `
    <p>
      Augmented Symphony was a research project exploring the use of augmented reality (AR) and spatial audio to enhance the audience experience of orchestral music. The project aimed to provide additional visual and auditory information to concert-goers through a mobile AR application.
    </p>
    <p>
      The app allows users to see visual representations of different instrument sections and their sound waves, as well as to adjust the volume of specific sections in real-time. This creates a more immersive and personalized concert experience.
    </p>
    <p>
      As part of the research team, I contributed to the development of the AR application using Unity and helped design the user experience. We conducted user studies to evaluate the effectiveness of the AR enhancements on audience engagement and enjoyment.
    </p>
  `;

  const additionalInfo = `
    <p>The above video is our submission to conferences. For a video that better captures the spatial audio, please view the one below.</p>
    <div class="mediaEmbed">
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/6JOqSxd1kJ8" 
        title="Augmented Symphony Spatial Audio Demo"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <p>This app, along with a <a class="${styles.externalLink}" href="#" target="_blank" rel="noopener noreferrer">short paper</a> I helped write, was presented as part of <a class="${styles.externalLink}" href="https://www.eva-london.org/eva-london-2022/" target="_blank" rel="noopener noreferrer">EVA London 2022</a>.</p>
  `;

  const mediaEmbed = `
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/TyodRsDgzKk" 
      title="YouTube video player"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  return (
    <ProjectPage
      title="Augmented Symphony"
      subtitle1="Enhancing Orchestral"
      subtitle2="Experiences"
      question="How can AR and spatial audio enhance the audience experience of live orchestral performances?"
      content={content}
      additionalInfo={additionalInfo}
      technologies="Unity, AR Foundation, C#, Spatial Audio"
      backLink="/augmented-reality"
      mediaEmbed={mediaEmbed}
    />
  );
};

export default AugmentedSymphonyProject;