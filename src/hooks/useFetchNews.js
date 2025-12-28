import { useState, useEffect } from 'react';

const useFetchNews = (category = '', searchQuery = '', page = 1, pageSize = 10) => {
  // NewsData.io free tier allows max 10 articles per request
  const actualPageSize = Math.min(pageSize, 10);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(null);

  // Multiple API Keys for rotation
  const API_KEYS = [
    'pub_69e2b0e588504f2f93e10dc6f7498dd6',
    'pub_2ff0d9d688d14283b67bfe266a99fa34',
  ];

  // Try fetching with different API keys if one fails
  const fetchWithRetry = async (url, maxRetries = API_KEYS.length) => {
    let lastError = null;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const apiKey = API_KEYS[i];
        const urlWithKey = url.replace('APIKEY_PLACEHOLDER', apiKey);
        
        console.log(`Trying API Key ${i + 1}...`);
        
        const response = await fetch(urlWithKey);
        
        if (response.status === 429) {
          // Rate limit exceeded, try next key
          console.log(`API Key ${i + 1} rate limit exceeded, trying next key...`);
          continue;
        }
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (err) {
        lastError = err;
        console.error(`Attempt ${i + 1} failed:`, err.message);
        
        // If it's not a rate limit error, don't retry
        if (!err.message.includes('429') && !err.message.includes('rate')) {
          throw err;
        }
      }
    }
    
    throw lastError || new Error('All API keys exhausted');
  };
  
  useEffect(() => {
    const fetchNews = async () => {
      if (!hasMore && page > 1) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let url = '';
        
        if (searchQuery) {
          // Search uses /news endpoint with q parameter
          url = `https://newsdata.io/api/1/news?apikey=APIKEY_PLACEHOLDER&q=${encodeURIComponent(searchQuery)}&language=en`;
        } else if (category && category !== 'general') {
          // Category uses /latest endpoint
          url = `https://newsdata.io/api/1/latest?apikey=APIKEY_PLACEHOLDER&category=${category}&language=en`;
        } else {
          // Default latest news
          url = `https://newsdata.io/api/1/latest?apikey=APIKEY_PLACEHOLDER&language=en`;
        }
        
        // Add page size (max 10 for free tier)
        url += `&size=${actualPageSize}`;

        // Add pagination token if available (for page > 1)
        if (page > 1 && nextPage) {
          url += `&page=${nextPage}`;
        }

        // Use fetchWithRetry instead of direct fetch
        const data = await fetchWithRetry(url);
        
        if (data.status === 'success' && data.results) {
          // Filter out articles with missing content
          const validArticles = data.results.filter(
            article => article.title && 
                       article.description &&
                       article.image_url
          );

          // Map NewsData.io response to match your old structure
          const formattedArticles = validArticles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.link,
            urlToImage: article.image_url,
            publishedAt: article.pubDate,
            source: {
              name: article.source_id || 'Unknown'
            },
            author: article.creator ? article.creator.join(', ') : 'Unknown',
            content: article.content || article.description
          }));

          // If page is 1, replace news, otherwise append
          if (page === 1) {
            setNews(formattedArticles);
          } else {
            setNews(prevNews => [...prevNews, ...formattedArticles]);
          }

          // Set next page token for pagination
          setNextPage(data.nextPage);
          setHasMore(!!data.nextPage && formattedArticles.length > 0);
        } else {
          throw new Error(data.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching news:', err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery, page]);

  return { news, loading, error, hasMore, totalResults: news.length };
};

export default useFetchNews;
