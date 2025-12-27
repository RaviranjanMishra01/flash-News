// utils/FormateData.js
import { format } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy • hh:mm a');
  } catch {
    return dateString;
  }
};

export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

export const getSourceName = (article) => {
  return article.source?.name || 'Unknown Source';
};