import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navlist.css";
import searchsvg from "../assets/search.svg"


function Navlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationLinks = [
    "Home",
    "News",
    "Sports",
    "Business",
    "Innovation",
    "Culture",
    "Arts",
    "Travel",
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileNavigation = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="primary-navbar" id="home">
        <div className="navbar-wrapper">
          {/* Logo Section */}
          <Link to="/" className="brand-logo-link" onClick={closeMobileNavigation}>
            <h2 className="brand-logo-text">
              <span className="logo-icon">📰</span>
              FlashNews
            </h2>
          </Link>

          {/* Desktop Navigation Menu */}
          <ul className="desktop-nav-menu">
            {navigationLinks.map((item, index) => (
              <li key={index} className="desktop-nav-item">
                <Link 
                  to={item === "Home" ? "/" : `/category/${item.toLowerCase()}`}
                  className="desktop-nav-link"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Search Box */}
          <div className="desktop-search-container">
            <form className="search-form-desktop" onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Search news..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-desktop"
                aria-label="Search news"
              />
              <button type="submit" className="search-button-desktop">
                <span className="search-icon">
                  <img src={searchsvg} alt="search_icon" />
                </span>
              </button>
            </form>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="hamburger-menu-button" 
            onClick={toggleMobileNavigation}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-icon ${isMobileMenuOpen ? 'is-active' : ''}`}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={closeMobileNavigation}
        ></div>
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-sidebar-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
        {/* Mobile Menu Header */}
        <div className="mobile-menu-header">
          <h3 className="mobile-menu-title">Menu</h3>
          <button 
            className="mobile-close-button" 
            onClick={closeMobileNavigation}
            aria-label="Close menu"
          >
            <span className="close-icon">✕</span>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mobile-search-container">
          <form className="search-form-mobile" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-mobile"
              aria-label="Search news"
            />
            <button type="submit" className="search-button-mobile">
              <span className="search-icon"><img src={searchsvg} alt="" /></span>
            </button>
          </form>
        </div>

        {/* Mobile Navigation Links */}
        <ul className="mobile-nav-list">
          {navigationLinks.map((item, index) => (
            <li key={index} className="mobile-nav-item">
              <Link 
                to={item === "Home" ? "/" : `/category/${item.toLowerCase()}`}
                className="mobile-nav-link"
                onClick={closeMobileNavigation}
              >
                <span className="nav-arrow">→</span>
                <span className="nav-text">{item}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navlist;