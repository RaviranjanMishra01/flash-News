// utils/Images.js
export const getFallbackImage = (category) => {
  const fallbackImages = {
    business: 'https://images.unsplash.com/photo-1665686306574-1c28aa4d4449',
    sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
    arts: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262',
    travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    culture: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c',
    innovation: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    default: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1'
  };
  
  return fallbackImages[category] || fallbackImages.default;
};

export const getCategoryIcon = (category) => {
  const icons = {
    business: '💼',
    sports: '⚽',
    arts: '🎨',
    travel: '✈️',
    culture: '🎭',
    innovation: '💡',
    default: '📰'
  };
  
  return icons[category] || icons.default;
};