import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const AUTH_URL = 'http://localhost:5000/auth';

export const getPortfolioData = async () => {
    try {
        const response = await axios.get(`${API_URL}/portfolio`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

// Upload image
// Upload file (image or pdf)
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file); // keeping field name 'image' to match backend 'upload.single'
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};

export const updatePortfolioData = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/portfolio`, data, {
            headers: {
                // In a real app, use Authorization: Bearer token
                // For now, simpler if we just assume backend verifies or passes it
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

export const loginAdmin = async (username, password) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
