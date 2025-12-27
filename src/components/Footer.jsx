import { Link } from "react-router-dom";
import "./Footer.css";
import gmailicon from '../assets/gmail.svg';
import github from "../assets/github.svg"
import linkdin from "../assets/linkdin.svg"
function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "Home", path: "/" },
    { name: "News", path: "/category/news" },
    { name: "Sports", path: "/category/sports" },
    { name: "Business", path: "/category/business" },
    { name: "Innovation", path: "/category/innovation" },
    { name: "Culture", path: "/category/culture" },
    { name: "Arts", path: "/category/arts" },
    { name: "Travel", path: "/category/travel" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">

          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-logo">FlashNews</h3>
            <p className="footer-description">
              Your trusted source for breaking news, in-depth analysis, and
              stories that matter. Stay informed with FlashNews.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {categories.slice(0, 4).map(category => (
                <li key={category.name}>
                  <Link to={category.path}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              {categories.slice(4, 8).map(category => (
                <li key={category.name}>
                  <Link to={category.path}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <span aria-hidden="true"><a href="mailto:raviranjnamishra767@gmail.com" target="_blank"><img src={gmailicon} alt="" /></a></span>
              </li>
              <li>
                <span aria-hidden="true"><a href="https://github.com/RaviranjanMishra01" target="_blank"><img src={github} alt="" /></a></span>
              </li>
              <li>
                <span aria-hidden="true"><a href="http://www.linkedin.com/in/ravi-ranjan-mishra-9919b2310" target="_blank"><img src={linkdin} alt="" /></a></span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} FlashNews. All rights Raviranjnakumar.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
            
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
