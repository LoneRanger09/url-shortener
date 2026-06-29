// client/src/services/linkService.js

import axios from 'axios';

// The base URL for our link-related endpoints.
const API_URL = '/api/links/';

/**
 * Helper to inspect and parse API errors. Logs detailed info to the browser developer console.
 */
const handleApiError = (error, defaultMsg) => {
  console.error("🔍 Links Request Failed:", {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    statusText: error.response?.statusText,
    responseData: error.response?.data,
  });

  if (error.response) {
    const data = error.response.data;
    if (data && typeof data === 'object') {
      return data;
    }
    if (typeof data === 'string') {
      if (data.startsWith('<!DOCTYPE html>')) {
        return { error: `Server Error (${error.response.status}): ${error.response.statusText || 'Internal Error'}` };
      }
      return { error: data };
    }
  }
  return { error: error.message || defaultMsg };
};

/**
 * @desc    Fetches all links associated with the currently authenticated user.
 * @param   {string} token The JSON Web Token for authentication.
 * @returns {Promise<object>} A promise that resolves to the API response data (the user's links).
 * @throws  Will throw an error if the API request fails (e.g., token is invalid).
 */
export const getUserLinks = async (token) => {
  // Configure both x-auth-token and Authorization headers to guarantee compatibility
  const config = {
    headers: {
      'x-auth-token': token,
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL + 'my-links', config);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'An unexpected error occurred while fetching your links.');
  }
};