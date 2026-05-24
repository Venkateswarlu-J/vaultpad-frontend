import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PadPage from './pages/PadPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pad/:key" element={<PadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;