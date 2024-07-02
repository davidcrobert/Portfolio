import React from 'react';
import ProjectPage from '../../components/ProjectPage';

const ICantHearYouProject = () => {
  const content = `
    <p>
      In I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER, my audience is divided. In one room, the majority
      of them remain together. It is warmly lit, and they sat in a semi-circle looking at each other. For the other room I
      took one member of the group, and placed them in a large, dark studio. The only thing lighting the room is a projection
      of long green lines against the wall. This member's phone is taken and put in a box, then are seated in a high chair
      with a microphone sitting on the ground in front of them.
      <br><br>
      Connecting these rooms is a Zoom call. In the first room, with the group, the Zoom call is audible and they may
      communally speak to it. In the second room with the single participant, they cannot hear anything from the call, but
      rather just see a visualization of the audio from the call, sitting in silence. Their collective goal: have a conversation. Speak to each
      other.
      <br><br>
      The performance lasted about 15 minutes for each participant.
    </p>
  `;

  const mediaEmbed = `
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/T3VsCSVuLc8" 
      title="YouTube video player"
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  return (
    <ProjectPage
      title="I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER"
      subtitle1="Like talking"
      subtitle2="to a brick wall"
      question="How can we talk when we don't understand each other?"
      content={content}
      technologies="TouchDesigner, Projection Mapping"
      backLink="/installation"
      mediaEmbed={mediaEmbed}
    />
  );
};

export default ICantHearYouProject;