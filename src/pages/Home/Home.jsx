import { useState, useRef, useCallback } from 'react';
import useFetchNews from '../../hooks/useFetchNews';
import NewsCard from '../../components/NewsCard';
import Shimmer from '../../components/Shimmer';
import Error from '../../components/Error';
import './Home.css';

function Home() {
  const [page, setPage] = useState(1);
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(true);
  const MAX_AUTO_LOAD_PAGES = 8; // Sirf 8 pages tak auto-load
  
  const { news, loading, error, hasMore } = useFetchNews('', '', page, 10);
  const observer = useRef();

  // Infinite scroll - last element reference (only till page 8)
  const lastNewsElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    // Disable auto-load after MAX_AUTO_LOAD_PAGES
    if (page >= MAX_AUTO_LOAD_PAGES) {
      setAutoLoadEnabled(false);
      return;
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && autoLoadEnabled) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, autoLoadEnabled, page]);

  const loadMoreManually = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (error) return <Error message={error} />;

  const featuredNews = page === 1 ? news.slice(0, 1) : [];
  const topNews = page === 1 ? news.slice(1, 7) : [];
  const moreNews = page === 1 ? news.slice(7) : news;

  return (
    <div className="home-page">
      <div className="container">
        {/* Featured Section - Only on first page */}
        {page === 1 && featuredNews.length > 0 && (
          <section className="featured-section">
            <h1 className="section-title">Top Story</h1>
            {loading && page === 1 ? (
              <Shimmer count={1} variant="featured" />
            ) : (
              <div className="featured-grid">
                {featuredNews.map((article, index) => (
                  <NewsCard key={`featured-${index}`} article={article} variant="featured" />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Latest News Section - Only on first page */}
        {page === 1 && topNews.length > 0 && (
          <section className="latest-section">
            <h2 className="section-title">Latest News</h2>
            {loading && page === 1 ? (
              <Shimmer count={6} />
            ) : (
              <div className="news-grid">
                {topNews.map((article, index) => (
                  <NewsCard key={`top-${index}`} article={article} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* More News Section - All pages */}
        {moreNews.length > 0 && (
          <section className="more-news-section">
            <h2 className="section-title">
              {page === 1 ? 'More Stories' : `Page ${page}`}
            </h2>
            <div className="news-grid">
              {moreNews.map((article, index) => {
                // Add ref to last element for infinite scroll (only if auto-load enabled)
                if (moreNews.length === index + 1 && autoLoadEnabled) {
                  return (
                    <div ref={lastNewsElementRef} key={`more-${page}-${index}`}>
                      <NewsCard article={article} />
                    </div>
                  );
                } else {
                  return (
                    <NewsCard key={`more-${page}-${index}`} article={article} />
                  );
                }
              })}
            </div>
          </section>
        )}

        {/* Loading indicator when loading more */}
        {loading && page > 1 && (
          <div className="loading-more">
            <Shimmer count={6} />
          </div>
        )}

        {/* Load More Button - Shows after page 8 or when auto-load is disabled */}
        {!loading && hasMore && (
          <div className="load-more-section">
            {autoLoadEnabled && page < MAX_AUTO_LOAD_PAGES ? (
              <div className="auto-load-info">
                <p className="load-more-text">
                  ⬇️ Scroll down for automatic loading (Page {page}/{MAX_AUTO_LOAD_PAGES})
                </p>
              </div>
            ) : (
              <>
                <button onClick={loadMoreManually} className="load-more-btn">
                  📰 Load 10 More Articles
                </button>
                <p className="load-more-text">
                  Loaded {news.length} articles • Click to load more
                </p>
              </>
            )}
          </div>
        )}

        {/* No more articles message */}
        {!loading && !hasMore && news.length > 0 && (
          <div className="no-more-articles">
            <p>🎉 You've reached the end! No more articles to load.</p>
            <p className="articles-count">Total articles loaded: {news.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
