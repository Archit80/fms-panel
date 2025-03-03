import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import authApi from "../services/authApi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, setToken } = useAuth(); // Get both functions from AuthContext
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
   
  const [errMsg, setErrMsg] = useState('');

  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    

  const handleSubmit = async  (e) => {
    e.preventDefault();
 
    try {
      const token = await authApi.login(formData); // Await the login response
      login(token); // Set the token in context
      setToken(token);
      // if (onLogin) {
      //   onLogin(); // Call onLogin only if token is present
      // }
      setErrMsg('');
      console.log("✅ Logged in successfully!");
      
      navigate('/blogs'); // Navigate to the blogs page
    } catch (error) {
      // alert('Email or password wrong');
      setErrMsg('You have entered a wrong email or password');
      console.error("Failed to Login", error);
    } finally {
    console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      

      {/* SVG Pattern overlay */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234a90e2' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-xl relative z-10 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center text-blue-600">FindMySchool Admin</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          {/* <p className="text-red-600  text-m sfont-medium"> {errMsg} </p> */}
          <p className="text-red-600  text-md font-medium"> {errMsg} </p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;