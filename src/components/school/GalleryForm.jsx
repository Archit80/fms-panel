import React from 'react'

const GalleryForm = ({ images, setImages }) => {
  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0]; // Store the selected file
    setImages(newImages);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Gallery</h3>
      <div className="space-y-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-2">Upload Image {index + 1}</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GalleryForm