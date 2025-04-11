import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Dashboard</h1>
      <div className="metrics">
        <div className="card total">Total Orders: 0</div>
        <div className="card in-transit">In Transit: 0</div>
        <div className="card delivered">Delivered: 0</div>
        <div className="card issues">Issues: 0</div>
      </div>
    </div>
  );
}

export default App;
