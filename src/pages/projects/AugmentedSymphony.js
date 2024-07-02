import React from 'react';
import ProjectPage from '../../components/ProjectPage';
import styles from '../../components/ProjectPage.module.css';

const AugmentedSymphonyProject = () => {
  const content = `
    <p>
      I joined this research project with the simple directive that we were to design and develop a prototype to transform the
      <a href="https://nac-cna.ca/en/orchestra" target="_blank" rel="noopener noreferrer">National Arts Centre Orchestra's</a> delivery of at-home content during the Covid-19 pandemic. 
      I proposed, designed, and developed an AR application that allowed users to place the audio tracks for individual instruments around their own physical environment, creating
      a unique spatial mix that they can walk through and explore.
      <br><br>
      The faculty on this project were <a href="https://www.ryerson.ca/rta/People/faculty/david-bouchard/" target="_blank" rel="noopener noreferrer">David Bouchard</a>, 
      <a href="https://www.ryerson.ca/performance/about/faculty/m-bergmann/" target="_blank" rel="noopener noreferrer">Michael Bergmann</a>, and 
      <a href="https://mlc.ryerson.ca/people/cintia-cristia" target="_blank" rel="noopener noreferrer">Dr. Cintia Cristia</a>.
    </p>
  `;

  const mediaInfo = `
    <p class="${styles.media}">
      This app, along with a <a href="https://www.scienceopen.com/hosted-document?doi=10.14236/ewic/EVA2022.39" target="_blank" rel="noopener noreferrer">short paper</a> 
      I helped write, was presented as part of <a href="http://www.eva-london.org/" target="_blank" rel="noopener noreferrer">EVA London 2022</a>.
    </p>
  `;

  const mediaEmbed = `
    <div className={styles.videoWrapper}>
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID_HERE" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>
  `;

  return (
    <ProjectPage
      title="Augmented Symphony"
      subtitle1="Taking the orchestra"
      subtitle2="to their audience's homes"
      question="How can we reimagine the digital delivery of orchestral music?"
      content={content}
      technologies="Unity, ARKit, ARCore"
      backLink="/virtual-environments"
      mediaEmbed={mediaEmbed}
    >
      <p className={styles.warning}>
        The above video is our submission to conferences. For a video that better captures the spatial audio, please view the one at the bottom of this page.
      </p>
      <div dangerouslySetInnerHTML={{ __html: mediaInfo }} />
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/6JOqSxd1kJ8" 
        title="YouTube video player"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </ProjectPage>
  );
};

export default AugmentedSymphonyProject;