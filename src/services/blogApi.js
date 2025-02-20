import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/v1/blogs';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }
});

// Function to attach the token in headers
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.Authorization; // Remove auth header if no token
  }
};

export const blogApi = {
  getAllBlogs: async (token) => {
    try {
      setAuthHeader(token);
      const response = await api.get('/public/get-all-blogs?pageSize=50');
      console.log("Fetched blogs:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
  createBlog: async (token, blogData) => {
    try {
      setAuthHeader(token);
      console.log('using Token', token);
      console.log("📤 Sending blog data for creation:", JSON.stringify(blogData, null, 2));
      const response = await api.post('/private/blog', blogData);
      console.log("✅ Blog created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error creating blog:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
  updateBlog: async (token, blogId, blogData) => {
    try {
      setAuthHeader(token);
      console.log(`🔄 Attempting to UPDATE blog with ID: ${blogId}`);
      console.log("📤 Update blog data:", JSON.stringify(blogData, null, 2));
      const response = await api.put(`/private/blog?id=${blogId}`, blogData);
      console.log("✅ Blog updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error updating blog with ID ${blogId}:`, 
        error.response ? JSON.stringify(error.response.data) : error.message
      );
      throw error;
    }
  },
  
  deleteBlogById: async (token, id) => {
    try {
      setAuthHeader(token);
      const response = await api.delete(`/private/blog?id=${id}`);
      console.log(`Blog with ID ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting blog with ID ${id}:`, 
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
};
