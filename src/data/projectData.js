export const projectData = {
  work: {
    title: "Work",
    subtitle1: "Professional",
    subtitle2: "& Proper",
    tags: ["all", "ai", "web", "installation", "audio", "ar/vr/xr", "robotics"],
    projects: [
      {
        title: "Undercurrents",
        link: "/projects/undercurrents",
        description: "An intercom network inside a 1926 cistern where visitor voices are encoded as light across the columns, with an AI searching a growing archive of past recordings to select a response",
        subtitle1: "Voices",
        subtitle2: "& Echoes",
        year: "2026",
        tags: ["installation", "electronics", "ai", "audio"],
        tools: "Python & TouchDesigner & DANTE"
      },
      {
        title: "Spiral Reflector",
        link: "/projects/spiral-reflector",
        description: "A DMX-controlled linear LED spiral that maps a surveillance camera's image as a 2D canvas",
        subtitle1: "Spinning",
        subtitle2: "& Spiralling",
        year: "2026",
        tags: ["installation", "electronics"],
        tools: "TouchDesigner & Python"
      },
      {
        title: "Submirrors",
        link: "/projects/Submirrors",
        description: "AI applied to a live camera feed - mirrors that puppet and distort a viewer's own facial expression in real time",
        subtitle1: "Puppets",
        subtitle2: "& Puppeteers",
        year: "2025",
        tags: ["ai"],
        tools: "Python & TouchDesigner"
      },
      {
        title: "Shadow Tuner",
        link: "/projects/shadow-tuner",
        description: "A spherical screen streaming thousands of geo-located live radio stations, with an AI classifier that prioritizes spoken word over music",
        subtitle1: "Speaking",
        subtitle2: "& Spinning",
        year: "2025",
        tags: ["ai", "installation", "audio"],
        tools: "Python & TouchDesigner & PowerShell"
      },
      {
        title: "Remote Pulse",
        link: "/projects/remote-pulse",
        description: "Refactored Arduino firmware for a networked biometric installation - heartbeats transmitted over MQTT between two synchronized stations across cities, countries, and the world",
        subtitle1: "Beating",
        subtitle2: "& Sharing",
        year: "2024",
        tags: ["electronics", "installation"],
        tools: "Arduino & OpenFrameworks"
      },
      {
        title: "Assembly Line",
        link: "/projects/assembly-line",
        description: "Audience-submitted gestures projected onto a KUKA industrial robot arm, \"physically\" instantiated and destroyed in real time",
        subtitle1: "Industrial approach",
        subtitle2: "& digital interaction",
        year: "2022",
        tags: ["installation", "robotics", "web"],
        tools: "TouchDesigner & KUKA Robot Arm & Node.js & JavaScript"
      },
      {
        title: "Moth Melody",
        link: "/projects/moth-melody",
        description: "Capacitive-touch lanterns trigger a moth's flight path and musical notes across a collaborative tabletop projection, built for the Ontario Science Centre",
        subtitle1: "Music",
        subtitle2: "& Moths",
        year: "2022",
        tags: ["installation", "audio", "electronics"],
        tools: "Unity & Arduino & TouchDesigner & Fabrication"
      },
      {
        title: "Augmented Symphony",
        link: "/projects/augmented-symphony",
        description: "An AR spatial-audio application that lets listeners place orchestra instruments around their room and move through a personalized concert",
        subtitle1: "Orchestras",
        subtitle2: "@ Home",
        year: "2021",
        tags: ["ar/vr/xr", "audio"],
        tools: "Unity & C# & AR Foundation"
      }
    ]
  },
  art: {
    title: "Art",
    subtitle1: "Personal",
    subtitle2: "& Provocative",
    tags: ["all", "ai", "installation", "web", "audio", "ar/vr/xr"],
    projects: [
      {
        title: "I SURRENDERED MY BODY AND I SUCCUMBED TO THE BEAST",
        link: "/projects/the-beast",
        description: "An installation that puts words in your mouth. Made at the Fabrica Research Residency.",
        subtitle1: "Copying",
        subtitle2: "& Crowing",
        year: "2024",
        tags: ["installation", "ai", "audio"],
        tools: "TouchDesigner & Python"
      },
      {
        title: "I Asked My Reflection Its Name Again",
        link: "/projects/i-asked-my-reflection",
        description: "A Markov model learns a user's mouse behavior in real time, spawning cursor-clones that imitate - and gradually reshape - how they move",
        subtitle1: "Recursive Interaction",
        subtitle2: "& Interacting Recursively",
        year: "2021",
        tags: ["ai", "web"],
        tools: "JavaScript & p5.js"
      },
      {
        title: "AN ANT HAS DRAWN A RECOGNIZABLE CARICATURE OF WINSTON CHURCHILL",
        link: "/projects/an-ant",
        description: "Python eye-detection triggers a boid simulation - visible only while the participant's eyes are closed",
        subtitle1: "Isolated",
        subtitle2: "& Fleeting",
        year: "2023",
        tags: ["installation", "ai"],
        tools: "Unity & Python & TouchDesigner"
      }
    ]
  }
};

const assignIds = (projects) => {
  return projects.map((project, index) => ({
    ...project,
    id: index
  }));
};

Object.keys(projectData).forEach(category => {
  projectData[category].projects = assignIds(projectData[category].projects);
});
