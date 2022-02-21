import React, { Component } from 'react';
import './assets/App.css';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Setting from './pages/Setting';
import Error from './pages/404';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;