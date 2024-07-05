import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import CategoryPage from './pages/CategoryPage';
import ProjectPage from './components/ProjectPage';
import NotFound from './pages/NotFound';
import NoiseOverlay from './components/NoiseOverlay';
import { projectData } from './data/projectData';

function App() {
  return (
    <Router>
      <div className="App">
        <NoiseOverlay />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/installation" element={<CategoryPage categoryData={projectData.installation} />} />
          <Route path="/virtual-environments" element={<CategoryPage categoryData={projectData.virtualEnvironments} />} />
          <Route path="/web" element={<CategoryPage categoryData={projectData.web} />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;