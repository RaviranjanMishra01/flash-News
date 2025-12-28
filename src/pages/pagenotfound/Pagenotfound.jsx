import { useNavigate } from 'react-router-dom';
import './Pagenotfound.css';

function Pagenotfound() {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <div className="container">
        <div className="error-404">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-message">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="error-actions">
            <button onClick={() => navigate('/')} className="home-btn">
              Go to Homepage
            </button>
            <button onClick={() => navigate(-1)} className="back-btn">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagenotfound;