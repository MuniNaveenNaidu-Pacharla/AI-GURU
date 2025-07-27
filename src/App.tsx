import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { CareerCoinProvider } from './context/CareerCoinContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import ResourcesPage from './pages/ResourcesPage';
import CareerTrackerPage from './pages/CareerTrackerPage';
import SkillMatcherPage from './pages/SkillMatcherPage';
import MindsetPage from './pages/MindsetPage';
import StudentDashboard from './pages/StudentDashboard';
import CareerCoinPage from './pages/CareerCoinPage';
import AskPage from './pages/AskPage';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <CareerCoinProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="roadmap" element={<RoadmapPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="tracker" element={<CareerTrackerPage />} />
                <Route path="skill-matcher" element={<SkillMatcherPage />} />
                <Route path="mindset" element={<MindsetPage />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="careercoin" element={<CareerCoinPage />} />
                <Route path="ask" element={<AskPage />} />
              </Route>
            </Routes>
          </Router>
        </CareerCoinProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;