import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import InstallationPage from './pages/InstallationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/installation" element={<InstallationPage />} />
          {/* Add more routes here as you create more components */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;