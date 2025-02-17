import React, { useState } from 'react';
import PropTypes from 'prop-types';
import schoolApi from '../../services/schoolApi';

const OverviewInfoForm = ({ onSave, onClose, school }) => {
  const [content, setContent] = useState(school ? school.content : '');
  const [ownership, setOwnership] = useState(school ? school.ownership : '');
  const [yearOfEstablishment, setYearOfEstablishment] = useState(school ? school.yearOfEstablishment : '');
  const [campusSize, setCampusSize] = useState(school ? school.campusSize : '');
  const [campusType, setCampusType] = useState(school ? school.campusType : '');
  const [languageOfInteraction, setLanguageOfInteraction] = useState(school ? school.languageOfInteraction : '');
  const [academicSession, setAcademicSession] = useState(school ? school.academicSession : '');
  const [coEdStatus, setCoEdStatus] = useState(school ? school.coEdStatus : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const overviewData = {
      content,
      ownership,
      yearOfEstablishment,
      campusSize,
      campusType,
      languageOfInteraction,
      academicSession,
      coEdStatus,
    };

    try {
      // Call the API to save the overview data
      await schoolApi.updateOverview(school.id, overviewData);
      await onSave(); // Refresh the list
      onClose(); // Close the editor
    } catch (error) {
      console.error("Failed to save overview information", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg flex justify-center flex-col bg-white w-full shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Overview Information</h3>
      <div className="space-y-4">
        <select 
          value={coEdStatus} 
          onChange={(e) => setCoEdStatus(e.target.value)} 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        >
          <option value="">Gender</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="co-ed">Co-Ed</option>
        </select>

        <input 
          type="number" 
          value={yearOfEstablishment} 
          onChange={(e) => setYearOfEstablishment(e.target.value)} 
          placeholder="Year of Establishment" 
          required 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={campusSize} 
          onChange={(e) => setCampusSize(e.target.value)} 
          placeholder="Campus Size" 
          required 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <select 
          value={campusType} 
          onChange={(e) => setCampusType(e.target.value)} 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        >
          <option value="">Campus Type</option>
          <option value="urban">Urban</option>
          <option value="rural">Rural</option>
        </select>

        <input 
          type="text" 
          value={languageOfInteraction} 
          onChange={(e) => setLanguageOfInteraction(e.target.value)} 
          placeholder="Language of Interaction" 
          required 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={academicSession} 
          onChange={(e) => setAcademicSession(e.target.value)} 
          placeholder="Academic Session" 
          required 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <select 
          value={ownership} 
          onChange={(e) => setOwnership(e.target.value)} 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        >
          <option value="">Ownership</option>
          <option value="private">Private</option>
          <option value="private_aided">Private Aided</option>
        </select>

        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Description" 
          className="border border-gray-300 rounded-md p-2 w-full h-32"
          required
        />

        <input 
          type="url" 
          // value={videoLink} 
          // onChange={(e) => setVideoLink(e.target.value)} 
          placeholder="Video Link" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        {/* <input 
          type="url" 
          // value={schoolWebsite} 
          // onChange={(e) => setSchoolWebsite(e.target.value)} 
          placeholder="School Website" 
          className="border border-gray-300 rounded-md p-2 w-full"
        /> */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-1/2 py-2 px-4 rounded">
          Save Overview Information
      </button>
      
      </div>
    </form>
    
  )
}
OverviewInfoForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  school: PropTypes.object,
};
export default OverviewInfoForm;