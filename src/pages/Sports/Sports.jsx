import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Sports.css';

function Sports() {
  const { news, loading, error } = useFetchNews('sports');

  if (error) return <Error message={error} />;

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">Sports</h1>
          <p className="category-description">
            Latest sports news, scores, highlights, and updates from leagues around the world
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
                <p>No sports news available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Sports;