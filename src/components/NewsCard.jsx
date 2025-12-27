import { Link } from 'react-router-dom';
import './NewsCard.css';

function NewsCard({ article, variant = 'default' }) {
  const {
    title,
    description,
    urlToImage,
    publishedAt,
    source,
    author,
    url
  } = article;

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Generate a unique ID for the article based on title and published date
  const articleId = btoa(encodeURIComponent(title + publishedAt)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 30);

  return (
    <div className={`news-card ${variant}`}>
      <Link 
        to={`/news/${articleId}`} 
        state={{ article }}
        className="news-card-link"
      >
        {urlToImage && (
          <div className="news-card-image">
            <img src={urlToImage} alt={title} loading="lazy" />
            <div className="news-card-category">{source?.name}</div>
          </div>
        )}
        
        <div className="news-card-content">
          <h3 className="news-card-title">
            {variant === 'featured' ? title : truncateText(title, 80)}
          </h3>
          
          {description && (
            <p className="news-card-description">
              {truncateText(description, variant === 'featured' ? 200 : 120)}
            </p>
          )}
          
          <div className="news-card-meta">
            <span className="news-card-date">{formatDate(publishedAt)}</span>
            {author && <span className="news-card-author">By {author}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NewsCard;