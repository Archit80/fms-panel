import BlogList from "../components/BlogList";
import BlogEditor from "../components/BlogEditor";
import { blogApi } from "../services/blogApi";
import { React, useState, useEffect } from "react";


const BlogsPage = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
  
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getAllBlogs();
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          throw new Error("Expected an array of blogs");
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
  
    useEffect(() => {
      fetchBlogs();
    }, []);
  
    const handleEditBlog = (blog) => {
      console.log('Editing blog:', blog);
      // Explicitly set the entire blog object to preserve all properties including ID
      setSelectedBlog(blog);
    };
  
    const handleCreateNewBlog = () => {
      console.group('Create New Blog Flow');
      console.log("Create New Blog button clicked!");
      console.log("Current blogs state:", blogs);
      console.log("Current selectedBlog state before:", selectedBlog);
      
      // Explicitly set selectedBlog to a new object to trigger BlogEditor
      // Deliberately omit id to force create, not update
      setSelectedBlog({
        title: '',
        body: '',
        author: '',
        tags: [],
        date: new Date().toISOString().split("T")[0]
      });
      
      console.log("After setSelectedBlog, selectedBlog is now:", selectedBlog);
      console.groupEnd();
    };
  
    const handleSaveBlog = async (blogData) => {
      try {
        console.group('Save Blog Process');
        console.log('Current selectedBlog BEFORE save:', selectedBlog);
        console.log('Blog data to save:', blogData);
  
        // Ensure a valid date is always provided
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
  
        const updatedBlog = {
          title: blogData.title.trim(),
          body: blogData.body.trim(),
          author: blogData.author || "",
          tags: blogData.tags.length > 0 ? blogData.tags : ["defaultTag"],
          publishedDate: blogData.publishedDate || formattedDate,
        };
  
        console.log('Prepared blog data:', updatedBlog);
        
        // Check if this is a new blog or an existing blog update
        if (selectedBlog && selectedBlog.id) {
          // Existing blog - use updateBlog
          console.log(`Updating existing blog with ID: ${selectedBlog.id}`);
          await blogApi.updateBlog(selectedBlog.id, updatedBlog);
        } else {
          // New blog - use createBlog
          console.log('Creating new blog');
          await blogApi.createBlog(updatedBlog);
        }
  
        // Refresh blogs after save
        await fetchBlogs();
        
        // Reset selected blog
        setSelectedBlog(null);
        
        console.groupEnd();
      } catch (error) {
        console.error("Failed to save blog", error);
        
        // Provide more detailed error message
        let errorMessage = "Failed to save blog. ";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage += error.response.data.errorMessage || 
                          error.response.data.message || 
                          "Server returned an error.";
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage += "No response received from the server. Please check your network connection.";
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage += error.message || "An unexpected error occurred.";
        }
        
        // Show error message to user
        alert(errorMessage);
        
        // Ensure selected blog is reset even if there's an error
        setSelectedBlog(null);
      }
    };
  
    const handleDeleteBlog = async (blogId) => {
      try {
        await blogApi.deleteBlogById(blogId);
        await fetchBlogs();
      } catch (error) {
        console.error("Failed to delete blog", error);
      }
    };
  
    return (
      <div className="flex font-jakarta h-screen bg-gray-100">
       
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">FindMySchool Admin</h1>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
            <div className="container mx-auto px-4 ">
            {selectedBlog ? (
                <BlogEditor 
                  blog={selectedBlog} 
                  onSave={handleSaveBlog} 
                  onCancel={() => setSelectedBlog(null)} 
                />
              ) : (
                <BlogList
                    blogs={blogs} 
                    onEditBlog={handleEditBlog} 
                    onDeleteBlog={handleDeleteBlog} 
                    onCreateNewBlog={handleCreateNewBlog} 
                    selectedBlog={selectedBlog}
                />
  
  
              )}
  
            </div>
          </main>
        </div>
      </div>
    );
}

export default BlogsPage