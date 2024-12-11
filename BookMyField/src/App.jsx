import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Navbar, HeroSection, WelcomeSection, TurfSlider, FacilitiesSection, SportTypesSection, Footer ,ScrollArrow} from "./Home";
import UserHome from "./components/User/UserHome";
import BookedTurfs from "./components/User/BookedTurfs"; 
import Login from "./components/Auth/login"; 
import SignUp from "./components/Auth/Signup";
import Contact from "./components/Home/contact";
import AboutUS from "./components/Home/About";
import AdminDashboard from './components/Admin/AdminDashboard';
import { useNavigate } from 'react-router-dom';

import ManageTurfList from "./components/Booking/ManageTurfList";
import ManageTurf from "./components/Booking/ManageTurf";


const turfs = [
  {
    id: 1,
    name: "Prime Sports Turf",
    location: "Pune City",
    description: "A premium turf with state-of-the-art facilities for football and cricket.",
    image: "/images/cricket.jpg",
  },
  {
    id: 2,
    name: "Don Bosco Football Turf",
    location: "Mumbai",
    description: "Offers spacious grounds with high-quality artificial turf.",
    image: "/images/football.jpg",
  },
  {
    id: 3,
    name: "Urban Play Ground Turf",
    location: "Pune",
    description: "Perfect for weekend matches and tournaments. Equipped with floodlights.",
    image: "/images/basketball.jpg",
  },
  {
    id: 4,
    name: "TopPlay Turf",
    location: "Mumbai",
    description: "Offers spacious grounds with high-quality artificial turf.",
    image: "/images/tennis.jpg",
  },
];



function App() {

  const [turfList, setTurfList] = useState([]);
  const navigate = useNavigate();

  const addTurf = (newTurf) => {
    setTurfList((prevList) => [...prevList, { ...newTurf, status: 'Booked' }]);
  };

  const updateTurfList = (updatedList) => {
    setTurfList(updatedList);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login state
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login state
    toast.success('Login Successful!', {
      position: "top-right", 
      autoClose: 2000, 
      hideProgressBar: true, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true, 
    });
  };



  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login state
    toast.info('Logged out successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleError = () => {
    toast.error('An error occurred!', {
      position: "top-right",
      autoClose: 2300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <ScrollArrow />
      <ToastContainer /> {/* Add ToastContainer here */}

      <Routes>
        <Route path="/" element={
          <>
           <WelcomeSection />  
           <TurfSlider turfs={turfs} />
            
            <HeroSection />
           
            <FacilitiesSection />
            <SportTypesSection />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booked-turfs" element={<BookedTurfs turfList={turfList} />} />
        <Route path="/manage-turf" element={<ManageTurf addTurf={addTurf} />} />
        <Route path="/manage-turf-list" element={<ManageTurfList turfList={turfList} updateTurfList={updateTurfList} />} />
      
      
      </Routes>
    </div>
  );
}

export default App;