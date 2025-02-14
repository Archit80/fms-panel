import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import schoolApi from '../services/schoolApi';
import {Save} from 'lucide-react';
import SchoolSidebar from './SchoolSidebar';
import BasicDetailsForm from './school/BasicDetailsForm';
import OverviewInfoForm from './school/OverviewInfoForm';
import GalleryForm from './school/GalleryForm';
import EligibilityForm from './school/EligibilityForm';
import FeeForm from './school/FeeForm';
import FacilitiesForm from './school/FacilitiesForm';

const SchoolEditor = ({ school, onClose, onSave }) => {
  const [activeSection, setActiveSection] = useState('basicDetails');

  const sections = [
    { id: 'basicDetails', title: 'Basic Details' },
    { id: 'overviewInfo', title: 'Overview Information' },
    { id: 'facilities', title: 'Facilities' },
    { id: 'feeStructure', title: 'Fees Structure' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'gallery', title: 'Gallery' },
  ];

  useEffect(() => {
    // Any necessary setup can be done here
  }, [school]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (school) {
  //       await schoolApi.updateSchool(school.id, { name, description, address, contactNumber });
  //     } else {
  //       await schoolApi.createSchool({ name, description, address, contactNumber });
  //     }
  //     await onSave(); // Refresh the list
  //     onClose(); // Close the editor
  //   } catch (error) {
  //     console.error("Failed to save school", error);
  //   }
  // };
  

  return (
    <div className="flex">
      <div className="flex-1 p-6 bg-gray-100">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{school ? "Edit School" : "Add New School"}</h2>
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
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Final Save
              </button>
            </div>
          </div>
  
          {activeSection === 'basicDetails' && (
            <BasicDetailsForm 
              onSave={onSave} 
              onClose={onClose}
              school={school}
            />
          )}
          {activeSection === 'overviewInfo' && (
            <OverviewInfoForm 
             onSave={onSave}
             onClose={onClose}
             school={school}
            />
          )}
          {activeSection === 'gallery' && <GalleryForm images={images} setImages={setImages} />}
          {activeSection === 'eligibility' && (
            <EligibilityForm 
            onSave={onSave}
             onClose={onClose}
             school={school}
            />
          )}
          {activeSection === 'facilities' && (
            <FacilitiesForm 
            onSave={onSave}
            onClose={onClose}
            school={school}
            />
          )}
          {activeSection === 'feeStructure' && (
            <FeeForm 
             onSave={onSave}
             onClose={onClose}
             school={school}
            />
            )}
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
