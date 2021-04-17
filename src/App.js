import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';

//-> component imports
import Main from './components/Main';


function App() {
  return (
    <div className="app">
      <Main />
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
    </div>
  );
}

export default App;
