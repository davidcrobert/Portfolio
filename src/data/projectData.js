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
            description: "An isolated and ephemeral social performance",
            subtitle1: "Isolated",
            subtitle2: "& Fleeting",
            year: "2023",
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
            `,
            infoPopup: {
              main:    "At what point are we an intelligent actor?",
              context: `A group of people were brought into a room. There was pizza. People got comfortable.<br>
                        In the middle of the room was a chair facing an open laptop. Across the far wall was a blank, white projection.<br><br>

                        A member of the audience was invited to sit down in the chair. At this point a mesh of their face appeared on the white canvas, 
                        as well as the words "CLOSE YOUR EYES."<br>
                        They put the headphones in front of them on - they were silent.<br><br>
                        
                        When the participant-performer closed their eyes, the white faded out and revealed a visual driven by a boid-swarm simulation.<br>
                        The headphones played the static audio of an old Hi-8 tape. Landmarks on the face acted as repellants to the boids.<br>
                        When the participant-performer opened their eyes the visual disappeared and was replaced by the white screen before they could see the outcome.<br><br>
                        
                        The title <i>AN ANT HAS DRAWN A RECOGNIZABLE CARICATURE OF WINSTON CHURCHILL</i>  is in reference to 
                        <a href="https://philosophy.as.uky.edu/sites/default/files/Brains%20in%20a%20Vat%20-%20Hilary%20Putnam.pdf" target="_blank" rel="noopener noreferrer">this</a> Hilary Putnam essay.
                        `,
              tech:    `Background is a feedback loop of a boid simulation run in Unity.<br>
                        Visual effects and change is done in TouchDesigner.<br>
                        Python is used to detect whether the participant-performer's eyes are open or closed.<br>
                        `,
              tools:   `TouchDesigner & Unity & Python`
            }
          },
          {
            id: 2,
            title: "Assembly Line",
            link: "/projects/assembly-line",
            description: "An interactive and collaborative performance between audience and robot for DesignTO 2022",
            subtitle1: "Industrial approach",
            subtitle2: "& digital interaction",
            year: "2022",
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
            `,
            infoPopup: {
              main:    "How can we create meaningful interactions with installations while maintaining social distance?",

              context: `Through Toronto Metropolitan University's Design + Technology LAB, I designed & developed <i>Assembly Line</i> 
                        under the constraints brought on by Covid-19.<br><br>
              
                       Users submit 'gestures' through a web portal and watch them materialize in the projection, at which point
                        they are pulled apart and brought to life.<br><br>
                       
                       The CBC wrote an <a href="https://www.cbc.ca/arts/in-toronto-here-s-where-you-can-make-art-with-a-giant-industrial-robot-1.6321499" target="_blank" rel="noopener noreferrer">article</a> about it.`,

              tech:    `Web portal made in JavaScript with a Node.js backend. The projection content and mapping is done in TouchDesigner.<br><br>
              
                       Tracking of the box for mapping is done live using an HTC VIVE Tracker.`,

              tools:   `TouchDesigner & Node.js & JavaScript`
            }
          },
          {
            id: 3,
            title: "Moth Melody",
            link: "/projects/moth-melody",
            description: "A musical, interactive, and collaborative tabletop-projection for children",
            subtitle1: "Music",
            subtitle2: "& Moths",
            year: "2022",
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
            `,
            infoPopup: {
              main:    "How can we make bugs more approachable for kids?",
              context: `
                      My class partnered with the <a href="https://www.ontariosciencecentre.ca/" target="_blank" rel="noopener noreferrer">Ontario Science Centre</a>
                      to produce interactive exhibits about insects for children. My team's is based on moths.<br><br>
                      Users can touch our table's lanterns, which would light up, and a corresponding lantern in the centre projection would light-up as well. 
                      The moth is attracted to and moves towards this light - if it passes through a flower, a musical note from a scale plays.
`,
              tech:    `I programmed the project. The interactions were handled using capacitive touch with an Arduino. This communicated to Unity,
                      which managed the game mechanics of the installation. TouchDesigner was used for some post-processing and the keystoning of the projection.`,

              tools:   `Unity & Arduino & TouchDesigner & Fabrication`
            }
          },
          {
            id: 4,
            title: "I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER",
            link: "/projects/i-cant-hear-you",
            description: "A networked experience about [mis]communication",
            subtitle1: "Like talking",
            subtitle2: "@ a brick wall",
            year: "2022",
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
            `,
            infoPopup: {
              main:    "How can we communicate when we don't understand each other?",
              context: `
                      In <i>I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER</i>, my audience is divided.<br>
                      In one room, the majority of them remain together. It is warmly lit, and they sat in a semi-circle looking at each other.<br> 
                      For the other room I took one member of the group, and placed them in a large, dark studio.<br> 
                      The only thing lighting the room is a projection of long green lines against the wall.<br>
                      This member's phone is taken and put in a box, then are seated in a high chair with a microphone sitting on the ground in front of them.<br><br>

                      Connecting these rooms is a Zoom call. In the first room, with the group, the Zoom call is audible and they may communally speak to it.<br>
                      In the second room with the single participant, they cannot hear anything from the call, but rather just see a visualization of the audio 
                      from the call, sitting in silence.<br>
                      Their collective goal: have a conversation. Speak to each other.<br><br>
                      The performance lasted about 15 minutes for each participant.
                      `,

              tech:    `
                      The audio visualization was done in TouchDesigner.
                      `,

              tools:   `TouchDesigner`
            }
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
            description: "An embodied audio interaction",
            subtitle1: "Spatialized sound",
            subtitle2: "& Sonified movements",
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
            `,
            infoPopup: {
              main:    "Speech as an object and space",
              context: `
                      <i>THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE</i> is an interface for exploring your voice. 
                      It invites users to speak for 30 seconds before tearing that into 600 distinct audio grains.<br>
                      These grains are arranged in the shape of a sphere, which users can interact with using hand movements.<br>
                      When a user's fingertip 'collides' with a grain, it plays its grain back. This creates a uniquely vocal context that must be 
                      interacted with spatially.<br> It makes users aware of their voices as digital, three-dimensional media. A flick of the finger captures a lisp, 
                      a click of the tongue, a warble of the voice.
                        `,
              tech:    `
                      Audio manipulation and interactivity handled in Unity.<br> 
                      Hand tracking is done using a Leap Motion Controller.
                      `,
              tools:   `Unity`
            }
          },
          {
            id: 2,
            title: "Augmented Symphony",
            link: "/projects/augmented-symphony",
            description: "Research project exploring spatial and interactive audio for audience experience",
            subtitle1: "Orchestras",
            subtitle2: "@ Home",
            year: "2021",
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
            infoPopup: {
              main:    "How can the digital delivery of orchestral music be enhanced?",
              context: `
                      <i>Augmented Symphony</i> was a research project exploring the use of augmented reality (AR) and spatial audio to enhance the audience experience 
                      of orchestral music at home. The project aimed to engage users through interactivity, allowing them to explore the orchestra in a novel way -
                      through space.<br><br>

                      The app allows users to place instruments around their space in AR. They can then walk through their uniquely arranged orchestra, paying attention 
                      to instruments as they wish and creating their own personalized concert experience.<br><br>

                      This app, along with a <a href="https://www.academia.edu/84385746/Augmented_Symphony_An_augmented_reality_application_for_immersive_music_listening" target="_blank" rel="noopener noreferrer">
                      short paper</a> I helped write, was presented as part of 
                      <a href="http://www.eva-london.org/eva-london-2022/" target="_blank" rel="noopener noreferrer">EVA London 2022</a>.
                      `,
              tech:    `
                      The app was developed in Unity and programmed with C#.<br>
                      It works on both iOS and Android devices using AR Foundation.<br>
                      `,
              tools:   `Unity & C#`
            }
          }
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
            description: "Helping small businesses enter the Metaverse",
            subtitle1: "Small Businesses",
            subtitle2: "& the Metaverse",
            year: "2022",
            customComponent: "ScavengeARMedia",
            infoPopup: {
              main:    "How can we reduce the upfront cost/work for small businesses entering the Metaverse?",
              context: `
                      Made as a major project for my internship at <a href="https://www.jam3.com/" target="_blank" rel="noopener noreferrer">Jam3</a>, alongside one other 
                      Creative Developer Intern, two Design Interns, and a Production Intern.<br>
                      Our brief was to create a solution / prototype for a way to help bring small businesses into the Metaverse.<br><br>

                      <i>ScavengeAR_</i> allows a small business to create a simple virtual environment to tie into their business. Customers are invited to join
                      the Metaverse-shop, where they can move through the space and see other users in real-time.<br><br>

                      In the Metaverse they can access "quests" that earn them and the virtual store points. These quests are tasks that have to be completed in-store
                      by scanning QR codes under certain circumstances - say a certain time of day or a certain number of days in a row. 
                      By completing a quest, they earn points towards their account, as well as a group total for the store. Once enough collective points are earned, 
                      the store "evolves."
                      `,
              tech:    `
                      The 3D environment was created using Three.js.<br>
                      The backend was made in Node.js with a MongoDB database and Socket.io.<br>
                      The UI was made in React.

                      I was responsible for the UI, the backend, and the multi-user functionality in the 3D environment. I also made the generative avatars.
                      `,
              tools:   `JavaScript & Node.js & React & Three.js & MongoDB`
            }
          },
          {
            id: 2,
            title: "I Asked My Reflection Its Name Again",
            link: "/projects/i-asked-my-reflection",
            description: "An interactive exploration of recursive behavior",
            subtitle1: "Recursive Interaction",
            subtitle2: "& Interacting Recursively",
            year: "2020",
            customComponent: "ReflectionInteractive",
            infoPopup: {
              main:    "How does it feel to be surrounded by yourself?",
              context: `
                      In <i>I ASKED MY REFLECTION ITS NAME AGAIN</i> users are given a simple direction at the beginning to move their mouse.
                      From this point, a number of identical cursors slowly appear. It becomes clear the cursors are imitating their movements.<br><br>
                      
                      The cursors imitate users' behavior based on their previous movements.
                      As cursors appear and users become aware of the role they play in their movement, this affects how they interact with the site. 
                      Which will in turn affect the cursors. Which will in turn affect the user. Which will in turn affect the cursors. Which will in turn affect the user.`,
              tech:    `
                      The project was made in p5.js. The imitation of the cursors was done using a Markov model.`,
              tools:   `JavaScript & p5.js`
            }
          }
        ]
      }
  };