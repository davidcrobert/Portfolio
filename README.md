# David Robert — Portfolio Source

Source for [davidrobert.computer](https://www.davidrobert.computer), a React portfolio documenting creative technology, interactive installation, AI, audio, robotics, web, and physical computing work.

This repository is intended as a public, reviewable code sample for the portfolio site itself, plus a technical index into selected projects. Many of the production systems described on the site were built for collaborative studio, client, or public-art contexts, so their full installation code is not published here. I can provide sanitized excerpts, architecture walkthroughs, or deeper technical discussion on request.

## Live Site

- Portfolio: https://www.davidrobert.computer
- Resume: https://www.davidrobert.computer/resume

## Selected Technical Evidence

The site is organized around project pages with concise system descriptions, tools, media, role breakdowns, and credits. Useful review entry points:

- `src/projectPages/Undercurrents.js` — large-scale AI/audio/light installation documentation; describes the local AI audio API, FAISS retrieval, LLM response selection, UMAP placement, DANTE routing, and TouchDesigner intercom system.
- `src/projectPages/SpiralReflector.js` — DMX-controlled LED sculpture and camera-to-light mapping documentation.
- `src/projectPages/Submirrors.js` — realtime AI mirror system using live camera input and generative facial manipulation.
- `src/projectPages/ShadowTuner.js` — live radio/audio installation with AI speech classification.
- `src/projectPages/RemotePulse.js` — networked biometric installation using Arduino/OpenFrameworks/MQTT-style interaction patterns.
- `src/projectPages/AssemblyLine.js` — public interactive system combining OpenVR, KUKA robot motion, TouchDesigner, and web input.
- `src/projectPages/MothMelody.js` — Ontario Science Centre installation using Unity, Arduino, TouchDesigner, capacitive touch, projection, and fabrication.
- `src/components/ReflectionInteractive.js` — browser-based interactive behavior for a personal AI/web work.
- `src/data/projectData.js` — structured project metadata powering portfolio navigation and category filtering.

## Technology Stack

- React 18
- React Router
- Styled Components
- p5.js
- Three.js
- TensorFlow.js / face detection libraries
- Tone.js / VexFlow
- Firebase Hosting

## Project Structure

```text
public/                 static assets and project media
src/App.js              routing
src/pages/              top-level pages
src/components/         shared UI and interactive components
src/projectPages/       individual project case-study pages
src/data/               project metadata and media embeds
src/styles/             responsive/mobile/global styling
build/                  generated production output, not edited by hand
```

## Local Development

```bash
npm install
npm start
```

The development server runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

This creates an optimized production bundle in `build/`.

## Notes for Code Review

This repo is a portfolio/application artifact rather than a complete archive of every installation system I have built. The most technically relevant production work often involves:

- physical installation hardware and venue-specific configuration
- studio/client-owned source code
- private datasets or recording archives
- local machine paths, IP addresses, API keys, or AV routing details that should not be public

For that reason, I use the portfolio pages to document system architecture and my role, while keeping sensitive production code private. I am happy to walk through representative code, diagrams, or sanitized excerpts for specific projects.
