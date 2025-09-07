// Utility functions for the Notes App

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateUsername = (username) => {
  if (!username || username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (username.length > 50) {
    return 'Username must be less than 50 characters';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

export const validateNoteTitle = (title) => {
  if (!title || !title.trim()) {
    return 'Title is required';
  }
  if (title.length > 100) {
    return 'Title must be less than 100 characters';
  }
  return null;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
