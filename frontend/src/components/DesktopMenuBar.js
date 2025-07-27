import React, {useState, useContext} from "react";
import "../styles/DesktopMenuBar.css";
import { FaCommentAlt, FaUser, FaPlus, FaCar, FaMapPin, FaArrowRight } from "react-icons/fa";
import '../styles/tailwind.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import CarModelModal from "./CarModelModal";

const DesktopMenuBar = ({setSearchResults}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {profile, loading, setProfile } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchItem = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/cars/search?q=${searchQuery}`)
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      } 
    } catch (error) {
      console.error("Error:", error );
      setSearchResults([]);
    }
  };

  // ✅ Minimal handler so modal doesn't break
  const handleCarModelSave = () => {
    setShowModal(false); // just close modal for now
  };

  return (
    <>
      <nav className="menu-bar">
        <div className="menu-left">
          <a href="/">
            <img src="/images/CARJACK.SVG" alt="logo"/>
          </a>
          <form onSubmit={searchItem} className="search-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search parts or tunes for sale..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type='submit' className="search-button">
              <img src="/images/search.png" alt="Search" />
            </button>
          </form>
        </div>

        <div className="menu-center">
          <button onClick={() => setShowModal(true)} className="carmodel">
            <FaCar />
            <span>{profile?.car_model || "Choose a car"}</span>
          </button>
          <a href="/location" className="location">
            <FaMapPin/>
            <span>33021</span>
          </a>
        </div>

        <div className="menu-right">
          <a href="/messages" className="menu-item">
            <FaCommentAlt />
            <span>Messages</span>
          </a>
          <a href="/post" className="menu-item">
            <FaPlus />
            <span>Post</span>
          </a>
          {!isLoggedIn ? (
            <Link to="/login" className="menu-item post-button">
              <FaArrowRight />
              <span>Sign in</span>
            </Link>
          ) : (
            <Link to="/profile" className="menu-item">
              <FaUser />
              <span>Profile</span>
            </Link>
          )}
        </div>
      </nav>

      {/* ✅ This shows the modal when triggered */}
      {showModal && (
        <CarModelModal onClose={() => setShowModal(false)} onSave={handleCarModelSave} />
      )}
    </>
  );
};

export default DesktopMenuBar;
