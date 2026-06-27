import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import CategoryPage from './pages/CategoryPage';
import ProjectPage from './components/ProjectPage';
import NotFound from './pages/NotFound';
import { projectData } from './data/projectData';

function Analytics() {
  const location = useLocation();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;

    if (lastTrackedPath.current === pagePath) {
      return;
    }

    lastTrackedPath.current = pagePath;

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);
  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Analytics />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/work" element={<CategoryPage categoryData={projectData.work} />} />
<Route path="/art" element={<CategoryPage categoryData={projectData.art} />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
