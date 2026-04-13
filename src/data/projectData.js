export const projectData = {
  work: {
    title: "Work",
    subtitle1: "Professional",
    subtitle2: "& Proper",
    tags: ["all", "ai", "web", "installation", "audio", "ar/vr/xr", "robotics"],
    projects: [
      {
        title: "Spiral Reflector",
        link: "/projects/spiral-reflector",
        description: "A DMX-controlled linear LED spiral that maps a surveillance camera's image as a 2D canvas",
        subtitle1: "Spinning",
        subtitle2: "& Spiralling",
        year: "2026",
        tags: ['installation', 'electronics'],
        mediaEmbed: `
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/GtIqeNynFGU?controls=1&iv_load_policy=3&rel=0"
            title="Spiral Reflector"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        `,
        infoPopup: {
          main: "Lorum ipsum",
          context: `
            <i>Spiral Reflector</i> is an installation I developed as a creative technologist for artist Rafael Lozano-Hemmer,
            exhibited at the Museo de Arte Moderno in Mexico City.<br><br>
            300 metres of LED lights in a tubular diffuser form a five-metre spiral. A surveillance camera at the centre
            periodically "flushes" and absorbs light as it pans, casting a scanning line that tracks its attention across the room.
          `,
          tech: `
            Developed the software in TouchDesigner and Python.
          `,
          tools: `TouchDesigner & Python`
        }
      },
      {
        title: "Submirrors",
        link: "/projects/Submirrors",
        description: "AI applied to a live camera feed - mirrors that puppet and distort a viewer's own facial expression in real time",
        subtitle1: "Puppets",
        subtitle2: "& Puppeteers",
        year: "2025",
        tags: ['ai'],
        mediaEmbed: `
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/u4MBTA7A7M8?si=3W3V2xiWlXZ1lUoo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/k5isAs7JQi0?si=m7spuju15Pgmy-4p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        `,
        infoPopup: {
          main: "Misbehaving mirrors",
          context: `
            <i>Recurrent Waiting</i> and <i>Recurrent Kafka</i> are interactive mirror installations 
            from the ongoing Submirror series, a body of work that explores the tension between self-perception, 
            loss of control, and digital puppetry. These mirrors are recalcitrant, they do not reflect faithfully; 
            they act with intention, manipulating the viewer’s image to reveal a version of the self that is no 
            longer entirely their own.
          `,
          tech: `
            Applied the LivePortrait AI workflow for (from what I can find) the first application of altering a live camera feed.<br><br>
            Created the AI 'puppet' software in Python.<br><br>
            Built the 'puppeteer' / compositors in TouchDesigner.
          `,
          tools: `Python & TouchDesigner`
        }
      },
      {
        title: "Shadow Tuner",
        link: "/projects/shadow-tuner",
        description: "A spherical screen streaming thousands of geo-located live radio stations, with an AI classifier that prioritizes spoken word over music",
        subtitle1: "Speaking",
        subtitle2: "& Spinning",
        year: "2025",
        tags: ['ai', 'installation', 'audio'],
        mediaEmbed: `
          <iframe 
            width="560" 
            height="315" 
            src="https://player.vimeo.com/video/1008985225?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
            title="YouTube video player"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        `,
        infoPopup: {
          main: "Speech from the world",
          context: `
            <i>Shadow Tuner</i> is a new interactive artwork, first presented on a huge spherical balloon as a public art installation in Abu Dhabi. 
            The piece is a digital globe that links to thousands of geo-located radio stations that playback when a visitor is in front of them.<br><br>
            Like the artist's pioneering installation Frequency and Volume (2003), the body of the visitor becomes the antenna or tuning dial to scan 
            for sound signals, only instead of scanning the local radioelectric spectrum, Shadow Tuner offers a global polyphony of live streams. 
            The piece has a built-in AI analyzer so that spoken word content gets priority over music, thereby highlighting world language diversity.
          `,
          tech: `
            Implemented the AI analyzer to differentiate spoken word and music.<br><br>
            Re-wrote the audio downloading process for greater resiliency and to work on Windows.<br><br>
            Helped implement the tracking in TouchDesigner using a RealSense depth-camera.
          `,
          tools: `Python & TouchDesigner & PowerShell`
        }
      },
      // {
      //   title: "Simulacrummed Artifission",
      //   link: "/projects/simulacrummed-artifission",
      //   description: "AI avatar manipulation (developed for Rafael Lozano-Hemmer)",
      //   subtitle1: "Finnegans",
      //   subtitle2: "& Wake",
      //   year: "2024",
      //   tags: ['ai', 'audio', 'electronics'],
      //   mediaEmbed: `
      //     <iframe 
      //       width="560" 
      //       height="315" 
      //       src="https://www.youtube.com/embed/Dv6hLEOAJcs" 
      //       title="YouTube video player"
      //       frameborder="0" 
      //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //       allowfullscreen
      //     ></iframe>
      //   `,
      //   infoPopup: {
      //     main: "AI Avatars & AI Speech & AI Translation & James Joyce Gibberish",
      //     context: `
      //       <i>Simulacrummed Artifission</i> is an interactive display where a number of computer-generated avatars stand 
      //       still and silent in suspended animation, — until the visitor activates one or several of them 
      //       (by tapping on them). As they activate, each Avatar speaks an automated AI translation of James Joyce's novel 
      //       "Finnegans Wake" in one of 15 languages including Urdu, Spanish, Mandarin, French, Tagalog, German, Arabic, 
      //       and Hebrew. As all AI translations are in sync to the original text in English, which can be read in subtitles, 
      //       the result is an uncanny representation of largely nonsensical spoken words but expressed with the same rhythm 
      //       and intonation.
      //     `,
      //     tech: `
      //       Programmed interactions using JavaScript in Electron on a Raspberry Pi.<br><br>
      //       Developed hardware layout to share one power source (Raspberry Pi, screen, amplifier)<br><br>
      //       Got videos generated by HeyGen.
      //     `,
      //     tools: `Raspberry Pi & JavaScript & Electron`
      //   }
      // },
      {
        title: "Remote Pulse",
        link: "/projects/remote-pulse",
        description: "Refactored Arduino firmware for a networked biometric installation — heartbeats transmitted over MQTT between two synchronized stations across cities, countries, and the world",
        subtitle1: "Beating",
        subtitle2: "& Sharing",
        year: "2024",
        tags: ['electronics', 'installation'],
        mediaEmbed: `
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/SWKz5zq_w5s" 
            title="YouTube video player"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        `,
        infoPopup: {
          main: "Do you want to connect?",
          context: `<i>Remote Pulse</i> is an interactive installation consisting of two identical pulse-sensing stations that 
          are interconnected over the internet. When a person places their hands on one station automatically the person on the 
          other station feels their pulse, as the plates vibrate in sync with the heartbeat of the remote person, and vice versa. 
          The piece was originally presented as part of Lozano-Hemmer's "Border Tuner" installation across the US-Mexico border, 
          with one station in Ciudad Juárez, Chihuahua and the other in El Paso, Texas.<br><br>

          Updated the technologies and particularly the firmware - increased resilience and updated for future scalability and change.
          `,
          tech: `Refactored the firmware to follow modern best-practices and generalize to apply to other artworks.`,
          tools: `Arduino & OpenFrameworks`
        }
      },
      {
        title: "Assembly Line",
        link: "/projects/assembly-line",
        description: "Audience-submitted gestures projected onto a KUKA industrial robot arm, \"physically\" instantiated and destroyed in real time",
        subtitle1: "Industrial approach",
        subtitle2: "& digital interaction",
        year: "2022",
        tags: ['installation', 'robotics', 'web'],
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
          main: "That which is made in inevitably unmade",
          context: `Through Toronto Metropolitan University's Design + Technology LAB, I designed & developed <i>Assembly Line</i> 
            under the constraints brought on by Covid-19.<br><br>
  
           Users submit 'gestures' through a web portal and watch them materialize in the projection, at which point
            they are pulled apart and brought to life.<br><br>
           
           The CBC wrote an <a href="https://www.cbc.ca/arts/in-toronto-here-s-where-you-can-make-art-with-a-giant-industrial-robot-1.6321499" target="_blank" rel="noopener noreferrer">article</a> about it.`,
          tech: `Web portal made in JavaScript with a Node.js backend. The projection content and mapping is done in TouchDesigner.<br><br>
            Tracking of the box for mapping is done live using an HTC VIVE Tracker.`,
          tools: `TouchDesigner & KUKA Robot Arm & Node.js & JavaScript`
        }
      },
      {
        title: "Moth Melody",
        link: "/projects/moth-melody",
        description: "Capacitive-touch lanterns trigger a moth's flight path and musical notes across a collaborative tabletop projection, built for the Ontario Science Centre",
        subtitle1: "Music",
        subtitle2: "& Moths",
        year: "2022",
        tags: ['installation', 'electronics'],
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
          main: "Honestly this one's just good ol' fun for kids",
          context: `
            My class partnered with the <a href="https://www.ontariosciencecentre.ca/" target="_blank" rel="noopener noreferrer">Ontario Science Centre</a>
            to produce interactive exhibits about insects for children. My team's is based on moths.<br><br>
            Users can touch our table's lanterns, which would light up, and a corresponding lantern in the centre projection would light-up as well. 
            The moth is attracted to and moves towards this light - if it passes through a flower, a musical note from a scale plays.
          `,
          tech: `I programmed the project. The interactions were handled using capacitive touch with an Arduino. This communicated to Unity,
            which managed the game mechanics of the installation. TouchDesigner was used for some post-processing and the keystoning of the projection.`,
          tools: `Unity & Arduino & TouchDesigner & Fabrication`
        }
      },
      // {
      //   title: "ScavengeAR_",
      //   link: "/projects/scavenge-ar",
      //   description: "Helping small businesses enter the Metaverse",
      //   subtitle1: "Small Businesses",
      //   subtitle2: "& the Metaverse",
      //   year: "2022",
      //   tags: ['web', 'ar/vr/xr'],
      //   customComponent: "ScavengeARMedia",
      //   infoPopup: {
      //     main: "How can we reduce the upfront cost/work for small businesses entering the Metaverse?",
      //     context: `
      //       Made as a major project for my internship at <a href="https://www.jam3.com/" target="_blank" rel="noopener noreferrer">Jam3</a>, alongside one other 
      //       Creative Developer Intern, two Design Interns, and a Production Intern.<br>
      //       Our brief was to create a solution / prototype for a way to help bring small businesses into the Metaverse.<br><br>

      //       <i>ScavengeAR_</i> allows a small business to create a simple virtual environment to tie into their business. Customers are invited to join
      //       the Metaverse-shop, where they can move through the space and see other users in real-time.<br><br>

      //       In the Metaverse they can access "quests" that earn them and the virtual store points. These quests are tasks that have to be completed in-store
      //       by scanning QR codes under certain circumstances - say a certain time of day or a certain number of days in a row. 
      //       By completing a quest, they earn points towards their account, as well as a group total for the store. Once enough collective points are earned, 
      //       the store "evolves."
      //     `,
      //     tech: `
      //       The 3D environment was created using Three.js.<br>
      //       The backend was made in Node.js with a MongoDB database and Socket.io.<br>
      //       The UI was made in React.

      //       I was responsible for the UI, the backend, and the multi-user functionality in the 3D environment. I also made the generative avatars.
      //     `,
      //     tools: `JavaScript & Node.js & React & Three.js & MongoDB`
      //   }
      // },
      // {
      //   title: "Augmented Symphony",
      //   link: "/projects/augmented-symphony",
      //   description: "An AR mobile app for spatially arranging and walking through a full orchestra at home, with instrument-accurate positional audio",
      //   subtitle1: "Orchestras",
      //   subtitle2: "@ Home",
      //   year: "2021",
      //   tags: ['ar/vr/xr'],
      //   mediaEmbed: `
      //     <iframe 
      //       width="560" 
      //       height="315" 
      //       src="https://www.youtube.com/embed/TyodRsDgzKk" 
      //       title="YouTube video player"
      //       frameborder="0" 
      //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //       allowfullscreen
      //     ></iframe>
      //   `,
      //   infoPopup: {
      //     main: "How can the digital delivery of orchestral music be enhanced?",
      //     context: `
      //       <i>Augmented Symphony</i> was a research project exploring the use of augmented reality (AR) and spatial audio to enhance the audience experience 
      //       of orchestral music at home. The project aimed to engage users through interactivity, allowing them to explore the orchestra in a novel way -
      //       through space.<br><br>

      //       The app allows users to place instruments around their space in AR. They can then walk through their uniquely arranged orchestra, paying attention 
      //       to instruments as they wish and creating their own personalized concert experience.<br><br>

      //       This app, along with a <a href="https://www.academia.edu/84385746/Augmented_Symphony_An_augmented_reality_application_for_immersive_music_listening" target="_blank" rel="noopener noreferrer">
      //       short paper</a> I helped write, was presented as part of 
      //       <a href="http://www.eva-london.org/eva-london-2022/" target="_blank" rel="noopener noreferrer">EVA London 2022</a>.
      //     `,
      //     tech: `
      //       The app was developed in Unity and programmed with C#.<br>
      //       It works on both iOS and Android devices using AR Foundation.<br>
      //     `,
      //     tools: `Unity & C#`
      //   }
      // }
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
        tags: ['installation', 'ai', 'audio'],
        mediaEmbed: `
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/H7OEPd-jixA" 
            title="YouTube video player"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        `,
        infoPopup: {
          main: "What makes you you?",
          context: `Produced during a research residency at Fabrica, <i> I SURRENDERED MY BODY AND I 
          SUCCUMBED TO THE BEAST</i> is a confrontation with the sudden leap into the future we've recently experienced.<br><br>
          Users approach a mic with a screen laying on the ground in front of it. The screen begs out
          <span style="text-transform:uppercase">please talk to me where am I don't leave me alone</span>.
          Upon pushing a button they are prompted to speak for 60 seconds. At the end of those 60 seconds
          all previous recordings are played back atop each other. A few seconds later the user's voice speaks back to them 
          - saying words they never said. As time goes on, previously generated utterances start layering atop each other until 
          the next person uses it.`,
          tech: `The images, playback, and interaction are managed through TouchDesigner`,
          tools: `TouchDesigner & Python`
        }
      },
      {
        title: "I Asked My Reflection Its Name Again",
        link: "/projects/i-asked-my-reflection",
        description: "A Markov model learns a user's mouse behavior in real time, spawning cursor-clones that imitate - and gradually reshape - how they move",
        subtitle1: "Recursive Interaction",
        subtitle2: "& Interacting Recursively",
        year: "2021",
        tags: ['ai', 'web'],
        customComponent: "ReflectionInteractive",
        infoPopup: {
          main: "A forest of reflections",
          context: `
            In <i>I ASKED MY REFLECTION ITS NAME AGAIN</i> users are given a simple direction at the beginning to move their mouse.
            From this point, a number of identical cursors slowly appear. It becomes clear the cursors are imitating their movements.<br><br>
            
            The cursors imitate users' behavior based on their previous movements.
            As cursors appear and users become aware of the role they play in their movement, this affects how they interact with the site. 
            Which will in turn affect the cursors. Which will in turn affect the user. Which will in turn affect the cursors. Which will in turn affect the user.`,
          tech: `
            The project was made in p5.js. The imitation of the cursors is done using a Markov model.`,
          tools: `JavaScript & p5.js`
        }
      },
      {
        title: "AN ANT HAS DRAWN A RECOGNIZABLE CARICATURE OF WINSTON CHURCHILL",
        link: "/projects/an-ant",
        description: "Python eye-detection triggers a boid simulation - visible only while the participant's eyes are closed",
        subtitle1: "Isolated",
        subtitle2: "& Fleeting",
        year: "2023",
        tags: ['installation', 'ai'],
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
          main: "Are you an intelligent actor?",
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
          tech: `Background is a feedback loop of a boid simulation run in Unity.<br>
                    Visual effects are done in TouchDesigner.<br>
                    Python is used to detect whether the participant-performer's eyes are open or closed.<br>
                    `,
          tools: `Unity & Python & TouchDesigner`
        }
      },
      // {
      //   title: "I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER",
      //   link: "/projects/i-cant-hear-you",
      //   description: "Networked performance about [mis]communication",
      //   subtitle1: "Like talking",
      //   subtitle2: "@ a brick wall",
      //   year: "2022",
      //   tags: ['installation'],
      //   mediaEmbed: `
      //     <iframe 
      //       width="560" 
      //       height="315" 
      //       src="https://www.youtube.com/embed/T3VsCSVuLc8" 
      //       title="YouTube video player"
      //       frameborder="0" 
      //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //       allowfullscreen
      //     ></iframe>
      //   `,
      //   infoPopup: {
      //     main: "What exactly are you saying?",
      //     context: `
      //       In <i>I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER</i>, the audience is divided.<br>
      //       In one room, the majority of them remain together. It is warmly lit, and they sat in a semi-circle looking at each other.<br> 
      //       For the other room I took one member of the group, and placed them in a large, dark studio.<br> 
      //       The only thing lighting the room is a projection of long green lines against the wall.<br>
      //       This member's phone is taken and put in a box, then are seated in a high chair with a microphone sitting on the ground in front of them.<br><br>

      //       Connecting these rooms is a Zoom call. In the first room, with the group, the Zoom call is audible and they may communally speak to it.<br>
      //       In the second room with the single participant, they cannot hear anything from the call, but rather just see a visualization of the audio 
      //       from the call, sitting in silence.<br>
      //       Their collective goal: have a conversation. Speak to each other.<br><br>
      //       The performance lasted about 15 minutes for each participant.
      //     `,
      //     tech: `
      //       The audio visualization was done in TouchDesigner.
      //     `,
      //     tools: `TouchDesigner`
      //   }
      // },
      // {
      //   title: "THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE",
      //   link: "/projects/600-spheres",
      //   description: "An embodied audio interaction",
      //   subtitle1: "Spatialized sound",
      //   subtitle2: "& Sonified movements",
      //   year: "2021",
      //   tags: ['ar/vr/xr', 'audio'],
      //   mediaEmbed: `
      //     <iframe 
      //       width="560" 
      //       height="315" 
      //       src="https://www.youtube.com/embed/RHDl9PVFnQk" 
      //       title="YouTube video player"
      //       frameborder="0" 
      //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //       allowfullscreen
      //     ></iframe>
      //   `,
      //   infoPopup: {
      //     main: "Speech as an object and space",
      //     context: `
      //       <i>THERE ARE 600 SPHERES HERE AND NONE OF THEM WERE DESCRIBED IN THE BIBLE</i> is an interface for exploring your voice. 
      //       It invites users to speak for 30 seconds before tearing that into 600 distinct audio grains.<br>
      //       These grains are arranged in the shape of a sphere, which users can interact with using hand movements.<br>
      //       When a user's fingertip 'collides' with a grain, it plays its grain back. This creates a uniquely vocal context that must be 
      //       interacted with spatially.<br> It makes users aware of their voices as digital, three-dimensional media. A flick of the finger captures a lisp, 
      //       a click of the tongue, a warble of the voice.
      //     `,
      //     tech: `
      //       Audio manipulation and interactivity handled in Unity.<br> 
      //       Hand tracking is done using a Leap Motion Controller.
      //     `,
      //     tools: `Unity & C#`
      //   }
      // }
      // {
      //   id: 6,
      //   title: "One hundred and twenty beats per minute",
      //   link: "/projects/120-bpm",
      //   description: "Like beating my head against a wall",
      //   subtitle1: "Talking",
      //   subtitle2: "& Taking",
      //   year: "2020",
      //   tags: ['performance', 'electronics'],
      //   mediaEmbed: `
      //     <iframe 
      //       width="560" 
      //       height="315" 
      //       src="https://www.youtube.com/embed/2vo1pB3hT1Y?si=Du0uAu_-vv7wMe1T" 
      //       title="YouTube video player"
      //       frameborder="0" 
      //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //       allowfullscreen
      //     ></iframe>
      //   `,
      //   infoPopup: {
      //     main:    "Could you do something for me?",
      //     context: `This was a 15 minute performance. Audiences were given no explanation of what was to come - before the performance started,
      //               the following was written in the video call's chat: Enough noise starts the maching. Enough quiet starts the machine. You are welcome to participate.
      //               You do not have to participate. I do not care if or how you participate. If you are to participate please use only your own voice or body.
      //     `,
      //     tech:    `A basic audio analysis determined whether there was enough noise at any given moment and made the decision to strike or not.`,

      //     tools:   `Arduino`
      //   }
      // }
    ]
  }
};

// Auto-assign IDs based on array index
const assignIds = (projects) => {
  return projects.map((project, index) => ({
    ...project,
    id: index
  }));
};

// Apply auto-generated IDs to all categories
Object.keys(projectData).forEach(category => {
  projectData[category].projects = assignIds(projectData[category].projects);
});
