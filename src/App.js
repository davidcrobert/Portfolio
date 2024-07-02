import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import InstallationPage from './pages/InstallationPage';
import VirtualEnvironmentsPage from './pages/VirtualEnvironmentsPage';
import AugmentedRealityPage from './pages/AugmentedRealityPage';
import WebPage from './pages/WebPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/installation" element={<InstallationPage />} />
          <Route path="/virtual-environments" element={<VirtualEnvironmentsPage />} />
          <Route path="/augmented-reality" element={<AugmentedRealityPage />} />
          <Route path="/web" element={<WebPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;