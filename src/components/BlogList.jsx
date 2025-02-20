import React from "react";
import PropTypes from 'prop-types';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function BlogList({ blogs, onEditBlog, selectedBlog, onDeleteBlog, onCreateNewBlog }) {
  return (
    <div className="container mx-auto p-4 ">
      <div className="w-full flex justify-between">
        <div className="flex flex-col h-fit">
            <h2 className="text-2xl font-bold">Blogs</h2>
            <h3 className="text-xl">Total Blogs: {blogs.length}</h3>
        </div>
      <button
                onClick={ () => {
                  onCreateNewBlog(); // Ensure it's calling the function from App.jsx
                  console.log( `selectedBlog is ${selectedBlog}`);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Create New Blog
      </button>
      </div>
      <br />
      <br />
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500">No blogs found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-800 mb-2 text-sm">{blog.body.substring(0, 70)}...</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Published on: {blog.publishedDate || 'Unknown'}</span>
                  <span className="text-sm text-gray-500">Author: {blog.author || 'Unknown'}</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEditBlog(blog)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this blog?')) {
                        onDeleteBlog(blog.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onEditBlog: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
  onCreateNewBlog: PropTypes.func.isRequired,
  selectedBlog: PropTypes.object
};

BlogList.defaultProps = {
  selectedBlog: null
};

export default BlogList;