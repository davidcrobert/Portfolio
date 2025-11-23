# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Start development server (React app runs on localhost:3000)
- `npm run build` - Build production bundle to `build/` folder
- `npm test` - Run Jest tests in watch mode

### Deployment
- `firebase deploy` - Deploy to Firebase Hosting (requires Firebase CLI)
- Build folder is served from `build/` directory as configured in firebase.json

## Architecture

This is a React portfolio website showcasing interactive art and technology projects. The architecture follows a component-based structure with React Router for navigation.

### Key Data Structure
- **Project Data**: All project information is centralized in `src/data/projectData.js` with three main categories: `work`, `experiments`, and `art`
- Each project has metadata including title, year, tags, media embeds, and detailed popup information
- Projects support custom React components for interactive experiences

### Core Components
- **App.js**: Main router with routes for home, about, category pages, and individual projects
- **CategoryPage**: Dynamically renders project categories using data from projectData.js
- **ProjectPage**: Individual project pages with media embeds and detailed information popups
- **Custom Interactive Components**: Several projects have specialized interactive components (e.g., LLMAuthentication, ReflectionInteractive, ScavengeARMedia)

### Technology Integrations
The portfolio includes several advanced technology integrations:
- **AI/ML**: WebLLM for client-side language models, TensorFlow.js for computer vision
- **Audio**: Tone.js, VexFlow for music notation, Web Audio API
- **3D Graphics**: Three.js for 3D scenes and WebGL
- **Computer Vision**: MediaPipe for face detection, ml5 for machine learning
- **Creative Coding**: p5.js for generative art and interactions

### Styling
- Uses styled-components for component styling
- Global styles in `src/index.css`
- Mobile-specific styles in `src/styles/mobile.css`
- Custom scrollbar styling in `src/styles/scrollbar.css`

### Interactive Features
Several projects include real-time interactive components that run entirely in the browser:
- Client-side LLM authentication system
- Real-time face detection and eye tracking
- Mouse movement prediction using Markov models
- Audio analysis and manipulation

### Configuration
- Global app configuration in `src/config.js` (currently for noise overlay effects)
- Firebase hosting configured for SPA routing in firebase.json

## Subsite System

The portfolio includes a modular subsite system that allows creating curated project collections with custom home pages and routing. This is useful for tailoring the portfolio for specific applications, schools, or audiences.

### Architecture Overview

**Subsites** are self-contained portfolio views that:
- Display a curated selection of projects from the main portfolio
- Have custom home pages with unique layouts and branding
- Use custom project descriptions and context specific to their audience
- Maintain their own routing namespace (e.g., `/media_lab`, `/media_lab/projects/project-name`)

### File Structure

Each subsite lives in its own directory under `src/subsites/`:

```
src/subsites/
└── [subsite-name]/
    ├── index.js          # Exports Home component and data
    ├── Home.js           # Custom home page component
    └── data.js           # Subsite configuration
```

### Core Files

1. **`src/data/subsiteData.js`** - Central registry that imports and exports all subsites
2. **`src/pages/SubSitePage.js`** - Generic subsite listing page (used when no custom Home exists)
3. **`src/App.js`** - Router configuration that includes subsite routes

### Creating a New Subsite

#### Step 1: Create the directory structure
```bash
mkdir -p src/subsites/[subsite-name]
touch src/subsites/[subsite-name]/index.js
touch src/subsites/[subsite-name]/Home.js
touch src/subsites/[subsite-name]/data.js
```

#### Step 2: Configure `data.js`

Define the subsite configuration:

```javascript
// src/subsites/[subsite-name]/data.js

export const [subsiteName]Data = {
  id: '[subsite-name]',
  title: 'Subsite Title',

  // Intro content (used in SubSitePage generic view)
  intro: {
    statement: 'Main statement about this collection',
    description: 'Detailed description',
    subtitle1: 'First subtitle',
    subtitle2: 'Second subtitle'
  },

  // Curated projects
  projects: [
    {
      // Link to original project in projectData.js
      originalLink: '/projects/project-id',

      // Custom display content
      title: 'Project Title',
      subtitle1: 'Subtitle 1',
      subtitle2: 'Subtitle 2',
      year: '2025',
      personal: false,  // Used to categorize projects in custom layouts
      tags: ['tag1', 'tag2'],

      // Custom description for this subsite context
      description: 'Description tailored to this audience',

      // Optional: Additional context for project info popups
      customContext: `Extended explanation specific to this subsite's audience.`
    }
  ],

  // Optional: Custom styling (for future use)
  styling: {},

  // Optional: Metadata
  meta: {
    organization: 'Organization Name',
    date: '2025'
  }
};
```

#### Step 3: Create `index.js`

Export the Home component and data:

```javascript
// src/subsites/[subsite-name]/index.js

export { default as Home } from './Home';
export { [subsiteName]Data } from './data';
```

#### Step 4: Create `Home.js`

Build a custom home page component. You can:
- Use the generic SubSitePage layout (import from `src/pages/SubSitePage.js`)
- Create a completely custom layout (see `src/subsites/media_lab/Home.js` for reference)

Key features to include:
- Import data from `./data.js`
- Use `<Header>` component for consistent navigation
- Link to projects using `/[subsite-id]/projects/[project-id]` format
- Include link back to main portfolio

Example minimal Home.js:
```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import { [subsiteName]Data } from './data';

const Container = styled.div`
  // Your custom styles
`;

function [SubsiteName]Home() {
  return (
    <Container>
      <Header title={[subsiteName]Data.title} />
      {/* Your custom layout */}
      {[subsiteName]Data.projects.map(project => (
        <Link to={`/[subsite-id]/projects/${project.originalLink.split('/').pop()}`}>
          {project.title}
        </Link>
      ))}
    </Container>
  );
}

export default [SubsiteName]Home;
```

#### Step 5: Register in `subsiteData.js`

```javascript
// src/data/subsiteData.js

import { [subsiteName]Data } from '../subsites/[subsite-name]';

export const subsiteData = {
  media_lab: mediaLabData,
  [subsite_name]: [subsiteName]Data,  // Add your subsite here
};
```

#### Step 6: Add routing in `App.js`

```javascript
// src/App.js

import { Home as [SubsiteName]Home } from './subsites/[subsite-name]';

// In the Routes section:
<Route path="/[subsite-id]" element={<[SubsiteName]Home />} />
```

Note: The generic routes `/:subsiteId` and `/:subsiteId/projects/:projectId` already exist and will handle your subsite automatically.

### Routing Behavior

Subsites use a hierarchical routing structure:

1. **`/[subsite-id]`** - Custom home page (e.g., `/media_lab`)
2. **`/[subsite-id]/projects/[project-id]`** - Individual project pages within subsite context
3. Projects link back to the original `projectData.js` definitions but can display custom context

### Project Page Integration

When viewing a project through a subsite URL (e.g., `/media_lab/projects/submirrors`):
- The project can use a **custom project page component** unique to the subsite, OR
- Fall back to the default `ProjectPage` component with subsite-specific data
- The `customContext` field from the subsite's data can provide additional contextual information
- Users can navigate back to the subsite or to the main portfolio

### Custom Project Pages

Subsites can define completely custom project page components for individual projects. This allows for:
- Unique layouts and styling per project within a subsite
- Custom interactive elements specific to the subsite's narrative
- Different information architecture or content presentation

#### Creating Custom Project Pages

**Step 1: Create the projectPages directory**
```bash
mkdir -p src/subsites/[subsite-name]/projectPages
```

**Step 2: Create a custom project page component**

Create a new file at `src/subsites/[subsite-name]/projectPages/[ProjectName].js`:

```javascript
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import { projectData } from '../../../data/projectData';

// Your custom styled components here
const PageWrapper = styled.div`
  /* Custom styles */
`;

const CustomProjectPage = ({ project, subsiteContext, subsiteId }) => {
  const [originalProject, setOriginalProject] = useState(null);

  // Load the original project data from projectData.js
  useEffect(() => {
    for (const category in projectData) {
      const foundProject = projectData[category].projects.find(
        p => p.link === project.originalLink
      );
      if (foundProject) {
        setOriginalProject(foundProject);
        break;
      }
    }
  }, [project]);

  if (!originalProject) {
    return null;
  }

  const backLink = `/${subsiteId}`;

  return (
    <PageWrapper>
      <Header
        title={project.title}
        subtitle1={project.subtitle1}
        subtitle2={project.subtitle2}
        year={project.year}
        backLink={backLink}
      />
      {/* Your custom content here */}
      {/* Access original project data via originalProject */}
      {/* Access subsite-specific data via project */}
    </PageWrapper>
  );
};

export default CustomProjectPage;
```

**Props passed to custom project pages:**
- `project` - The project data from the subsite's `projects` array (includes custom fields like `customContext`)
- `subsiteContext` - The full subsite data object
- `subsiteId` - The URL-safe subsite identifier

**Step 3: Register the custom page in data.js**

Add the custom page to the `customProjectPages` mapping in your subsite's `data.js`:

```javascript
// src/subsites/[subsite-name]/data.js

export const [subsiteName]Data = {
  id: '[subsite-name]',
  title: 'Subsite Title',

  // Map project IDs to dynamic import functions
  customProjectPages: {
    '[project-id]': () => import('./projectPages/[ProjectName]'),
    // Add more custom pages as needed
  },

  projects: [
    {
      originalLink: '/projects/[project-id]',
      title: 'Project Title',
      // ... other fields
    }
  ]
};
```

**Important notes:**
- The key in `customProjectPages` must match the project ID from the URL (e.g., `'Submirrors'` for `/media_lab/projects/Submirrors`)
- Use dynamic imports (`() => import(...)`) for code-splitting and better performance
- If a custom page is not found or fails to load, the system automatically falls back to the default ProjectPage
- Custom pages have full access to the original project data from `projectData.js` and can override or extend it

#### Example: Media Lab Submirrors Custom Page

The `media_lab` subsite includes a custom project page for "Submirrors" at `src/subsites/media_lab/projectPages/Submirrors.js`:

**Features:**
- Custom styled section highlighting Media Lab relevance
- Same overall structure as default ProjectPage but with reordered/emphasized content
- Custom background gradient for the "Why This Matters" section
- Access to both original project data and subsite-specific customizations

### Example: Media Lab Subsite

The `media_lab` subsite demonstrates advanced features:

**Custom Layout** (`src/subsites/media_lab/Home.js`):
- Split-screen design separating "Personal" vs "Professional" projects
- Hover-based image previews
- Custom header with animated text
- Background sketch using p5.js
- Image preloading and caching

**Project Customization** (`src/subsites/media_lab/data.js`):
- Projects have `personal` flag for categorization
- Custom `customContext` fields explain relevance to Media Lab application
- Tailored descriptions focusing on AI and interactive technology themes

### Best Practices

1. **Keep subsites focused** - Curate 5-10 relevant projects, not your entire portfolio
2. **Customize descriptions** - Tailor project descriptions to the subsite's audience
3. **Maintain consistency** - Use consistent styling and branding within a subsite
4. **Link back to main portfolio** - Always provide a way to view the full portfolio
5. **Reuse components** - Leverage existing components like Header, Sketch, etc.
6. **Test routing** - Ensure all internal links use the correct `/[subsite-id]/projects/[project-id]` format
7. **Image assets** - Projects should have images at `/public/images/projects/[project-id].{jpg,png}` for previews