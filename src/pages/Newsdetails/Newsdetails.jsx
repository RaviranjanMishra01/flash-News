import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Newsdetails.css';

function Newsdetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="news-details-error">
        <div className="container">
          <h2>Article not found</h2>
          <p>The article you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const { title, description, urlToImage, publishedAt, source, author, content, url } = article;

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="news-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <article className="news-details-content">
          <div className="news-details-header">
            <div className="news-source">{source?.name}</div>
            <h1 className="news-details-title">{title}</h1>
            
            <div className="news-details-meta">
              <span className="news-date">{formatDate(publishedAt)}</span>
              {author && <span className="news-author">By {author}</span>}
            </div>
          </div>

          {urlToImage && (
            <div className="news-details-image">
              <img src={urlToImage} alt={title} />
            </div>
          )}

          <div className="news-details-body">
            {description && (
              <p className="news-lead">{description}</p>
            )}
            
            {content && (
              <div className="news-content">
                <p>{content}</p>
              </div>
            )}

            <div className="news-read-more">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="read-more-btn"
              >
                Read Full Article at {source?.name} →
              </a>
            </div>
          </div>

          <div className="news-details-footer">
            <button onClick={() => navigate(-1)} className="back-btn-footer">
              ← Back to News
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Newsdetails;