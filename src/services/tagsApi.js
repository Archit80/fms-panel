import axios from "axios";
const BASE_URL = 'https://api.findmyschool.net/api/v1/tags/';

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
  

//TagsAPI pe methods defined hai yaha
const tagsApi = {
    getAllTags: async (token) => {
        try {
            setAuthHeader(token);
            const response = await api.get('/public/get-all');
            console.log("Fetched tags:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw(error);            
        }
    },

    createTag: async (token, tagName) => {
        try {
            setAuthHeader(token);
            console.log('using Token', token);
            const response = await api.post(`/private/tag?tagName=${tagName}`);
            return response.data;
    
        } catch (err) {
            console.error(err);
            throw (err);
        }
    },

    updateTag: async(token, oldTagName, newTagName)=>{
        try {
            setAuthHeader(token);
            const response = await api.put(`/private/tag?existingTag=${oldTagName}&newTag=${newTagName}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw (err);
        }
    },

    deleteTag: async (token,tagName) => {
        try {
            setAuthHeader(token);
            const response = await api.delete(`/private/tag?tagName=${tagName}`);
            return response.data;
            } catch (err) {
                console.error(err);
                throw (err);
            }
    }
}

export default tagsApi;