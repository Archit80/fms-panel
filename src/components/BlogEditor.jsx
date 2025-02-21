import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select"; // Import react-select
import tagsApi from '../services/tagsApi'; // Import the tags API

function BlogEditor({blog, onSave, onCancel}) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [tags, setTags] = useState([]);  // Tags in { value, label } format
    const [selectedTags, setSelectedTags] = useState([]);
    const quillRef = useRef(null);

    useEffect(() => {
        console.group('BlogEditor Initialization');
        console.log('Blog prop received:', blog);

        const fetchTags = async () => {
            try {
                const response = await tagsApi.getAllTags(); // Fetch tags from API
                const tagsFromApi = response.data; // Your response data (the array of { tagName: '...' })

                // Convert to { value, label } format
                const transformedTags = tagsFromApi.map(tag => ({
                    value: tag.tagName,
                    label: tag.tagName
                }));

                setTags(transformedTags);  // Set the tags in state
            } catch (error) {
                console.error("Failed to fetch tags", error);
            }
        };

        fetchTags(); // Call fetchTags on component mount

        // Reset state for new blog
        if (!blog) {
            console.log('Initializing NEW blog');
            setTitle("");
            setBody("");
            setAuthor("");
            setSelectedTags([]);
            setPublishedDate(new Date().toISOString().split("T")[0]);
        } else {
            console.log('Initializing EXISTING blog');
            setTitle(blog.title || "");
            setBody(blog.body || "");
            setAuthor(blog.author || "");
            // Set selectedTags using the format { value, label }
            setSelectedTags(blog.tags.map(tag => ({value: tag.tagName, label: tag.tagName})) || []);
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
            // Map selected tags to match the format expected by backend: [ { tagName: "tag" } ]
            tags: selectedTags.map(tag => ({tagName: tag.value})),
            publishedDate,
        };

        console.log("Saving blog:", updatedBlog); // Debugging log
        onSave(updatedBlog); // Call the onSave function passed from App
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
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
                    <ReactQuill
                        ref={quillRef}
                        value={body}
                        onChange={setBody}
                        className="h-1/3"
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
                    <Select
                        id="tags"
                        isMulti  // For multiple selection
                        options={tags}  // Use the { value, label } tags array
                        value={selectedTags}  // The selected tags
                        onChange={(selected) => setSelectedTags(selected)}  // Handle changes
                        getOptionLabel={(e) => e.label}  // Use the label property to display the tag
                        getOptionValue={(e) => e.value}  // Use the value property to store the tag
                        className="mt-1 block w-full"
                    />
                </div>

                <div>
                    <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Published
                        Date</label>
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
