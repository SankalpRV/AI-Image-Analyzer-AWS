import React, { useState } from 'react';
import './App.css';

// REPLACE THIS WITH YOUR API GATEWAY URL FROM PART 1
const API_ENDPOINT = "https://ot3xm12uu3.execute-api.us-east-2.amazonaws.com/default/ImageAnalyzerFunction";


function AnalyzerApp() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      
      // Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send image to AWS Lambda
  const analyzeImage = async () => {
    if (!base64Image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    setLabels([]);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      
      if (data.labels) {
        setLabels(data.labels);
      } else {
        console.error("Error from server:", data);
        alert("Analysis failed. Check console.");
      }
    } catch (error) {
      console.error("Error connecting to API:", error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 AI Image Inspector</h1>
        <p>Powered by AWS Rekognition, Lambda & React</p>
        
        <div className="upload-container">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="file-input"
          />
        </div>

        {selectedImage && (
          <div className="preview-container">
            <img src={selectedImage} alt="Preview" className="image-preview" />
            <br />
            <button 
              onClick={analyzeImage} 
              disabled={loading}
              className="analyze-btn"
            >
              {loading ? <div className="spinner"></div> : "Analyze Image"}
            </button>
          </div>
        )}

        {labels.length > 0 && (
          <div className="results-container">
            <h3>Analysis Results:</h3>
            <div className="tags-grid">
              {labels.map((label, index) => (
                <div key={index} className="tag-card">
                  <span className="tag-name">{label.Name}</span>
                  <span className="tag-confidence">{label.Confidence}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default AnalyzerApp;
