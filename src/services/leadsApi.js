import axios from "axios";
const BASE_URL = 'https://api.findmyschool.net/api/v1/lead/private/';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    }
});

const setAuthHeader = (token) => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.Authorization; // Remove auth header if no token
    }
  };

  const leadsApi = {
    getAllLeads: async (token) => {
        try {
            setAuthHeader(token);
            const response = await api.get('/get-all-leads');
            console.log("Fetched LEADS:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw(error);            
        }
    }
  }

  export default leadsApi;