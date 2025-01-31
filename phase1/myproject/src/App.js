import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Player from './pages/Player';
import Designer from './pages/Designer';
import ManageCategories from './pages/ManageCategories';
import ManageQuestions from './pages/ManageQuestions';
import PlayGame from './pages/PlayGame'; // Adjust path as needed
import ShowScoreboard from './pages/ShowScoreboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/player" element={<Player />} />
        <Route path="/designer" element={<Designer />} />
        <Route path="/manage_categories" element={<ManageCategories />} />
        <Route path="/manage_questions" element={<ManageQuestions />} />
        <Route path="/answered" element={<PlayGame />} />
        <Route path="/scoreboard" element={<ShowScoreboard />} />
      </Routes>
    </Router>
  );
}

export default App;
