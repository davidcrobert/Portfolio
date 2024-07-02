import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import InstallationPage from './pages/InstallationPage';
import VirtualEnvironmentsPage from './pages/VirtualEnvironmentsPage';
import AugmentedRealityPage from './pages/AugmentedRealityPage';
import WebPage from './pages/WebPage';

import AnAntProject from        './pages/projects/AnAnt';
import AssemblyLineProject from './pages/projects/AssemblyLine';
import ICantHearYouProject from './pages/projects/ICantHearYou';
import MothMelodyProject from   './pages/projects/MothMelody';
import SixHundredSpheresProject from './pages/projects/SixHundredSpheres';

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
          <Route path="/projects/an-ant" element={<AnAntProject />} />
          <Route path="/projects/assembly-line" element={<AssemblyLineProject />} />
          <Route path="/projects/i-cant-hear-you" element={<ICantHearYouProject />} />
          <Route path="/projects/moth-melody" element={<MothMelodyProject />} />
          <Route path="/projects/600-spheres" element={<SixHundredSpheresProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;