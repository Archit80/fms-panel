import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/s3/';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
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

const imageApi = {

    uploadBlogImage: async (token, blogId, formData) => {
        setAuthHeader(token);
        try {
            // const formData = new FormData();
            // formData.append("file", file);
            
            const response = await api.post(`private/upload/blog`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                params: { id: blogId.toString() },  
            });
            
            // console.log("Full API Response:", response); // Debugging
            return response.data;
    
            
        } catch (error) {
            console.error('Failed to upload image', error);
            //   console.error("Upload   error:", error.response?.data || error.message);
                throw error;
        } 
        
    },
    
    uploadSchoolImage: async (token, schoolId, formData) => {
        setAuthHeader(token);
        try {
            // const formData = new FormData();
            // formData.append("file", file);
            
            const response = await api.post(`private/upload/school`, formData, {headers: {
                "Content-Type": "multipart/form-data",
            },    params: { id: schoolId },  // Use params instead of query string"
        });
        console.log("API Response:", response); // Debug response
        return response.data;
    
            
        } catch (error) {
            console.error('Failed to upload image', error);
            throw error;
        } 
    },

    uploadGalleryImage: async (token, schoolId, formData) => {
        setAuthHeader(token);

     if (!schoolId || !formData) {
        console.error("Missing schoolId or file for uploading");
        return;
    }
        try {
            // const formData = new FormData();
            // formData.append("file", file);
            
            const response = await api.post(`private/upload/school-images`, formData, {headers: {
                "Content-Type": "multipart/form-data",
            },    params: { id: schoolId },  // Use params instead of query string"
        });
        console.log("API Response:", response.data); // Debug response
        return response.data;
    
            
        } catch (error) {
            console.error('Failed to upload image', error);
            throw error;
        } 
    },

    getSchoolImage: async (token, schoolId) => {
        setAuthHeader(token);
        try {
            const response = await api.get(`public/get/school-image?id=${schoolId}`);
            console.log(response);
            return response.data;
            } catch (error) {
                console.error('Failed to get image', error);
            throw error;
        }
    },

    getGalleryImages: async (token, schoolId) => {
        setAuthHeader(token);
        
        if (!schoolId) {
            console.error("Missing schoolId for fetching gallery images");
            return;
        }
    
        try {
            const response = await api.get(`public/get/school-gallery`, {
                params: { id: schoolId }
            });
    
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to get image", error.response?.data || error.message);
            throw error;
        }
    },

    deleteGalleryImage: async (token, schoolId, imageUrl) => {
        setAuthHeader(token);
    
        if (!schoolId || !imageUrl) {
            console.error("Missing schoolId or imageUrl for deletion");
            return;
        }
    
        try {
            const response = await api.put(`private/remove/school-image`, null, { // Pass `null` as data
                params: { id: schoolId, url: imageUrl },  // Params should be in config
            });
            
            console.log("API Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to delete image", error.response?.data || error.message);
            throw error;
        }
    }
    
    
};

export default imageApi;