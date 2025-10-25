import React from 'react';
import './App.css';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import ShowDetail from './pages/ShowDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieDetail />} />
        <Route path="/shows" element={<ShowDetail />} />
      </Routes>
    </>
  );
}

export default App;
