import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import CategoryPage from './pages/CategoryPage';
import ProjectPage from './components/ProjectPage';
import SubSitePage from './pages/SubSitePage';
import { Home as MediaLabHome } from './subsites/media_lab';
import NotFound from './pages/NotFound';
import NoiseOverlay from './components/NoiseOverlay';
import { projectData } from './data/projectData';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NoiseOverlay /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/work" element={<CategoryPage categoryData={projectData.work} />} />
          <Route path="/experiments" element={<CategoryPage categoryData={projectData.experiments} />} />
          <Route path="/art" element={<CategoryPage categoryData={projectData.art} />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />

          {/* Sub-site routes - must come after specific routes to avoid conflicts */}
          <Route path="/media_lab" element={<MediaLabHome />} />
          <Route path="/:subsiteId" element={<SubSitePage />} />
          <Route path="/:subsiteId/projects/:projectId" element={<ProjectPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
