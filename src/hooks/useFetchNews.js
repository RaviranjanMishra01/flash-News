import { useState, useEffect } from 'react';

const useFetchNews = (category = '', searchQuery = '', page = 1, pageSize = 12) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // Multiple API Keys for rotation
  const API_KEYS = [
    import.meta.env.VITE_NEWS_API_KEY_1 || 'YOUR_FIRST_API_KEY',
    import.meta.env.VITE_NEWS_API_KEY_2 || 'YOUR_SECOND_API_KEY',
    import.meta.env.VITE_NEWS_API_KEY_3 || 'YOUR_THIRD_API_KEY',
  ].filter(key => key !== 'YOUR_FIRST_API_KEY' && key !== 'YOUR_SECOND_API_KEY' && key !== 'YOUR_THIRD_API_KEY');

  const BASE_URL = 'https://newsapi.org/v2';

  // Get a random API key from the array
  const getRandomApiKey = () => {
    const randomIndex = Math.floor(Math.random() * API_KEYS.length);
    return API_KEYS[randomIndex];
  };

  // Try fetching with different API keys if one fails
  const fetchWithRetry = async (url, maxRetries = API_KEYS.length) => {
    let lastError = null;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const apiKey = API_KEYS[i % API_KEYS.length];
        const urlWithKey = `${url}&apiKey=${apiKey}`;
        
        const response = await fetch(urlWithKey);
        
        if (response.status === 429) {
          // Rate limit exceeded, try next key
          console.log(`API Key ${i + 1} rate limit exceeded, trying next key...`);
          continue;
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (err) {
        lastError = err;
        console.error(`Attempt ${i + 1} failed:`, err.message);
        
        // If it's not a rate limit error, don't retry
        if (err.message.includes('status: 401') || err.message.includes('status: 403')) {
          throw err;
        }
      }
    }
    
    throw lastError || new Error('All API keys exhausted');
  };

  useEffect(() => {
    const fetchNews = async () => {
      // Don't fetch if we know there's no more data
      if (!hasMore && page > 1) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let url = '';
        
        if (searchQuery) {
          // Search for specific query
          url = `${BASE_URL}/everything?q=${searchQuery}&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}`;
        } else if (category) {
          // Fetch by category
          url = `${BASE_URL}/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}`;
        } else {
          // Fetch top headlines (for home page)
          url = `${BASE_URL}/top-headlines?country=us&language=en&page=${page}&pageSize=${pageSize}`;
        }

        const data = await fetchWithRetry(url);
        
        if (data.status === 'ok') {
          // Filter out articles with removed content
          const validArticles = data.articles.filter(
            article => article.title !== "[Removed]" && 
                       article.description !== null &&
                       article.urlToImage !== null
          );

          // If page is 1, replace news, otherwise append
          if (page === 1) {
            setNews(validArticles);
          } else {
            setNews(prevNews => [...prevNews, ...validArticles]);
          }

          setTotalResults(data.totalResults);
          
          // Check if there are more articles to load
          const totalPages = Math.ceil(data.totalResults / pageSize);
          setHasMore(page < totalPages && validArticles.length > 0);
        } else {
          throw new Error(data.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery, page, pageSize]);

  return { news, loading, error, hasMore, totalResults };
};

export default useFetchNews;