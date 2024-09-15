import axios from 'axios';
import { AuthProvider } from '../modules/auth/services/auth.service';// Adjust path as needed
import SETTINGS from '../config/common.settings';

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: `${SETTINGS.BASE_API}`, // Replace with your API base URL
  headers: {
    'Accept': 'application/json',
  },
});

// Function to handle token refresh
const handleAccessTokenExpiredError = async (error) => {
  const authService = new AuthProvider();
  if (!authService.isRefreshing) {
    authService.isRefreshing = true;
    authService.refreshTokenSubject = new Promise((resolve) => {
      authService.refreshToken()
        .then((token) => {
          authService.isRefreshing = false;
          authService.refreshTokenSubject = Promise.resolve(token.access_token);
          resolve(token.access_token);
        })
        .catch(() => {
          authService.isRefreshing = false;
          resolve(null);
        });
    });

    const token = await authService.refreshTokenSubject;
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return apiClient.request(error.config);
    }
  } else {
    const token = await authService.refreshTokenSubject;
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return apiClient.request(error.config);
    }
  }

  return Promise.reject(error);
};

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const authService = new AuthProvider();
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      return handleAccessTokenExpiredError(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
