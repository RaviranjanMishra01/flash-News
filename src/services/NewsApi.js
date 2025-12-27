// services/NewsApi.js
const API_KEY = 'YOUR_NEWS_API_KEY'; // Get from https://newsapi.org/
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category = 'general', page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const searchNews = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${query}&page=${page}&pageSize=10&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search news');
    }
    
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};