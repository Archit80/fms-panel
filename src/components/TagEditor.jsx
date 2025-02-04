import React, { useState, useEffect } from 'react';
import tagsApi from '../services/tagsApi';
import PropTypes from 'prop-types'; // Import PropTypes

const TagEditor = ({ tag, onClose, onSave }) => {
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    if (tag) {
      setTagName(tag.tagName); // Set the tag name if editing
    } else {
      setTagName(''); // Clear for new tag
    }
  }, [tag]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (tag) {
      await tagsApi.updateTag(tag.tagName, tagName);
    } else {
      await tagsApi.createTag(tagName);
    }
    
    await onSave(); // Wait for the tags list to refresh
    onClose();
  } catch (error) {
    console.error("Failed to save tag", error);
  }
};


  console.log("onSave prop:", onSave);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">{tag ? "Edit Tag" : "Create New Tag"}</h2>
          <input 
            type="text" 
            value={tagName} 
            onChange={(e) => setTagName(e.target.value)} 
            placeholder="Tag Name" 
            required 
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

TagEditor.propTypes = {
  tag: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired, // Validate onSave as a required function
};

export default TagEditor;