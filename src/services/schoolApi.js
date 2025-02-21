import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/schools';

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


const schoolApi = {
    getAllSchools: async (token, pageSize = 10, pageNumber = 0) => {
        try {
            setAuthHeader(token);
            const response = await api.get(`/public/get-all-schools?pageSize=${pageSize}&pageNumber=${pageNumber}`);
            console.log("Fetched Schools:", response.data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching schools:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    createSchool: async (token, schoolData) => {
        try {
            setAuthHeader(token);
            //   console.log("📤 Sending blog data for creation:", JSON.stringify(blogData, null, 2));
            const response = await api.post('/private/submit-basic-details', schoolData);
            console.log("School created successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating School:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    updateSchoolName: async (token, schoolId, newName) => {
        try {
            setAuthHeader(token);
            //   console.log("📤 Sending blog data for creation:", JSON.stringify(blogData, null, 2));
            const response = await api.put(`/private/change-school-name/${schoolId}?newName=${newName}`);
            console.log("School name updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating SchoolName:", error.response ? error.response.data : error.message);
            throw error;
        }
    },
    updateSchool: async (token, schoolId, schoolData) => {
        try {
            setAuthHeader(token);
            //   console.log("📤 Sending blog data for creation:", JSON.stringify(blogData, null, 2));
            const response = await api.put(`/private/update-basic-details/${schoolId}`, schoolData);
            console.log("School updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating School:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    updateOverview: async (token, schoolId, overviewData) => {
        try {
            setAuthHeader(token);
            const response = await api.put(`/private/submit-overview/${schoolId}`, overviewData);

            console.log("Overview updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error updating overview for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }

    },

    updateFacilities: async (token, schoolId, facilitiesData) => {
        try {
            setAuthHeader(token);
            const response = await api.put(`/private/submit-facilities/${schoolId}`, facilitiesData);

            console.log("Facilities section updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error updating facilities for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },

    getClassDetails: async (token, schoolId, className) => {
        try {
            setAuthHeader(token);
            const response = await api.get(`/public/${schoolId}/get-class-details?className=${className}`);
            console.log("Class detail fetched successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Sclass detail for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },
    addClassDetail: async (token, schoolId, classData) => {
        try {
            setAuthHeader(token);
            const response = await api.put(`/private/${schoolId}/add-class-detail`, classData);
            console.log("Class detail added successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error adding class detail for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },

    updateClassDetail: async (token, schoolId, classData, className) => {
        try {
            setAuthHeader(token);
            const response = await api.put(`/private/${schoolId}/update-class-details?className=${className}`, classData);
            console.log("Class detail updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error updating class detail for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },

    getClassEligibility: async (token, schoolId, className) => {
        try {
            setAuthHeader(token);
            const response = await api.get(`/public/${schoolId}/get-class-eligibility?className=${className}`);
            console.log("Class eligibility fetched successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching class eligibility for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },

    updateClassEligibility: async (token, schoolId, className, classEligibilityData) => {
        try {
            setAuthHeader(token);
            const response = await api.put(`/private/${schoolId}/submit-eligibility/${className}`, classEligibilityData);
            console.log("Class eligibility updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error updating class eligibility for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },


    deleteSchoolById: async (token, id) => {
        try {
            setAuthHeader(token);
            const response = await api.delete(`/private/school/${id}`);
            console.log(`School with ID ${id} deleted successfully`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting School with ID ${id}:`,
                error.response ? error.response.data : error.message
            );
            throw error;
        }
    }
};

export default schoolApi;