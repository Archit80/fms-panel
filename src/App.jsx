// import React, { useState, useEffect } from 'react';
import React from "react";
import Sidebar from "./components/Sidebar";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import BlogsPage from './pages/BlogsPage';
import SchoolsPage from './pages/SchoolsPage';
import TagsPage from './pages/TagsPage';



  //layout

  function RootLayout() {
    return (
      <div className="flex h-screen w-full">
      <Sidebar />

       {/* Main content should take the rest of the available space */}
      <div className="flex-1 px-4 overflow-auto"> 
        <Outlet /> {/* This will render BlogsPage, SchoolsPage, etc. */}
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
      element: <BlogsPage />},
      {
        path: '/schools',
        element: <SchoolsPage />
      },
      {
        path: '/tags',
        element: <TagsPage />
      },
    ],
  },
  
]);

function App() {
  return (
    // <ErrorBoundary>
  <RouterProvider router = {router} />
  // </ErrorBoundary>
  );
}

export default App;