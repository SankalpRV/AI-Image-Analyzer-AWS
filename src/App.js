import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import AnalyzerApp from './AnalyzerApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<AnalyzerApp />} />
    </Routes>
  );
}

export default App;