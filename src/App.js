import './App.css';
import Home from './Home';
import Intro from './Intro';
import {Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import { getSettings } from './APIs';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Intro/>} />
        <Route path='Home' element={<Home/>}  />
      </Routes>
    </div>
  );
}

export default App;
