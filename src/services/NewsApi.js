// services/NewsApi.js
// Multiple API Keys for rotation
const API_KEYS = [
  'pub_69e2b0e588504f2f93e10dc6f7498dd6',
  'pub_2ff0d9d688d14283b67bfe266a99fa34',
];

// Retry logic with multiple API keys
const fetchWithRetry = async (url, maxRetries = API_KEYS.length) => {
  let lastError = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const apiKey = API_KEYS[i];
      const urlWithKey = url.replace('APIKEY_PLACEHOLDER', apiKey);
      
      console.log(`Trying API Key ${i + 1}...`);
      
      const response = await fetch(urlWithKey);
      
      if (response.status === 429) {
        console.log(`API Key ${i + 1} rate limit exceeded, trying next key...`);
        continue;
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch');
      }
      
      return await response.json();
    } catch (err) {
      lastError = err;
      console.error(`Attempt ${i + 1} failed:`, err.message);
      
      if (!err.message.includes('429') && !err.message.includes('rate')) {
        throw err;
      }
    }
  }
  
  throw lastError || new Error('All API keys exhausted');
};

export const fetchNews = async (category = '', page = null, pageSize = 10) => {
  try {
    const actualPageSize = Math.min(pageSize, 10);
    
    let url = `https://newsdata.io/api/1/latest?apikey=APIKEY_PLACEHOLDER&language=en&size=${actualPageSize}`;
    
    if (category && category !== 'general') {
      url += `&category=${category}`;
    }
    
    if (page) {
      url += `&page=${page}`;
    }
    
    const data = await fetchWithRetry(url);
    
    if (data.status === 'success' && data.results) {
      // Map NewsData.io response to match your old structure
      const articles = data.results
        .filter(article => article.title && article.description && article.image_url)
        .map(article => ({
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
      
      return {
        articles,
        nextPage: data.nextPage
      };
    } else {
      throw new Error(data.message || 'Failed to fetch news');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const searchNews = async (query, page = null, pageSize = 10) => {
  try {
    const actualPageSize = Math.min(pageSize, 10);
    
    let url = `https://newsdata.io/api/1/news?apikey=APIKEY_PLACEHOLDER&q=${encodeURIComponent(query)}&language=en&size=${actualPageSize}`;
    
    if (page) {
      url += `&page=${page}`;
    }
    
    const data = await fetchWithRetry(url);
    
    if (data.status === 'success' && data.results) {
      // Map NewsData.io response to match your old structure
      const articles = data.results
        .filter(article => article.title && article.description && article.image_url)
        .map(article => ({
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
      
      return {
        articles,
        nextPage: data.nextPage
      };
    } else {
      throw new Error(data.message || 'Failed to search news');
    }
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};
