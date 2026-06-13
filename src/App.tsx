import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetails from './pages/ProjectDetails';
import SearchResults from './pages/SearchResults';
import PythonInterpreterPage from './pages/PythonInterpreterPage';
import FinalChallenge from './pages/FinalChallenge';
import GlossaryPage from './pages/GlossaryPage';
import BadgesPage from './pages/BadgesPage';
import { PointsProvider } from './context/PointsContext';
import BadgeToast from './components/BadgeToast';

const App: React.FC = () => {
  return (
    <PointsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/python" element={<PythonInterpreterPage />} />
          <Route path="/final-challenge" element={<FinalChallenge />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/badges" element={<BadgesPage />} />
        </Routes>
        <BadgeToast />
      </Router>
    </PointsProvider>
  );
};

export default App;
