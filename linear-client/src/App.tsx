import React, { useEffect, useState } from 'react';
import './App.css';
import { linearAPI } from './network/api';

function App() {
  const [data, setData] = useState() 
  const [dirty, setDirty] = useState(false) 

  useEffect(()=>{
    if (dirty === true) return

    setDirty(true)

    linearAPI.get("/session/login").then(
      (response) => {
        if (response.status !== 200) return

        console.log("Logged in")
      }
    )

    linearAPI.get("/weatherforecast").then(
      (response: any) =>{
        if (response.status !== 200) return
  
        setData(response.data[0].date.toString())
      }
    )

  }, []

  )
  
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Testing!</h1>
      </header>
      <section><p>{data}</p></section>
    </div>
  );
}

export default App;
