import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Details from './pages/Details';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
