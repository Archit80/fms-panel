import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import BlogList from "./components/BlogList";
import BlogEditor from "./components/BlogEditor";
import { addBlog, deleteBlog, updateBlog } from "./blogSlice";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const handleSaveBlog = (blogData) => {
    if (blogData) {
      // Check if blog already exists
      const existingBlogIndex = blogs.findIndex(b => b.id === blogData.id);
      
      if (existingBlogIndex !== -1) {
        // Update existing blog
        dispatch(updateBlog(blogData));
      } else {
        // Add new blog
        dispatch(addBlog(blogData));
      }
    }
    
    // Always reset selected blog
    setSelectedBlog(null);
  };

  const handleDeleteBlog = (blogId) => {
    // You can add additional logic here if needed
    dispatch(deleteBlog(blogId));
  };

  return (
    <div className="flex font-jakarta h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">FindMySchool Admin</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            {selectedBlog ? (
              <BlogEditor 
                blog={selectedBlog} 
                onSave={handleSaveBlog} 
                onCancel={() => setSelectedBlog(null)} 
              />
            ) : (
              <BlogList 
                onEditBlog={handleEditBlog} 
                onDeleteBlog={handleDeleteBlog} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;