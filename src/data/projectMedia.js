const projectMedia = {
  "spiral-reflector": `
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
  "shadow-tuner": `
    <iframe
      width="560"
      height="315"
      src="https://player.vimeo.com/video/1008985225?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
      title="Shadow Tuner"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "remote-pulse": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/SWKz5zq_w5s"
      title="Remote Pulse"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "assembly-line": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/HDGwEiiztQw"
      title="Assembly Line"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "moth-melody": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/1aOuyW_uDc0"
      title="Moth Melody"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "augmented-symphony": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/TyodRsDgzKk"
      title="Augmented Symphony"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "the-beast": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/H7OEPd-jixA"
      title="The Beast"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "an-ant": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/AfoHMi5Gyms"
      title="An Ant Has Drawn a Recognizable Caricature of Winston Churchill"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "i-cant-hear-you": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/T3VsCSVuLc8"
      title="I'm Sorry I Can't Hear You Could You Please Speak a Little Louder"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `,
  "120-bpm": `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/2vo1pB3hT1Y?si=Du0uAu_-vv7wMe1T"
      title="One Hundred and Twenty Beats Per Minute"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `
};

export const getProjectMediaEmbed = (linkOrProject) => {
  const link = typeof linkOrProject === "string"
    ? linkOrProject
    : linkOrProject?.originalLink || linkOrProject?.link;

  const projectId = link?.split("/").pop();
  return projectId ? projectMedia[projectId] || null : null;
};
