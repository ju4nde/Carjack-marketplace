import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import { UserProvider } from './context/UserContext'; //when page is loaded, this checks if user is logged in and 
                                                     //fetches profile.data

function App() {
  return (
    <Router>
      <UserProvider> {/*Fetches user data  */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
