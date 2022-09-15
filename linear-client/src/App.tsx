import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const axios = require('axios').default;

  let url = process.env.REACT_APP_API_BASE_URL

  return (
    <div className="App">
      <header className="App-header">
        {url}
      </header>
    </div>
  );
}

export default App;
