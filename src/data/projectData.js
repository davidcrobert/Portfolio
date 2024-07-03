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
          },
          {
            id: 3,
            title: "Moth Melody",
            link: "/projects/moth-melody",
            description: "A musical, interactive, and collaborative tabletop-projection for children<br><br>[2022]<br><br>~Unity & Arduino & Touchdesigner~<br><br><b>Presented at the Ontario Science Centre</b>",
            subtitle1: "An intro",
            subtitle2: "to insects",
            year: "2022",
            question: "How can we make bugs approachable for kids?",
            content: `
              <p>
                My class partnered with the <a href="https://www.ontariosciencecentre.ca/" target="_blank" rel="noopener noreferrer">Ontario Science Centre</a>
                to produce interactive exhibits about insects for children. My team's is based on moths. Users can touch our table's lanterns, which would light up, and a corresponding 
                lantern in the centre projection would light-up as well. The moth is attracted to and moves towards this light - if it passes through a flower, a musical note 
                from a scale plays.
                <br><br>
                I programmed the entire installation. The interactions were handled using capacitive touch with an Arduino. This communicated to Unity, 
                which managed the game mechanics of the installation. Then TouchDesigner was used for some post-processing and the keystoning of the projection.
              </p>
            `,
            technologies: "Unity, Arduino, Digital Fabrication, TouchDesigner",
            mediaEmbed: `
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/1aOuyW_uDc0" 
                title="YouTube video player"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            `
          },
          {
            id: 4,
            title: "I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER",
            link: "/projects/i-cant-hear-you",
            description: "A networked experience about [mis]communication<br><br>[2022]<br><br>~TouchDesigner~",
            subtitle1: "Like talking",
            subtitle2: "to a brick wall",
            year: "2022",
            question: "How can we talk when we don't understand each other?",
            content: `
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
            `,
            technologies: "TouchDesigner, Projection Mapping",
            mediaEmbed: `
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/T3VsCSVuLc8" 
                title="YouTube video player"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            `
          }
        ]
      },
      virtualEnvironments: {
        title: "Virtual Environments",
        subtitle1: "Digital worlds",
        subtitle2: "& experiences",
        projects: [
          {
            id: 1,
            title: "THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE",
            link: "/projects/600-spheres",
            description: "An embodied audio interaction<br><br>[2021]<br><br>~Unity~",
            subtitle1: "Spatialized sound",
            subtitle2: "Sonified movements",
            year: "2021",
            question: "How can sound be recontextualized through space?",
            content: `
              <p>
                <i>THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE</i> is an interface for exploring your voice. It invites users to speak for 30 seconds before tearing that into 600 distinct audio grains.
                These grains are arranged in the shape of a sphere, which users can interact with through a Leap Motion Controller. When a user's fingertip 'collides' with a grain,
                it plays its grain back. This creates a uniquely vocal context that must be interacted with spatially - it makes users aware of their voices
                as digital, three-dimensional media. A flick of the finger captures a lisp, a click of the tongue, a warble of the voice.
              </p>
            `,
            technologies: "Unity, hand tracking",
            mediaEmbed: `
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/RHDl9PVFnQk" 
                title="YouTube video player"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            `
          },
          {
            id: 2,
            title: "Augmented Symphony",
            link: "/projects/augmented-symphony",
            description: "Research project exploring spatial and interactive audio for audience experience<br><br>[2021]<br><br>~Unity~<br><br><b>Presented at EVA London 2022</b>",
            subtitle1: "Enhancing Orchestral",
            subtitle2: "Experiences",
            year: "2021",
            question: "How can AR and spatial audio enhance the audience experience of live orchestral performances?",
            content: `
              <p>
                Augmented Symphony was a research project exploring the use of augmented reality (AR) and spatial audio to enhance the audience experience of orchestral music. The project aimed to provide additional visual and auditory information to concert-goers through a mobile AR application.
              </p>
              <p>
                The app allows users to see visual representations of different instrument sections and their sound waves, as well as to adjust the volume of specific sections in real-time. This creates a more immersive and personalized concert experience.
              </p>
              <p>
                As part of the research team, I contributed to the development of the AR application using Unity and helped design the user experience. We conducted user studies to evaluate the effectiveness of the AR enhancements on audience engagement and enjoyment.
              </p>
            `,
            technologies: "Unity, AR Foundation, C#, Spatial Audio",
            mediaEmbed: `
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/TyodRsDgzKk" 
                title="YouTube video player"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            `,
            additionalInfo: `
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
              <p>This app, along with a <a href="#" target="_blank" rel="noopener noreferrer">short paper</a> I helped write, was presented as part of <a href="https://www.eva-london.org/eva-london-2022/" target="_blank" rel="noopener noreferrer">EVA London 2022</a>.</p>
            `
          }
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
          {
            id: 1,
            title: "ScavengeAR_",
            link: "/projects/scavenge-ar",
            description: "Helping small businesses enter the Metaverse<br><br>[2022]<br><br>~Three.js, React, Node.js, Socket.io, MongoDB~",
            subtitle1: "Small Businesses",
            subtitle2: "& the Metaverse",
            year: "2022",
            question: "How can we reduce the upfront cost/work for small businesses entering the Metaverse?",
            content: `
              <p>
                Made as a major project for my internship at <a href="https://www.jam3.com/" target="_blank" rel="noopener noreferrer">Jam3</a>, alongside one other Creative Developer Intern, two Design Interns, and a Production Intern.
                Our brief was to create a solution / prototype for a way to help bring small businesses into the Metaverse.
              </p>
    
              <p>
                Scavenge AR_ allows a small business to create a simple virtual environment to tie into their business. Customers are invited to join 
                the Metaverse-shop, where they can move through the space and see other users in real-time - this was managed using Node.js and WebSockets. 
              </p>
              
              <p>
                In the Metaverse they can access "quests" that earn them and the virtual store points. These quests are tasks that have to be completed in-store 
                by scanning QR codes under certain circumstances - say a certain time of day or a certain number of days in a row. This logic was all handled in Node.js. 
                By completing a quest, they earn points towards their account, as well as a group total for the store. Once enough collective points are earned, the store "evolves."
              </p>
            `,
            technologies: "Three.js, Node.js, React, MongoDB",
            mediaEmbed: `
              <div class="gifContainer">
                <img src="/assets/MultiUser.gif" alt="Multi-user interaction"/>
                <img src="/assets/QuestList.gif" alt="Quest list"/>
                <img src="/assets/SignUp.gif" alt="Sign up process"/>
              </div>
              
              <section class="scavengeGifs">
                <img src="/assets/EV1.gif" alt="Evolution 1"/>
                <img src="/assets/EV2.gif" alt="Evolution 2"/>
                <img src="/assets/EV3.gif" alt="Evolution 3"/>
                <img src="/assets/EV4.gif" alt="Evolution 4"/>
              </section>
            `
          },
          {
            id: 2,
            title: "I Asked My Reflection Its Name Again",
            link: "/projects/i-asked-my-reflection",
            description: "Dancing with yourself<br><br>[2020]<br><br>~JavaScript~",
            subtitle1: "Recursive",
            subtitle2: "Interaction",
            year: "2020",
            question: "How does it feel to be surrounded by yourself?",
            content: `
              <p>
                In <i>I ASKED MY REFLECTION ITS NAME AGAIN</i> users are given a simple direction at the
                beginning to move their mouse. From this point, a number of identical cursors slowly appear. 
                It becomes clear the cursors are imitating their movements. 
              </p>
              <p>
                The cursors imitate users' behaviour through a Markov model, where they learn patterns of behaviour 
                based on users' previous movements. As cursors appear and users become aware of the role they play in their movement, this 
                affects how they interact with the site. Which will in turn affect the cursors. Which will in turn affect the
                user. Which will in turn affect the cursors. Which will in turn affect the user.
              </p>
            `,
            technologies: "JavaScript, p5.js",
            mediaEmbed: `
              <!-- Note: The actual interactive component would be rendered here in the real implementation -->
              <div class="interactiveContainer">
                <p>Interactive p5.js sketch would be rendered here</p>
              </div>
            `
          }
        ]
      }
  };