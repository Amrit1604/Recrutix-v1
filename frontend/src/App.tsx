import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import MatchPage from './pages/MatchPage';
import DashboardPage from './pages/DashboardPage';
import InterviewScheduler from './pages/InterviewScheduler';

/**
 * Main App Component - Recrutix Premium
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="page-transition">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/interviews" element={<InterviewScheduler />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
