import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/categories';

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching categories', error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, category);
    return response.data;
  } catch (error) {
    console.error('Error creating category', error);
    throw error;
  }
};

export const updateCategory = async (id, updatedCategory) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedCategory);
    return response.data;
  } catch (error) {
    console.error('Error updating category', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category', error);
    throw error;
  }
};

