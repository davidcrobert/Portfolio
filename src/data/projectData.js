export const projectData = {
    installation: {
      title: "Installation",
      subtitle1: "Augmenting Environments",
      subtitle2: "& Embodying Virtuality",
      projects: [
        {
          id: 1,
          title: "AN ANT HAS DRAWN A RECOGNIZABLE CARICATURE OF WINSTON CHURCHILL",
          link: "/projects/an-ant",
          description: "An isolated and ephemeral social performance<br><br>[2023]<br><br>~TouchDesigner & Unity & Python~",
          subtitle1: "Isolated &",
          subtitle2: "Fleeting",
          year: "2023",
          question: "At what point are we an intelligent actor?",
          content: `
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
              <a class="externalLink" href="https://philosophy.as.uky.edu/sites/default/files/Brains%20in%20a%20Vat%20-%20Hilary%20Putnam.pdf" target="_blank" rel="noopener noreferrer">this</a> Hilary Putnam essay.
            </p>
          `,
          technologies: "TouchDesigner, Unity, Python",
          mediaEmbed: `
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/AfoHMi5Gyms" 
              title="YouTube video player"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          `
        },
        {
          id: 2,
          title: "Assembly Line",
          link: "/projects/assembly-line",
          description: "An interactive and collaborative performance between audience and robot for DesignTO 2022<br><br>[2022]<br><br>~TouchDesigner & The Web~<br><br><b>Covered by the CBC</b>",
          subtitle1: "An industrial approach",
          subtitle2: "to digital interaction",
          year: "2022",
          question: "How can we create meaningful interactions with installations while maintaining social distance?",
          content: `
            <p>
              Designed and developed by a team from Toronto Metropolitan University's Design + Technology LAB, <i>Assembly Line</i> emerged from the
              conditions brought on by Covid-19. Hoping to still capture the magic of an interactive installation,
              we explored ways to involve an audience in the experience while remaining distanced. Users submit 'gestures' through a web portal and watch them
              materialize in the projection. 
            </p>
            <p>
              Tracking of the box for mapping is done live using an HTC VIVE Tracker.
            </p>
            <p>
              I led the design and development, as well as solely developing the projection in TouchDesigner as well as the interactive components of the website (front-end and back-end).
            </p>
          `,
          technologies: "TouchDesigner, OpenVR, JavaScript, Node.js, Projection, KUKA Robot Arm",
          mediaEmbed: `
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/HDGwEiiztQw" 
              title="YouTube video player"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          `,
          additionalInfo: `
            <p class="media">
              <i>Assembly Line</i> was featured in DesignTO 2022.
            </p>
            <p class="media">
              The CBC wrote an <a class="externalLink"  href="https://www.cbc.ca/arts/in-toronto-here-s-where-you-can-make-art-with-a-giant-industrial-robot-1.6321499" target="_blank" rel="noopener noreferrer">article</a> about it.
            </p>
          `
        }
        // ... other installation projects
      ]
    },
    virtualEnvironments: {
      title: "Virtual Environments",
      subtitle1: "Digital worlds",
      subtitle2: "& experiences",
      projects: [
        // ... virtual environment projects
      ]
    },
    augmentedReality: {
      title: "Augmented Reality",
      subtitle1: "Digital",
      subtitle2: "& physical",
      projects: [
        // ... augmented reality projects
      ]
    },
    web: {
      title: "Web",
      subtitle1: "World",
      subtitle2: "& Wide & Web",
      projects: [
        // ... web projects
      ]
    }
  };