import axios from "axios";
const BASE_URL = 'http://localhost:8080/api/v1/tags/';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    }
});

//TagsAPI pe methods defined hai yaha

const tagsApi = {
    getAllTags: async () => {
        try {
            const response = await api.get('/get-all');
            console.log("Fetched tags:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw(error);            
        }
    },

    createTag: async (tagName) => {
        try {
            const response = await api.post(`/tag?tagName=${tagName}`);
            return response.data;
    
        } catch (err) {
            console.error(err);
            throw (err);
        }
    },

    updateTag: async(oldTagName, newTagName)=>{
        try {
            const response = await api.put(`/tag?existingTag=${oldTagName}&newTag=${newTagName}`);
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