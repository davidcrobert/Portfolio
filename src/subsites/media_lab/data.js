// MIT Media Lab Application - Subsite Configuration

export const mediaLabData = {
  id: 'media_lab',
  title: 'MIT Media Lab Application',

  // Reference to dedicated home page component
  homeComponent: 'Home',

  // Custom project pages (optional)
  // Map project IDs to dynamic import functions
  customProjectPages: {
    'Submirrors': () => import('./projectPages/Submirrors'),
    'shadow-tuner': () => import('./projectPages/ShadowTuner'),
    'the-beast': () => import('./projectPages/TheBeast'),
    'i-cant-hear-you': () => import('./projectPages/ICantHearYou'),
    '120-bpm': () => import('./projectPages/OneTwentyBPM'),
    'i-asked-my-reflection': () => import('./projectPages/IAskedMyReflection'),
    'assembly-line': () => import('./projectPages/AssemblyLine'),
    'augmented-symphony': () => import('./projectPages/AugmentedSymphony'),
  },

  // Curated projects for this sub-site
  projects: [
    {
      // Reference to project in main projectData (by link)
      originalLink: '/projects/Submirrors',

      // Custom content for this sub-site context
      title: 'Submirrors',
      subtitle1: 'Puppets',
      subtitle2: '& Puppeteers',
      year: '2025',
      personal: false,
      tags: ['interactive', 'ai', 'web'],

      // Custom description for Media Lab context
      description: 'What do you do when an AI takes over your control?',

      // Optional: custom context for info popup
      customContext: `At Media Lab, I want to continue exploring how AI can transform interactive experiences.
        Submirrors represents my approach to using cutting-edge AI (LivePortrait) not just as a tool, but as a
        collaborator in creating meaningful human experiences that challenge our relationship with technology.`
    },
    {
      originalLink: '/projects/shadow-tuner',
      title: 'Shadow Tuner',
      subtitle1: 'Speaking',
      subtitle2: '& Spinning',
      year: '2025',
      personal: false,
      tags: ['interactive', 'ai', 'installation', 'audio'],
      description: 'What does it sound like to hear the world? How can AI help us hear it?',
      customContext: `This project demonstrates my interest in using AI to amplify human connection across cultures.
        The ML system I built analyzes thousands of audio streams to surface human voices, creating a technological
        intervention that prioritizes human speech over noise.`
    },
    {
      originalLink: '/projects/the-beast',
      title: 'I SURRENDERED MY BODY AND I SUCCUMBED TO THE BEAST',
      subtitle1: 'Copying',
      subtitle2: '& Crowing',
      year: '2024',
      personal: true,
      tags: ['installation', 'ai', 'audio'],
      description: 'How do we expect an AI-mediated world to talk back to us? Why do we succumb to The Beast?',
      customContext: `Created during a research residency at Fabrica, this installation embodies my critical
        approach to AI. Rather than simply using the technology, I create experiences that make audiences
        confront their relationship with it - hearing their own voice saying words they never spoke.`
    },
    {
      originalLink: '/projects/i-cant-hear-you',
      title: "I'M SORRY I CAN'T HEAR YOU COULD YOU PLEASE SPEAK A LITTLE LOUDER",
      subtitle1: 'Like talking',
      subtitle2: '@ A brick wall',
      year: '2023',
      personal: true,
      tags: ['installation', 'ai', 'audio'],
      description: 'Will we try to help someone even if we know we probably can\'t?',
      customContext: `THIS IS KINDA NOTHING FOR NOW.`
    },
    {
      originalLink: '/projects/120-bpm',
      title: 'ONE HUNDRED AND TWENTY BEATS PER MINUTE',
      subtitle1: 'Talking',
      subtitle2: '& Taking',
      year: '2020',
      personal: true,
      tags: ['performance', 'electronics'],
      description: "Will we embrace our discomfort in order to stop someone else's?"
    },
    {
      originalLink: '/projects/i-asked-my-reflection',
      title: 'I ASKED MY REFLECTION ITS NAME AGAIN',
      subtitle1: 'Recursive Interaction',
      subtitle2: '& Interacting Recursively',
      year: '2020',
      personal: true,
      tags: ['ai', 'web'],
      description: 'How would you act if there were 200 of you in a room?'
    },
    {
      originalLink: '/projects/assembly-line',
      title: 'Assembly Line',
      subtitle1: 'Industrial approach',
      subtitle2: '& digital interaction',
      year: '2022',
      personal: false,
      tags: ['installation', 'robotics', 'web'],
      description: 'How can we repurpose an industrial robot for creative collaboration?',
      customContext: `This project represents my interest in breaking down barriers between digital and physical
        interaction. Users contribute remotely through a web portal, and their gestures materialize through a
        massive industrial robot - a meditation on labor, creation, and remote collaboration.`
    },
    {
      originalLink: '/projects/augmented-symphony',
      title: 'Augmented Symphony',
      subtitle1: 'Orchestras',
      subtitle2: '@ Home',
      year: '2021',
      personal: false,
      tags: ['ar/vr/xr'],
      description: 'How can we replicate the physical experience of an orchestra at home?',
      customContext: `This project represents my interest in breaking down barriers between digital and physical
        interaction. Users contribute remotely through a web portal, and their gestures materialize through a
        massive industrial robot - a meditation on labor, creation, and remote collaboration.`
    }
  ],

  // Optional: Custom styling overrides
  styling: {
    // Future: custom colors, fonts, etc.
  },

  // Metadata
  meta: {
    school: 'MIT Media Lab',
    program: 'Media Arts and Sciences',
    date: '2025'
  }
};
