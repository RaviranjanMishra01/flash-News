import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Innovation.css';

function Innovation() {
  const { news, loading, error } = useFetchNews('technology');

  if (error) return <Error message={error} />;

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">Innovation</h1>
          <p className="category-description">
            Latest breakthroughs in technology, science, and innovation shaping our future
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
                <p>No innovation news available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Innovation;