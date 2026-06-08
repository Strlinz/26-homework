import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetails from './pages/ProjectDetails';
import SearchResults from './pages/SearchResults';
import PythonInterpreterPage from './pages/PythonInterpreterPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/python" element={<PythonInterpreterPage />} />
      </Routes>
    </Router>
  );
};

export default App;