// import React, { useState, useEffect } from 'react';
import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import BlogsPage from './pages/BlogsPage';
import SchoolsPage from './pages/SchoolsPage';
import TagsPage from './pages/TagsPage';
import AdminLogin from "./pages/AdminLogin";
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import LeadsPage from "./pages/LeadsPage";

  //layout

  function RootLayout() {
    const location = useLocation();

    const handleLogin = () => {
        // Logic to handle login, e.g., set state or redirect
        console.log("User logged in");
    };

    return (
      <div className="flex h-screen w-full">
        {/* Render Sidebar only if the current path is not '/' */}
        {location.pathname !== '/' && <Sidebar />}

         {/* Main content should take the rest of the available space */}
        <div className="flex-1 px-4 overflow-auto"> 
          <Outlet context={{ onLogin: handleLogin }} /> {/* Pass onLogin to AdminLogin */}
        </div>
      </div>
    );
  }
  
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{
      index: true,
      element: <AdminLogin />},
      {
        path: '/schools',
        element: <SchoolsPage />
      },
      {
        path: '/tags',
        element: <TagsPage />
      },
      {
        path: '/leads',
        element: <LeadsPage />
      },
      {
        path: '/blogs',
        element: <BlogsPage />
      },
    ],
  },
  
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;