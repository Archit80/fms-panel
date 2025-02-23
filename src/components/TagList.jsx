import React, { useCallback, useEffect, useState } from 'react';
import tagsApi from '../services/tagsApi'; 
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Import the icons
import TagEditor from './TagEditor'; // Import the TagEditor component
import { useAuth } from "../context/AuthContext";

const TagList = () => {
  const { token } = useAuth(); // Get token from context
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State to manage TagEditor visibility
  const [currentTag, setCurrentTag] = useState(null); // State to hold the current tag being edited

  const fetchTags = useCallback(async () => {
    try {
      if (!token) {
        console.error("No token found! Please login.");
        alert('You are not permitted to access this page');
        return;
      }
      const response = await tagsApi.getAllTags(token); 
      if (response.code === 200 && Array.isArray(response.data)) {
        setTags(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Failed to fetch tags", error);
    }
  },[token]);

  const handleCreateNewTag = () => {
    setCurrentTag(null); // Clear current tag for new tag creation
    setIsEditing(true); // Open the TagEditor

  };

  const handleEditTag = (tag) => {
    setCurrentTag(tag); // Set the current tag to edit
    setIsEditing(true); // Open the TagEditor

  };

  const handleCloseEditor = () => {
    setIsEditing(false); // Close the TagEditor
   
  };

  const handleSave = async () => {
    await fetchTags(); // Ensure state updates before closing
  };
  
  const handleDeleteTag = async (tagName) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        await tagsApi.deleteTag(token, tagName); // Call the delete method from tagsApi
        // Immediately fetch tags after deletion
        fetchTags(); // Refresh the tags list after deletion
      } catch (error) { 
        console.error("Failed to delete tag", error);
        alert("Can't delete tag because it is being used in some blog(s)");
        if (error.response) {
          alert(`Error: ${error.response.data.message || "Server returned an error."}`);
        }
      }
    }
  };

  useEffect(() => {
    fetchTags(); // Fetch tags when the component mounts
  }, [fetchTags]);

  return (
    <div className="container w-full mx-auto p-4">
      <div className='w-full flex justify-between'>
        <h2 className="text-2xl font-bold">Tags</h2>
        <button
          onClick={handleCreateNewTag}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create New Tag
        </button>
      </div>
      <br />
      {tags.length === 0 ? (
        <div className="text-center text-gray-500">No tags found</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <div key={tag.tagName} className="bg-white border rounded-md p-4 shadow-md flex justify-between items-center">
              <h3 className="text-xl font-medium mb-2">{tag.tagName}</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditTag(tag)}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <PencilIcon className="h-4 w-4 ml-1" /> {/* Icon for Edit */}
                </button>
                <button 
                  onClick={() => handleDeleteTag(tag.tagName)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <TrashIcon className="h-4 w-4 mr-1" /> {/* Icon for Delete */}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <TagEditor 
          tag={currentTag} 
          onClose={handleCloseEditor} 
          onSave={handleSave} // Pass the onSave prop
        />
      )}
    </div>
  );
};

export default TagList;