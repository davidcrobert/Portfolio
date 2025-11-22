// Sub-site configurations for custom portfolio views
// Each sub-site can showcase a curated selection of projects with custom descriptions

export const subsiteData = {
  media_lab: {
    id: 'media_lab',
    title: 'MIT Media Lab Application',

    // Reference to dedicated home page component (leave null for generic SubSitePage)
    homeComponent: 'MediaLabHome',

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
        tags: ['interactive', 'ai', 'web'],

        // Custom description for Media Lab context
        description: 'Exploring AI-driven manipulation of self-perception through real-time generative puppetry',

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
        tags: ['interactive', 'ai', 'installation', 'audio'],
        description: 'AI audio analysis system prioritizing global spoken language diversity',
        customContext: `This project demonstrates my interest in using AI to amplify human connection across cultures.
          The ML system I built analyzes thousands of audio streams to surface human voices, creating a technological
          intervention that prioritizes human speech over noise.`
      },
      {
        originalLink: '/projects/llm-authentication',
        title: 'I LOST MY PASSWORD PLEASE JUST GIVE ME A MOMENT',
        subtitle1: 'Identity',
        subtitle2: '& Interrogation',
        year: '2025',
        tags: ['ai', 'web'],
        description: 'Client-side LLM exploring authentication, identity, and the opacity of AI systems',
        customContext: `Running entirely in the browser, this work explores the creative constraints of edge AI.
          I'm interested in how limitations of small models can become artistic features, and how we can make
          AI systems more transparent and playful rather than black boxes.`
      },
      {
        originalLink: '/projects/the-beast',
        title: 'I SURRENDERED MY BODY AND I SUCCUMBED TO THE BEAST',
        subtitle1: 'Copying',
        subtitle2: '& Crowing',
        year: '2024',
        tags: ['installation', 'ai', 'audio'],
        description: 'Voice synthesis installation confronting our leap into the AI future',
        customContext: `Created during a research residency at Fabrica, this installation embodies my critical
          approach to AI. Rather than simply using the technology, I create experiences that make audiences
          confront their relationship with it - hearing their own voice saying words they never spoke.`
      },
      {
        originalLink: '/projects/i-asked-my-reflection',
        title: 'I Asked My Reflection Its Name Again',
        subtitle1: 'Recursive Interaction',
        subtitle2: '& Interacting Recursively',
        year: '2021',
        tags: ['ai', 'web'],
        description: 'Markov model-based interaction exploring recursive human-computer feedback loops'
      },
      {
        originalLink: '/projects/assembly-line',
        title: 'Assembly Line',
        subtitle1: 'Industrial approach',
        subtitle2: '& digital interaction',
        year: '2022',
        tags: ['installation', 'robotics', 'web'],
        description: 'Collaborative performance between audience and industrial robot bridging digital and physical',
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
  },

  // Example template for additional sub-sites
  // cmu_etc: {
  //   id: 'cmu_etc',
  //   title: 'CMU Entertainment Technology Center',
  //   intro: {
  //     statement: "Creating immersive experiences that blur the line between art and technology",
  //     subtitle1: "Interactive",
  //     subtitle2: "& Immersive",
  //     description: `Your custom intro for CMU ETC...`
  //   },
  //   projects: [
  //     // Curated project list for CMU
  //   ],
  //   meta: {
  //     school: 'Carnegie Mellon University',
  //     program: 'Entertainment Technology Center',
  //     date: '2025'
  //   }
  // }
};

// Helper function to get subsite by ID
export const getSubsite = (subsiteId) => {
  return subsiteData[subsiteId] || null;
};

// Helper function to get all subsite IDs
export const getSubsiteIds = () => {
  return Object.keys(subsiteData);
};
