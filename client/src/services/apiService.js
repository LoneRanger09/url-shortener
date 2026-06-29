// client/src/services/apiService.js

// 1. Import the axios library, which we will use to make HTTP requests.
import axios from 'axios';

/**
 * Helper to inspect and parse API errors. Logs detailed info to the browser developer console.
 */
const handleApiError = (error, defaultMsg) => {
  console.error("🔍 API Request Failed:", {
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
 * @desc    Sends a long URL to the backend API to be shortened.
 * @param   {string} longUrl The URL that the user wants to shorten.
 * @returns {Promise<object>} A promise that resolves to the data returned from the API.
 *          On success, this will be an object like: { success: true, data: { ...urlObject } }.
 *          On failure, the promise will be rejected with an error object.
 */
export const createShortUrl = async (longUrl) => {
  // 2. Use a try...catch block to handle potential network errors gracefully.
  try {
    const token = localStorage.getItem('token');
    const config = {};
    if (token) {
      config.headers = {
        'x-auth-token': token
      };
    }

    const response = await axios.post('/api/shorten', { longUrl }, config);

    // 4. If the request is successful, axios wraps the response in a 'data' object.
    //    We return this data so the component that called this function can use it.
    return response.data;

  } catch (error) {
    // 5. Throw parsed and logged error
    throw handleApiError(error, 'An unexpected error occurred. Please try again.');
  }
};

