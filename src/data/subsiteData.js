// Sub-site configurations for custom portfolio views
// Each sub-site can showcase a curated selection of projects with custom descriptions
// Individual subsite data is now maintained in their respective directories under src/subsites/

import { mediaLabData } from '../subsites/media_lab';

export const subsiteData = {
  media_lab: mediaLabData,

  // Example template for additional sub-sites
  // To add a new subsite:
  // 1. Create a new directory under src/subsites/[subsite-name]
  // 2. Create Home.js (custom home page component)
  // 3. Create data.js (subsite configuration)
  // 4. Create index.js to export both
  // 5. Import and add here
  //
  // Example:
  // import { cmuEtcData } from '../subsites/cmu_etc';
  // cmu_etc: cmuEtcData,
};

// Helper function to get subsite by ID
export const getSubsite = (subsiteId) => {
  return subsiteData[subsiteId] || null;
};

// Helper function to get all subsite IDs
export const getSubsiteIds = () => {
  return Object.keys(subsiteData);
};
