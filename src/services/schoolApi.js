import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/schools';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }
});

const schoolApi = {
  getAllSchools: async () => {
    try {
      const response = await api.get('/get-all-schools?pageSize=100&pageNumber=0');
      console.log("Fetched Schools:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching schools:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
  createSchool: async (schoolData) => {
    try {
    //   console.log("📤 Sending blog data for creation:", JSON.stringify(blogData, null, 2));
      const response = await api.post('/submit-basic-details', schoolData);
      console.log("School created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating School:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
  updateOverview : async (schoolId, overviewData) => {
    try {
   
      const response = await api.put(`/submit-overview/${schoolId}`, overviewData);
      
      console.log("Overview updated successfully:", response.data);
      return response.data;s
    } catch (error) {
      console.error(`Error updating overview for school with ID ${schoolId}:`, 
        error.response ? JSON.stringify(error.response.data) : error.message
      );
      throw error;
    }
    
  },

  updateFacilities : async (schoolId, facilitiesData) => {
    try {
   
      const response = await api.put(`/submit-facilities/${schoolId}`, facilitiesData);
      
      console.log("Facilities section updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating facilities for school with ID ${schoolId}:`, 
        error.response ? JSON.stringify(error.response.data) : error.message
      );
      throw error;
    }
  },

  addClassDetail : async(schoolId, classData) => {
    try {
        const response = await api.put(`/add-class-detail/${schoolId}`, classData);
        console.log("Class detail added successfully:", response.data);
        return response.data;
        } catch (error) {
            console.error(`Error adding class detail for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },

  updateClassDetail : async(schoolId, classData, className) => {
    try {
        const response = await api.put(`/${schoolId}/update-class-details?className=${className}`, classData);
        console.log("Class detail updated successfully:", response.data);
        return response.data;
        } catch (error) {
            console.error(`Error updating class detail for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },
  
  updateClassEligibsility : async(schoolId, classEligibilityData, className) => {
    try {
        const response = await api.put(`/${schoolId}/submit-eligibility/${className}`, classEligibilityData);
        console.log("Class eligibility updated successfully:", response.data);
        return response.data;
        } catch (error) {
            console.error(`Error updating class eligibility for school with ID ${schoolId}:`,
                error.response ? JSON.stringify(error.response.data) : error.message
            );
            throw error;
        }
    },

    deleteSchoolById: async (id) => {
    try {
      const response = await api.delete(`/school/${id}`);
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