import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import {blogApi} from "../services/blogApi";
import {useAuth} from "../context/AuthContext";

function BlogList({onEditBlog, selectedBlog, onDeleteBlog, onCreateNewBlog}) {
    const {token} = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const pageSize = 15;

    const fetchBlogs = async () => {
        try {
            const response = await blogApi.getAllBlogs(token, pageSize, pageNumber);
            setBlogs(response.data);
            setTotalBlogs(response.totalElements);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [pageNumber, totalBlogs]);

    return (
        <div className="container bg-gray-50 mx-auto p-4">
            <div className="w-full flex justify-between">
                <div className="flex flex-col h-fit">
                    <h2 className="text-2xl font-bold">Blogs</h2>
                    <h3 className="text-xl">Total Blogs: {totalBlogs}</h3>
                </div>
                <button
                    onClick={onCreateNewBlog}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Create New Blog
                </button>
            </div>
            <br/>
            <br/>
            {blogs.length === 0 ? (
                <div className="text-center text-gray-500">No blogs found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogs.map((blog, index) => (
                        <div key={blog.id} className=" border flex flex-col justify-between bg-white gap-4 rounded-lg p-4">
                           
                            <h3 className="text-lg font-semibold mb-2">
                                {(pageNumber * pageSize) + index + 1}. {blog.title}
                            </h3>
                            <div className=" ">
                            <img src={blog.blogImageUrl} className="max-h-24" alt="BlogImage" />
                            </div>
                            {/* <p className="text-gray-800 mb-2 text-sm">{blog.body.substring(0, 70)}...</p> */}
                            <div className="flex justify-between items-center h-full">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Published on: {blog.publishedDate || 'Unknown'}</span>
                                    <span className="text-sm text-gray-500">Author: {blog.author || 'Unknown'}</span>
                                  
                                </div>
                                <div className="flex space-x-2 justify-center">
                                    <button
                                        onClick={() => onEditBlog(blog)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <PencilIcon className="h-5 w-5"/>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this blog?')) {
                                                onDeleteBlog(blog.id);
                                                let x = totalBlogs-1;
                                                setTotalBlogs(x);
                                            }
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon className="h-5 w-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 0))}
                    disabled={pageNumber === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg">Page {pageNumber + 1} of {Math.ceil(totalBlogs / pageSize)}</span>
                <button
                    onClick={() => setPageNumber(prev => prev + 1)}
                    disabled={(pageNumber + 1) * pageSize >= totalBlogs}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

BlogList.propTypes = {
    onEditBlog: PropTypes.func.isRequired,
    onDeleteBlog: PropTypes.func.isRequired,
    onCreateNewBlog: PropTypes.func.isRequired,
    selectedBlog: PropTypes.object
};

BlogList.defaultProps = {
    selectedBlog: null
};

export default BlogList;
