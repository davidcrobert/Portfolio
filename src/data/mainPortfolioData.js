// Configuration for the main portfolio home page.
// Manages filter tags and custom project page registry.

export const mainPortfolioConfig = {
  // Combined tags across all project categories
  tags: ["all", "installation", "ai", "electronics", "web", "audio", "robotics"],

  // Column labels for the split-screen layout
  leftColumnLabel: "Art [Personal]",
  rightColumnLabel: "Work [Professional]",

  // Custom project page components for main portfolio.
  // Key = project ID (last segment of project.link, e.g. 'Submirrors')
  // Value = dynamic import function
  // Only register a project here once its custom page is fully implemented.
  customProjectPages: {
    // Work projects
    'undercurrents': () => import('../projectPages/Undercurrents'),
    'Submirrors': () => import('../projectPages/Submirrors'),
    'shadow-tuner': () => import('../projectPages/ShadowTuner'),
    'spiral-reflector': () => import('../projectPages/SpiralReflector'),
    'remote-pulse': () => import('../projectPages/RemotePulse'),
    'assembly-line': () => import('../projectPages/AssemblyLine'),
    'moth-melody': () => import('../projectPages/MothMelody'),
    'augmented-symphony': () => import('../projectPages/AugmentedSymphony'),
    // Art projects
    'the-beast': () => import('../projectPages/TheBeast'),
    'an-ant': () => import('../projectPages/AnAnt'),
    'i-cant-hear-you': () => import('../projectPages/ICantHearYou'),
    'i-asked-my-reflection': () => import('../projectPages/IAskedMyReflection'),
  },
};
