import React, { Component } from 'react';
import './assets/App.css';
import Dashboard from './pages/Dashboard';
import Model from './pages/Model';
import Setting from './pages/Setting';
import Error from './pages/404';
import Home from './pages/Home';
import About from './pages/About';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/model' element={<Model />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;