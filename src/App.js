import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import InputpageContainer from './pages/InputPage';
import Resultpage from './pages/ResultPage';
import Recommendpage from './pages/RecommendPage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<InputpageContainer />} />
      <Route path="/result" element={<Resultpage />} />
      <Route path="/recommend" element={<Recommendpage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
