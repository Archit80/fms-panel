import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageApi from '../../services/imageApi'; // Ensure you import the imageApi
import { useAuth } from "../../context/AuthContext";
import PropTypes from 'prop-types';
import { Trash2 } from "lucide-react"; // Importing the trash icon

const GalleryForm = ({ school }) => {
  
  const { token } = useAuth();
  const [isMainUploading, setIsMainUploading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(""); 

  const [currentImage, setCurrentImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);

  useEffect(() => {
    if (school?.id) {
      getMainImage();
      getGalleryImages();
      // console.log(galleryImages);
    }
  }, [school?.id]);

  const getMainImage = async () => {
    try {
      if (school) {
        const response = await imageApi.getSchoolImage(token, school.id);
        setMainImageUrl(response.data);
      }
    } catch (error) {
      console.error("Error fetching school image:", error);
    }
  };

  const getGalleryImages = async () => {
    try {
      const response = await imageApi.getGalleryImages(token, school?.id);
      console.log(response.data);
      
      setGalleryImages(response.data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const handleMainChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please select an image.");
      return;
    }

    const maxSize = 200 * 1024;
    if (file.size > maxSize) {
      toast.error("File size exceeds 200 KB. Please choose a smaller file.");
      return;
    }

    setMainImage(file);
    setMainImageUrl(URL.createObjectURL(file));
  };
  
  const handleMainUpload = async () => {
    if (!mainImage) {
      toast.error("Please select an image first.");
      return;
    }

    setIsMainUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", mainImage);
      
      const response = await imageApi.uploadSchoolImage(token, school?.id || 1, formData);
      toast.success(`${response.message} successfully!`);
      getMainImage();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Could not upload image.");
    } finally {
      setIsMainUploading(false);
    }
  };
  
  const handleGalleryChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please select an image.");
      return;
    }

    const maxSize = 200 * 1024;
    if (file.size > maxSize) {
      toast.error("File size exceeds 200 KB. Please choose a smaller file.");
      return;
    }
    setCurrentImage(file);
    setGalleryImages((prev) => [...prev, file]);
  };

  const handleGalleryUpload = async () => {
    if (!currentImage) {
      toast.error("Please select an image first.");
      return;
    }

    setIsGalleryUploading(true);

    try {
      const formData = new FormData();
      // galleryImages.forEach((image) => formData.append("files", image));
      formData.append('file',currentImage);
      const response = await imageApi.uploadGalleryImage(token, school?.id || 1, formData);
      toast.success(`${response.message} successfully!`);

      setGalleryImages((prev) => [...prev, ...response.data]); // Assuming response contains uploaded image URLs
      getGalleryImages();
      
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Could not upload images.");
    } finally {
      setIsGalleryUploading(false);
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    if (!imageUrl) {
      toast.error("Invalid image URL");
      return;
    }
  
    try {
      await imageApi.deleteGalleryImage(token, school?.id, imageUrl);
      toast.success("Image deleted successfully!");
  
      // Remove deleted image from the state
      setGalleryImages((prev) => prev.filter((img) => img !== imageUrl));
  
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Could not delete image.");
    }
  };
  
  

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Gallery</h3>

      <div className="space-y-4 flex-col flex">
        
        {/* Main Image Upload Section */}
        <div className='COVER-IMAGE flex justify-start items-start gap-4 '>
          <div className="flex flex-col">
            <label className="mb-2">Upload School Banner (Cover Image) <br /> Max size 200KB</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <button
              type="button"
              onClick={handleMainUpload}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white w-fit h-fit font-bold py-2 px-4 rounded flex items-center"
              disabled={isMainUploading}
            >
              {isMainUploading ? (
                <span className="animate-spin mr-2 border-t-2 border-white rounded-full w-4 h-4"></span>
              ) : null}
              {isMainUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {mainImageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Uploaded Image:</p>
              <img src={mainImageUrl} alt="Uploaded" className="mt-1 w-full" />
            </div>
          )}
        </div>

        {/* Gallery Image Upload Section */}
        <div className='GALLERY-IMAGES flex flex-col gap-4'>
          <div className="flex flex-col">
            <label className="mb-2">Upload Gallery Images (Max size 200KB)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleGalleryChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <button
              type="button"
              onClick={handleGalleryUpload}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white w-fit h-fit font-bold py-2 px-4 rounded flex items-center"
              disabled={isGalleryUploading}
            >
              {isGalleryUploading ? (
                <span className="animate-spin mr-2 border-t-2 border-white rounded-full w-4 h-4"></span>
              ) : null}
              {isGalleryUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {/* Gallery Images Display */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Gallery Images</h3>
            <div className="flex flex-wrap gap-2 mt-2">
            {galleryImages.length === 0 ? (
            <p className="text-gray-500">No images uploaded</p>
          ) : (
            galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group w-24 h-24"
              >
                {/* Image */}
                <img
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />

                {/* Delete Button (only visible on hover) */}
                <button
                    onClick={() => handleDeleteImage(image)}
                    className="absolute inset-0 flex items-center justify-center 
                              bg-black bg-opacity-70 text-white opacity-0 
                              group-hover:opacity-100 transition-opacity 
                              duration-300 rounded-md"
                  >
                    <Trash2 size={24} color='white' />
              </button>
              </div>
            ))
          )}


            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

GalleryForm.propTypes = {
  school: PropTypes.object,
};

export default GalleryForm;
