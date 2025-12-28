import { useState, useRef, useCallback } from 'react';
import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Business.css';

function Business() {
  const [page, setPage] = useState(1);
  const { news, loading, error, hasMore } = useFetchNews('business', '', page, 12);
  const observer = useRef();

  // Infinite scroll - last element reference
  const lastNewsElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (error) return <Error message={error} />;

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">Business</h1>
          <p className="category-description">
            Latest business news, market trends, and economic updates from around the world
          </p>
        </div>

        {loading && page === 1 ? (
          <Shimmer count={9} />
        ) : (
          <>
            {news.length > 0 ? (
              <>
                <div className="news-grid">
                  {news.map((article, index) => {
                    if (news.length === index + 1) {
                      return (
                        <div ref={lastNewsElementRef} key={`business-${index}`}>
                          <NewsCard article={article} />
                        </div>
                      );
                    } else {
                      return (
                        <NewsCard key={`business-${index}`} article={article} />
                      );
                    }
                  })}
                </div>

                {/* Loading more shimmer */}
                {loading && page > 1 && (
                  <div className="loading-more">
                    <Shimmer count={6} />
                  </div>
                )}

                {/* Load More Button */}
                {!loading && hasMore && (
                  <div className="load-more-section">
                    <button onClick={loadMore} className="load-more-btn">
                      Load More Articles
                    </button>
                    <p className="load-more-text">
                      or scroll down for automatic loading
                    </p>
                  </div>
                )}

                {/* No more articles */}
                {!loading && !hasMore && (
                  <div className="no-more-articles">
                    <p>🎉 You've reached the end!</p>
                  </div>
                )}
              </>
            ) : (
              <div className="no-news">
                <p>No business news available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Business;