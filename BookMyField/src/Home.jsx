import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

export function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">
          <Link to="/">BookMyField { }</Link>
          <img src="/images/icon2.png" alt="icon" className="brand-icon" />
        </span>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/booked-turfs">Booked Turfs</Link>
            <Link to="/login"> <button onClick={onLogout}>Logout</button></Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Hero Section Component
export function HeroSection() {
  return (
    <header className="hero">
      <h2>
        Reserve your sports turf with ease and enjoy your game on your
        schedule. Whether it's football, cricket, or any other sport, we’ve
        got you covered!
        <br />
        Book Your Turf Anytime, Anywhere!
      </h2>
    </header>
  );
}

// Welcome Section Component
export function WelcomeSection() {
  return (
    <section className="welcome">
      <h2>Welcome to BookMyField</h2>
      <p>
        Welcome to our Turf Booking System, your ultimate destination for
        seamless sports experiences! Whether you're a passionate athlete, a
        weekend warrior, or just looking for some fun with friends, we've got
        you covered. Our platform is designed to simplify the process of
        booking a turf, making it as easy as 1-2-3!
        <br />
        With our user-friendly interface, you can browse through a wide
        selection of top-quality turfs available in your area. Our extensive
        network of partner facilities ensures that you'll find the perfect
        turf for your favorite sport, be it cricket, football, or any other.
        Once you've found the turf that suits your needs, booking is a breeze.
        No more lengthy phone calls or waiting in line-just a few clicks and
        you're all set!
      </p>
      {/* <button>Get Started</button> */}
    </section>
  );
}

// Turf Slider Component
export function TurfSlider({ turfs }) {
  return (
    <div className="slider-container">
      <h2 className="slider-heading">Explore Our Turfs </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="swiper-container"
      >
        {turfs.map((turf) => (
          <SwiperSlide key={turf.id}>
            <div className="slide">
              <img
                src={turf.image}
                alt={turf.name}
                className="turf-image"
              />
              <div className="turf-info">
                <h2>{turf.name}</h2>
                <p>
                  <strong>Location:</strong> {turf.location}
                </p>
                <p>{turf.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Facilities Section Component
export function FacilitiesSection() {
  return (
    <section className="facilities">
      <h2>Instant Booking & Premium Facilities</h2>
      <p>
        Say goodbye to tedious reservation processes! With our instant booking
        feature, you can secure your preferred location, date, and time in
        just a few steps. Experience premium amenities curated to elevate your
        sports journey.
      </p>
      {/* <button>Get Started</button> */}
    </section>
  );
}

//  Sports section
export function SportTypesSection() {
  return (
    <section className="sport-types">
      <h2>Sport Types We Offer & Many More...</h2>
      <div className="sport-grid">
        <div className="sport-item">
          <img src="/images/cricket_icon.png" alt="Cricket" />
          <h3>Cricket</h3>
          <p>
            Premium cricket turf perfect for friendly matches and professional
            practice.
          </p>
          <Link to="/manage-turf">
            <button>Book Now !!!</button>
          </Link>
        </div>
        <div className="sport-item">
          <img src="/images/football_icon.png" alt="Football" />
          <h3>Football</h3>
          <p>
            High-quality football turfs for both recreational games and
            competitive tournaments.
          </p>
          <Link to="/manage-turf">
            <button>Book Now !!!</button>
          </Link>
        </div>
        <div className="sport-item">
          <img src="/images/basketball_icon.png" alt="Basketball" />
          <h3>Basketball</h3>
          <p>
            Our basketball courts are perfect for players of all levels with
            great surface traction and lighting.
          </p>
          <Link to="/manage-turf">
            <button>Book Now !!!</button>
          </Link>
        </div>
        <div className="sport-item">
          <img src="/images/tennis_icon.png" alt="Tennis" />
          <h3>Tennis</h3>
          <p>
            Play tennis on smooth, professional-grade courts designed for
            perfect ball bounce.
          </p>
          <Link to="/manage-turf">
            <button>Book Now !!!</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ScrollArrow
import {useState, useEffect }from "react";
export function ScrollArrow() {
  const [scrollPosition, setScrollPosition] = useState(0);
  // Check scroll position and change behavior based on position
  const checkScrollPosition = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  useEffect(() => {
    // Listen for scroll events
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className="scroll-arrow"
      onClick={scrollPosition === 0 ? scrollToBottom : scrollToTop}
    >
      {/* If at the top of the page, show a downward arrow; if at the bottom, show an upward arrow */}
      {scrollPosition === 0 ? '↓' : '↑'}
    </div>
  );
}

// Footer Component
export function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>&copy; 2024 BookMyField. All rights reserved.</p>
      </div>
    </footer>
  );
}