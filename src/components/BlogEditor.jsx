import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogEditor({ blog, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState(blog ? blog.tags : []);
  const [publishedDate, setPublishedDate] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    console.group('BlogEditor Initialization');
    console.log('Blog prop received:', blog);
    
    // Always reset state for new blog
    if (!blog) {
      console.log('Initializing NEW blog');
      setTitle("");
      setBody("");
      setAuthor("");
      setTags([]);
      setPublishedDate(new Date().toISOString().split("T")[0]);
    } else {
      console.log('Initializing EXISTING blog');
      setTitle(blog.title || "");
      setBody(blog.body || "");
      setAuthor(blog.author || "");
      setTags(blog.tags || []);
      setPublishedDate(blog.publishedDate || new Date().toISOString().split("T")[0]);
    }
    
    console.groupEnd();
  }, [blog]);
  
  const handleSave = () => {
    // Validate inputs
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const updatedBlog = {
      title: title.trim(),
      body: body.trim(),
      author,
      tags: tags.length > 0 ? tags : ["defaultTag"],
      publishedDate,
    };

    console.log("Saving blog:", updatedBlog); // Debugging log
    onSave(updatedBlog); // Call the onSave function passed from App
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {blog ? "Edit Blog" : "Create New Blog"}
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
          <ReactQuill 
            ref={quillRef}
            value={body} 
            onChange={setBody} 
            className="h-64"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags.map(tag => tag.tagName).join(', ')} // Display tag names
            onChange={(e) => setTags(e.target.value.split(',').map(tag => ({ tagName: tag.trim() })))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div>
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Published Date</label>
          <input
            type="date"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Blog
          </button>
        </div>
      </div>
    </div>
  );
}

BlogEditor.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
      tagName: PropTypes.string,
    })),
    publishedDate: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default BlogEditor;