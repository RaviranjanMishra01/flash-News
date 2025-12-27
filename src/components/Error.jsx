import './Error.css';

function Error({ message }) {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>{message || 'Unable to load news. Please try again later.'}</p>
        <button onClick={() => window.location.reload()} className="error-btn">
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default Error;