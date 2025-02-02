import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/blogs'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }
});

export const blogApi = {
  getAllBlogs: async () => {
    try {
      const response = await api.get('/get-all-blogs?pageSize=10');
      console.log("Fetched blogs:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
  createBlog: async (blogData) => {
    try {
      console.log("📤 Sending blog data for creation:", JSON.stringify(blogData, null, 2));
      const response = await api.post('/blog', blogData);
      console.log("✅ Blog created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error creating blog:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
  updateBlog: async (blogId, blogData) => {
    try {
      console.log(`🔄 Attempting to UPDATE blog with ID: ${blogId}`);
      console.log("📤 Update blog data:", JSON.stringify(blogData, null, 2));
      
      // Ensure the endpoint matches the backend expectation
      const response = await api.put(`/blog?id=${blogId}`, blogData);
      
      console.log("✅ Blog updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error updating blog with ID ${blogId}:`, 
        error.response ? JSON.stringify(error.response.data) : error.message
      );
      throw error;
    }
  },
  
  deleteBlogById: async (id) => {
    try {
      const response = await api.delete(`/blog?id=${id}`);
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