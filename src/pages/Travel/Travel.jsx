import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Travel.css';

function Travel() {
  const { news, loading, error } = useFetchNews('', 'travel');

  if (error) return <Error message={error} />;

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">Travel</h1>
          <p className="category-description">
            Travel guides, destination stories, and tips for your next adventure
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
                <p>No travel news available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Travel;