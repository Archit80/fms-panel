import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import tagsApi from '../services/tagsApi';
import imageApi from '../services/imageApi';
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogEditor({ blog, onSave, onCancel }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [tags, setTags] = useState([]);  
    const [selectedTags, setSelectedTags] = useState([]);
    const [image, setImage] = useState(null);  
    const [blogImageUrl, setBlogImageUrl] = useState(""); 
    const quillRef = useRef(null);

    const [isUploading, setIsUploading] = useState(false); // Track upload state

    const { token } = useAuth();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await tagsApi.getAllTags();
                const tagsFromApi = response.data;

                const transformedTags = tagsFromApi.map(tag => ({
                    value: tag.tagName,
                    label: tag.tagName
                }));

                setTags(transformedTags);
            } catch (error) {
                console.error("Failed to fetch tags", error);
            }
        };

        fetchTags();

        if (blog) {
            setTitle(blog.title || "");
            setBody(blog.body || "");
            setAuthor(blog.author || "");
            setSelectedTags(blog.tags.map(tag => ({ value: tag.tagName, label: tag.tagName })) || []);
            setPublishedDate(blog.publishedDate || new Date().toISOString().split("T")[0]);
            setBlogImageUrl(blog.blogImageUrl || "");
        } else {
            setTitle("");
            setBody("");
            setAuthor("");
            setSelectedTags([]);
            setPublishedDate(new Date().toISOString().split("T")[0]);
            setBlogImageUrl("");
        }
    }, [blog]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert("Please select an image.");
            return;
        }

        const maxSize = 200 * 1024; // 200KB limit
        if (file.size > maxSize) {
            toast.error("File size exceeds 200 KB. Please choose a smaller file.");
            alert("File size exceeds 200 KB. Please choose a smaller file.");
            return;
        }

        setImage(file);
        setBlogImageUrl(URL.createObjectURL(file)); // Show preview before upload
    };

 
    const handleUpload = async () => {
        if (!image) {
            toast.error("Please select an image first.");
            return;
        }

        setIsUploading(true); // Show loading state

        try {
            const formData = new FormData();
            formData.append("file", image);

            const response = await imageApi.uploadBlogImage(token, blog?.id || 1, formData);
            console.log("Full API Response:", response); // Debugging

            
                // setBlogImageUrl(response.data.fileUrl);
                
                console.log("Full API Response:", response);
                console.log(`${response.message} successfully!`);
                toast.success(`${response.message} successfully!`);
                
                // toast.error("Invalid response from server.");
                
            } catch (error) {
                console.error("Upload failed:", error);
                toast.error("Could not upload image.");
              
            }finally {
                setIsUploading(false); // Hide loading state
                
                console.log('image url: ', blog.blogImageUrl);
                
            }
    };

    // ✅ Handle saving the blog
    const handleSave = async () => {
        const blogData = {
            title,
            body,
            author,
            publishedDate,
            tags: selectedTags.map(tag => ({ tagName: tag.value })),
            blogImageUrl
        };

        try {
            await onSave(blogData);
            toast.success("Blog saved successfully!");
        } catch (error) {
            console.error("Error saving blog:", error);
            toast.error("Failed to save the blog.");
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {blog ? "Edit Blog" : "Create New Blog"}
            </h2>
            <div className="flex flex-col gap-2 px-4 w-full">
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
                    <ReactQuill ref={quillRef} value={body} onChange={setBody} className="h-1/3" />
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
                    <Select
                        id="tags"
                        isMulti
                        options={tags}
                        value={selectedTags}
                        onChange={(selected) => setSelectedTags(selected)}
                        className="mt-1 block w-full"
                    />
                </div>

                <div>
                    <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
                        Published Date
                    </label>
                    <input
                        type="date"
                        id="publishedDate"
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
                        Upload Blog Image (Max Size 200KB)
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                    />
                   <button
                        type="button"
                        onClick={handleUpload}
                        className="mt-2 bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <span className="animate-spin mr-2 border-t-2 border-white rounded-full w-4 h-4"></span>
                        ) : null}
                        {isUploading ? "Uploading..." : "Upload Image"}
                    </button>   

                    {blogImageUrl && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">Uploaded Image:</p>
                            <img src={blogImageUrl} alt="Uploaded" className="mt-1 rounded-md w-40" />
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Save Blog</button>
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
        tags: PropTypes.arrayOf(PropTypes.shape({ tagName: PropTypes.string })),
        publishedDate: PropTypes.string,
        blogImageUrl: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default BlogEditor;
