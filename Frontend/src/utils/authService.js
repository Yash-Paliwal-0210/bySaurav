// authService.js

// Save token to local storage
export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  // Retrieve token from local storage
  export const getToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Remove token from local storage
  export const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  
  // Example: Check if token exists
  export const isAuthenticated = () => {
    return !!getToken();
  };
  