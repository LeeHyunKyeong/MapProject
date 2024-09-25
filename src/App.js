import { Routes, Route, HashRouter } from 'react-router-dom';
import React from 'react';
import InputpageContainer from './pages/InputPage';
import Resultpage from './pages/ResultPage';

function App() {
  return (
  <HashRouter>
    <Routes>
      <Route path="/" element={<InputpageContainer />} />
      <Route path="/result" element={<Resultpage />} />
    </Routes>
  </HashRouter>
  );
}

export default App;
