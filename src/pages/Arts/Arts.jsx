import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Arts.css';

function Arts() {
  const { news, loading, error } = useFetchNews('', 'arts');

  if (error) return <Error message={error} />;

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">Arts</h1>
          <p className="category-description">
            Discover the latest in visual arts, theater, dance, and creative expression
          </p>
        </div>

        {loading ? (
          <Shimmer count={9} />
        ) : (
          <>
            {news.length > 0 ? (
              <div className="news-grid">
                {news.map((article, index) => (
                  <NewsCard key={index} article={article} />
                ))}
              </div>
            ) : (
              <div className="no-news">
                <p>No arts news available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Arts;