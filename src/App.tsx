import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HistoryPage from './pages/HistoryPage';
import './App.css'; // Assuming you have a CSS file for basic styles

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="flex justify-between p-4 text-lg bg-gray-800 text-white">
          <Link to="/" className="hover:text-gray-300">Main</Link>
          <Link to="/history" className="hover:text-gray-300">History</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
