import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import CategoryPage from './pages/CategoryPage';
import ProjectPage from './components/ProjectPage';
import NotFound from './pages/NotFound';
import { projectData } from './data/projectData';

function HomeScrollReset() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <HomeScrollReset />
      <div className="App">
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
