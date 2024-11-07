import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // Your mock API URL

export const getCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const removeCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${apiUrl}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing category:', error);
  }
};

// New function to create a category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${apiUrl}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Function to add a new user
export const addUser = async (newUser) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, newUser);
    return response.data; // Assuming the response contains the newly created user
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const getContent = async () => {
  try {
    const response = await axios.get(`${apiUrl}/content`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
};

export const deactivateUser = async (userId) => {
  try {
    const response = await axios.patch(`${apiUrl}/users/${userId}`, { active: false });
    return response.data;
  } catch (error) {
    console.error('Error deactivating user:', error);
  }
};

export const approveContent = async (contentId) => {
  try {
    const response = await axios.patch(`${apiUrl}/content/${contentId}`, { approved: true });
    return response.data;
  } catch (error) {
    console.error('Error approving content:', error);
  }
};

export const flagContent = async (contentId) => {
  try {
    const response = await axios.patch(`${apiUrl}/content/${contentId}`, { flagged: true });
    return response.data;
  } catch (error) {
    console.error('Error flagging content:', error);
  }
};
