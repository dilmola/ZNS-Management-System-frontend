import axios from 'axios';

let userId; // Variable to store the user ID

export const setUserId = (id) => {
  userId = id;
};

export const getUserData = async (userId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

