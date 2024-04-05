// In src/App.js

import React, { useState } from 'react';
import BikeForm from './BikeForm';
import BikePlot from './BikePlot'; 
import './App.css'; 


function App() {
  const [bikeGeometry, setBikeGeometry] = useState(null);

  const handleUpdate = (geometry) => {
    console.log('Updating geometry:', geometry);
    setBikeGeometry(geometry);
    // Here you would also update the BikePlot component, once implemented
  };

  return (
    <div className="App">
      <h1>Bike Stem Setup Comparator</h1>
      <div className="app-container">
        <BikeForm onUpdate={handleUpdate} />
        <BikePlot geometry={bikeGeometry} />
      </div>
    </div>
  );    
}


export default App;
