import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Culture.css';

function Culture() {
  const { news, loading, error } = useFetchNews('entertainment');

  if (error) return <Error message={error} />;

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">Culture</h1>
          <p className="category-description">
            Explore arts, entertainment, music, film, and cultural stories from around the globe
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
                <p>No culture news available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Culture;