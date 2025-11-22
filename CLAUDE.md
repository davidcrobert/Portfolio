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