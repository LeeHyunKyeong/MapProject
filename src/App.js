import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import InputpageContainer from './pages/InputPage';
import Resultpage from './pages/ResultPage';

function App() {
  return (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<InputpageContainer />} />
      <Route path="/result" element={<Resultpage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
