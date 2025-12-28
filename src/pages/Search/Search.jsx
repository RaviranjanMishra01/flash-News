import { useSearchParams } from 'react-router-dom';
import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Search.css';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { news, loading, error } = useFetchNews('', query);

  if (error) return <Error message={error} />;

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          <p className="search-query">
            Showing results for: <strong>"{query}"</strong>
          </p>
          {!loading && <p className="search-count">{news.length} articles found</p>}
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
              <div className="no-results">
                <h2>No results found</h2>
                <p>Try searching with different keywords or check your spelling.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;