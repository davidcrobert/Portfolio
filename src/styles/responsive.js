export const breakpoints = {
  desktop: 1200,
  laptop: 900,
  tablet: 768,
  phone: 480,
};

export const media = {
  downDesktop: `@media screen and (max-width: ${breakpoints.desktop}px)`,
  downLaptop: `@media screen and (max-width: ${breakpoints.laptop}px)`,
  downTablet: `@media screen and (max-width: ${breakpoints.tablet}px)`,
  downPhone: `@media screen and (max-width: ${breakpoints.phone}px)`,
  touch: '@media (hover: none), (pointer: coarse)',
};

export const spacing = {
  pageX: 'clamp(16px, 4vw, 32px)',
  pageY: 'clamp(16px, 4vw, 32px)',
  sectionGap: 'clamp(20px, 5vw, 40px)',
  cardPadding: 'clamp(16px, 4vw, 28px)',
};
