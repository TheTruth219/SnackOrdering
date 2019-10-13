import React from 'react';
import SnackVoting from './components/SnackVoting'
import checkRequests from './components/macro/errorHandling'
import "./assets/styles/styles.css"


function App() {
  return (
    <div className="App">
     <SnackVoting/>
    </div>
  );
}

export default checkRequests (App);
