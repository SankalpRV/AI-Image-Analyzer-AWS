import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>🤖 AI Image Inspector</h1>

      <p className="subtitle">
        Detect objects in images using cloud AI services
      </p>

      {/* 🔹 Tech Stack */}
      <div className="section">
        <h2>🛠️ Tech Stack</h2>
        <div className="card-container">
          <div className="card">⚛️ React</div>
          <div className="card">☁️ AWS Lambda</div>
          <div className="card">🧠 Rekognition</div>
        </div>
      </div>

      {/* 🔹 Flow */}
      <div className="section">
        <h2>🔄 How It Works</h2>
        <div className="card single-card">
          📤 Upload Image → 🚀 Process via Lambda → 🔍 AI Detection → 📊 Results
        </div>
      </div>

      {/* 🔹 Features */}
      <div className="section">
        <h2>✨ Key Features</h2>
        <div className="card-container">
          <div className="card">⚡ Fast Detection</div>
          <div className="card">📷 Image Preview</div>
          <div className="card">🎯 Accurate Results</div>
        </div>
      </div>

      <button 
        className="analyze-btn"
        onClick={() => navigate('/app')}
      >
        🚀 Start Project
      </button>
    </div>
  );
}

export default Home;