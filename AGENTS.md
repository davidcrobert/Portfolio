# Repository Guidelines

## Project Structure & Module Organization
- SPA built with Create React App. Entry point at `src/index.js`, layout and routing in `src/App.js`.
- UI building blocks live in `src/components/`; pages in `src/pages/`; shared styles in `src/styles/`, global CSS in `src/index.css` and `src/App.css`.
- Data/config lives in `src/data/` and `src/config.js`; media-lab subsite content sits under `src/subsites/media_lab/` with `projectPages/` for individual writeups.
- Static assets go in `public/`; production output is generated in `build/` (do not edit by hand).

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm start` — run the dev server at `http://localhost:3000` with hot reload.
- `npm test` — run Jest in watch mode via `react-scripts`; press `a` for all tests.
- `npm run build` — create optimized production bundle in `build/`.

## Coding Style & Naming Conventions
- JavaScript/JSX with 2-space indentation; prefer functional components and hooks.
- Components and pages: PascalCase file names (e.g., `CategoryPage.js`, `WelcomeOverlay.js`). Utility modules and data files: camelCase (e.g., `config.js`).
- Keep styles co-located in `src/styles/` or component-scoped with styled-components when practical; avoid inline styles for reusable patterns.
- Use descriptive prop names; favor small, focused components over sprawling containers.
- ESLint inherits from `react-app`; address warnings before committing (`npm start` surfaces them).

## Testing Guidelines
- Testing uses Jest + React Testing Library (`react-scripts test`). Place specs alongside components as `ComponentName.test.js` or under `src/__tests__/`.
- Cover new behaviors, especially data transforms and routed flows. Aim for meaningful assertions (DOM queries by role/text rather than selectors).
- For quick coverage checks: `npm test -- --coverage` (optional).

## Commit & Pull Request Guidelines
- Follow the short, imperative style seen in history (e.g., `Add subsite system`, `Custom subsite project pages`). Keep scope focused per commit.
- Before opening a PR: ensure `npm test` passes, summarize changes, note any new routes/components, and link relevant issues. Add screenshots/GIFs for visible UI updates.
- Keep PR descriptions concise: what changed, why, and how to verify (commands or steps).

## Security & Configuration Tips
- Do not commit secrets; if environment variables are needed, use `.env` with `REACT_APP_` prefixes and add the file to `.gitignore`.
- Validate third-party libraries before adding; this repo already includes TensorFlow, face detection, and Magenta dependencies—remove unused imports to keep bundles lean.
