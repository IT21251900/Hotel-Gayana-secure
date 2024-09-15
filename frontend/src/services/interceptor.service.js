import apiClient from "../core/interceptors";

// Function to get data from an API endpoint
export const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    // Handle or log error as needed
    throw error;
  }
};

// Function to post data to an API endpoint
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    // Handle or log error as needed
    throw error;
  }
};

