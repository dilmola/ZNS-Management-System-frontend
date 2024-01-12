import axios from "axios";

const ApiService = {
  baseURL: "http://127.0.0.1:8000/api",

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(
        `${ApiService.baseURL}/${endpoint}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },

  update: async (endpoint, data) => {
    try {
      const response = await axios.put(
        `${ApiService.baseURL}/${endpoint}`,
        data
      );
      console.log("API Response Data:", response.data);

      return response.data;
    } catch (error) {
      throw new Error(`Error updating data via API: ${error.message}`);
    }
  },

  get: async (endpoint, params) => {
    try {
      const response = await axios.get(`${ApiService.baseURL}/${endpoint}`, {
        params,
      });
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from API: ${error.message}`);
    }
  },

  getUserInfo: async (userId) => {
    try {
      const response = await axios.get(`${ApiService.baseURL}/user/${userId}`);
      return response.data || {};
    } catch (error) {
      throw error;
    }
  },
};

export const getUserInfo = ApiService.getUserInfo;
export default ApiService;
