import axios from "axios";
const BASE_URL = 'http://localhost:8080/api/v1/tags/';



const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`,
    }
});

let token = null;

// Attach Authorization header with JWT token dynamically
api.interceptors.request.use(
    async (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API for login
const authApi = {
    login: async (email, password) => {
        try {
            const response = await api.post("auth/login", { email, password });
            token = response.data.token; // Store token in memory
            return response.data;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    }
};


//TagsAPI pe methods defined hai yaha
const tagsApi = {
    getAllTags: async () => {
        try {
            const response = await api.get('/public/get-all');
            console.log("Fetched tags:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw(error);            
        }
    },

    createTag: async (tagName) => {
        try {
            const response = await api.post(`/private/tag?tagName=${tagName}`);
            return response.data;
    
        } catch (err) {
            console.error(err);
            throw (err);
        }
    },

    updateTag: async(oldTagName, newTagName)=>{
        try {
            const response = await api.put(`/private/tag?existingTag=${oldTagName}&newTag=${newTagName}`);
            return response.data;
        } catch (err) {
            console.error(err);
            throw (err);
        }
    },

    deleteTag: async (tagName) => {
        try {
            const response = await api.delete(`/tag?tagName=${tagName}`);
            return response.data;
            } catch (err) {
                console.error(err);
                throw (err);
            }
    }
}

export default tagsApi;