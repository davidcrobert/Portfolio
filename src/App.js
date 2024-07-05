import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import InstallationPage from './pages/InstallationPage';
import VirtualEnvironmentsPage from './pages/VirtualEnvironmentsPage';
import WebPage from './pages/WebPage';
import ProjectPage from './components/ProjectPage';
import NotFound from './pages/NotFound';
import NoiseOverlay from './components/NoiseOverlay';

function App() {
  return (
    <Router>
      <div className="App">
        <NoiseOverlay />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/installation" element={<InstallationPage />} />
          <Route path="/virtual-environments" element={<VirtualEnvironmentsPage />} />
          <Route path="/web" element={<WebPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;