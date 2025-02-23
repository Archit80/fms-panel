import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PencilIcon, CheckIcon,  } from "@heroicons/react/24/outline"; // Import icons
import schoolApi from '../services/schoolApi'; // Import API service
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

import SchoolSidebar from './SchoolSidebar';
import BasicDetailsForm from './school/BasicDetailsForm';
import OverviewInfoForm from './school/OverviewInfoForm';
import GalleryForm from './school/GalleryForm';
import EligibilityForm from './school/EligibilityForm';
import FeeForm from './school/FeeForm';
import FacilitiesForm from './school/FacilitiesForm';

const SchoolEditor = ({ school, onSave, onClose }) => {
  const [activeSection, setActiveSection] = useState('basicDetails');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedSchoolName, setEditedSchoolName] = useState(school?.schoolName || '');
  const { token } = useAuth(); // Get token from Auth Context

  const sections = [
    { id: 'basicDetails', title: 'Basic Details' },
    { id: 'overviewInfo', title: 'Overview Information' },
    { id: 'facilities', title: 'Facilities' },
    { id: 'feeStructure', title: 'Fees Structure' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'gallery', title: 'Gallery' },
  ];

  useEffect(() => {
    setEditedSchoolName(school?.schoolName || '');
  }, [school]);

  // useEffect(() => {
  //   if (!activeSection) setActiveSection('basicDetails'); // Prevent resetting
  // }, [school]);

  // Handle enabling edit mode
  const handleEditSchoolName = () => {
    setIsEditingName(true);
  };

  // Handle saving the updated school name
  const handleSaveSchoolName = async () => {
    if (!editedSchoolName.trim()) {
      toast.error("School name cannot be empty.");
      return;
    }
   
    try {
      await schoolApi.updateSchoolName(token, school.id, editedSchoolName );
      toast.success("School name updated successfully!");
      setIsEditingName(false);
      school.schoolName = editedSchoolName;
      // onSave(); // Refresh data
    } catch (error) {
      console.error("Failed to update school name:", error);
      toast.error("Error updating school name. Try again.");
    }
  };

  const handleFinalSubmit = ()=>{
    onClose();
  }
  return (
    <div className="flex">
      <div className="flex-1 p-6 bg-gray-100">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            {/* Editable School Name Section */}
            <div className="flex items-center">
              {isEditingName ? (
                <input
                  type="text"
                  value={editedSchoolName}
                  onChange={(e) => setEditedSchoolName(e.target.value)}
                  className="border border-gray-400 p-1 rounded-md focus:ring focus:ring-blue-300"
                />
              ) : (
                <h2 className="text-2xl font-semibold">{school?.schoolName || "Add New School"}</h2>
              )}
              
              {/* Edit or Save Button */}
              { school && school.id&&(
              <button onClick={isEditingName ? handleSaveSchoolName : handleEditSchoolName} className="ml-2 text-blue-500 hover:text-blue-700">
                {isEditingName ? <CheckIcon className="h-5 w-5" /> : <PencilIcon className="h-5 w-5" />}
              </button>)}

              {/* Cancel Button (only in edit mode) */}
              {isEditingName && (
                <button onClick={() => setIsEditingName(false)} className="ml-2 text-gray-500 hover:text-gray-700">
                  X
                </button>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleFinalSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Final Submit
              </button>
            </div>
          </div>

          {activeSection === 'basicDetails' && <BasicDetailsForm school={school} />}
          {activeSection === 'overviewInfo' && <OverviewInfoForm onSave={onSave} onClose={onClose} school={school} />}
          {activeSection === 'eligibility' && <EligibilityForm onSave={onSave} onClose={onClose} school={school} />}
          {activeSection === 'facilities' && <FacilitiesForm onSave={onSave} onClose={onClose} school={school} />}
          {activeSection === 'feeStructure' && <FeeForm onSave={onSave} onClose={onClose} school={school} />}
          {activeSection === 'gallery' && <GalleryForm onSave={onSave} onClose={onClose} school={school} />}
        </div>
      </div>

      <SchoolSidebar sections={sections} activeSection={activeSection} onSelect={setActiveSection} />
    </div>
  );
};

SchoolEditor.propTypes = {
  school: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SchoolEditor;
