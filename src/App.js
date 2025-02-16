import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DetailsFillingPage from './Components/DetailsFillComponents/DetailsFillingPage';
import Home from './Components/HomePage/Home';
import MyResume from './Components/ResumeDisplay/MyResume';
import AboutUs from './Components/AboutUs/AboutUs';
import NavBar from './Components/Navigation/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import './App.css';

const App = () => {
  // Fetch user email from Redux state (or you can store other user data)
  const email = useSelector((state) => state.dataStore.personalInfo.email);

  return (
    <div>
      <NavBar />

      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* Protected Route: Requires login */}
          <Route
            path="/detailsfillingpage/*"
            element={email ? <DetailsFillingPage /> : <Navigate to="/login" />}
          />

          {/* Route to My Resume: Should be protected as well */}
          <Route
            path="/myresume"
            element={email ? <MyResume /> : <Navigate to="/login" />}
          />

          {/* AboutUs page (public route) */}
          <Route exact path="/about" element={<AboutUs />} />

          {/* Login and Signup routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
