import { useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function BlogList({ onEditBlog, onDeleteBlog }) {
  const blogs = useSelector((state) => state.blogs);

  const handleAddNewBlog = () => {
    const newBlog = {
      id: Date.now(), // Use timestamp as a unique ID
      title: "",      // Empty title to encourage user input
      body: "",
      image: "",
      tags: [],
      date: new Date().toISOString().split("T")[0],
    };
    onEditBlog(newBlog); // Open the editor for the new blog
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Blogs</h2>
        <button
          onClick={handleAddNewBlog}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Blog
        </button>
      </div>
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No blogs found. Click "Add New Blog" to get started.
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{blog.title || 'Untitled'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{blog.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.tags && blog.tags.length > 0 
                      ? blog.tags.join(', ') 
                      : 'No tags'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button 
                      onClick={() => onEditBlog(blog)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Blog"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this blog?')) {
                          onDeleteBlog(blog.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Blog"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BlogList;