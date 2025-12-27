import './Shimmer.css';

function Shimmer({ count = 6, variant = 'default' }) {
  return (
    <div className="shimmer-container">
      <div className={`shimmer-grid ${variant === 'featured' ? 'featured-shimmer' : ''}`}>
        {Array(count).fill(0).map((_, index) => (
          <div key={index} className={`shimmer-card ${variant}`}>
            <div className="shimmer-image shimmer-animate"></div>
            <div className="shimmer-content">
              <div className="shimmer-title shimmer-animate"></div>
              <div className="shimmer-title-short shimmer-animate"></div>
              <div className="shimmer-description shimmer-animate"></div>
              <div className="shimmer-description shimmer-animate"></div>
              <div className="shimmer-description-short shimmer-animate"></div>
              <div className="shimmer-meta">
                <div className="shimmer-meta-item shimmer-animate"></div>
                <div className="shimmer-meta-item shimmer-animate"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shimmer;