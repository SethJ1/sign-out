import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './routes/LoginPage';
import StartPage from './routes/StartPage';
import Signup from './routes/CreateAccountPage';
import PostJob from './routes/FindJobPage';
import JobListPage from './routes/JobListPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-account" element={<Signup />} />
          <Route path="/home" element={<StartPage />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job-list" element={<JobListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;