import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import schoolApi from "../../services/schoolApi";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EligibilityForm = ({ school, onSave, onClose }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [eligibility, setEligibility] = useState({
    age: "",
    marks: "",
    totalSeats: "",
    formAvailability: "",
    formPayment: "",
    fromSchoolTimings: "",
    toSchoolTimings: ""
  });
  const [writtenTest, setWrittenTest] = useState(false);
  const [studentInteraction, setStudentInteraction] = useState(false);
  const [parentInteraction, setParentInteraction] = useState(false);
  const [available, setAvailable] = useState(true);

  const { token } = useAuth();
  const classesOffered = school?.classesOffered || [];

  const fetchClassEligibility = async (className) => {
    if (!className) return;

    try {
      const response = await schoolApi.getClassEligibility(token, school.id, className);
      const data = response.data || {};

      setEligibility({
        age: data.age || "",
        marks: data.marks || "",
        totalSeats: data.totalSeats || "",
        formAvailability: data.formAvailability || "",
        formPayment: data.formPayment || "",
        fromSchoolTimings: data.fromSchoolTimings || "",
        toSchoolTimings: data.toSchoolTimings || "",
      });
      setWrittenTest(data.writtenTest ?? false);
      setStudentInteraction(data.studentInteraction ?? false);
      setParentInteraction(data.parentInteraction ?? false);
      setAvailable(data.available ?? true);
    } catch (error) {
      console.error("Failed to fetch class eligibility:", error.response?.data || error.message);
      if (error.response?.status === 404) {
        setEligibility({
          age: "",
          marks: "",
          totalSeats: "",
          formAvailability: "",
          formPayment: "",
          fromSchoolTimings: "",
          toSchoolTimings: "",
        });
        setWrittenTest(false);
        setStudentInteraction(false);
        setParentInteraction(false);
        setAvailable(true);
      }
    }
  };

  useEffect(() => {
    if (selectedClass) {
      fetchClassEligibility(selectedClass);
    }
  }, [selectedClass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedClass.trim()) {
      console.error("Error: Class name is empty");
      return;
    }
  
    // Trim and clean up class name
    const formattedClassName = selectedClass.trim(); // Ensure no leading/trailing spaces
  
    console.log("🔍 Formatted class name:", formattedClassName); // Debugging line
  
    const classData = {
      age: eligibility.age,
      marks: eligibility.marks,
      totalSeats: eligibility.totalSeats,
      writtenTest,
      studentInteraction,
      parentInteraction,
      formAvailability: eligibility.formAvailability,
      formPayment: eligibility.formPayment,
      fromSchoolTimings: eligibility.fromSchoolTimings,
      toSchoolTimings: eligibility.toSchoolTimings,
    };
  
    try {
      await schoolApi.updateClassEligibility(token, school.id, formattedClassName, classData);
      console.log("✅ Class eligibility updated successfully");
     toast.success(`Eligility for ${formattedClassName} updated Successfully`);
      // onSave();
      // onClose();
    } catch (error) {
      console.error("❌ Failed to update eligibility details", error);
      toast.error(`Eligility for ${formattedClassName} could not be updated`)
      console.log("Available classes:", school.classesOffered);
    console.log("Selected class:", selectedClass);
      
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <ToastContainer position="top-right" autoClose={5000} />

      <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>

      <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="border p-2 w-full" required>
        <option value="">Select Class</option>
        {classesOffered.map((className) => (
          <option key={className} value={className}>{className}</option>
        ))}
      </select>

      {[
        { label: "Minimum Age Requirement", name: "age" },
        { label: "Minimum Marks Required", name: "marks" },
        { label: "Total Seats Available", name: "totalSeats" },
        { label: "Form Availability Date", name: "formAvailability" },
        { label: "Form Payment Details", name: "formPayment" },
        { label: "School Timing (From)", name: "fromSchoolTimings" },
        { label: "School Timing (To)", name: "toSchoolTimings" },
      ].map(({ label, name }) => (
        <div key={name} className="mb-4">
          <h4 className="text-md font-semibold">{label}</h4>
          <input
            type="text"
            name={name}
            value={eligibility[name]}
            onChange={(e) => setEligibility((prev) => ({ ...prev, [name]: e.target.value }))}
            placeholder={label}
            className="border p-2 w-full"
            required
          />
        </div>
      ))}

      <h4 className="text-md font-semibold mt-4">Selection Process</h4>
      <div className="flex flex-col gap-2">
        {[
          { label: "Written Test", state: writtenTest, setter: setWrittenTest },
          { label: "Student Interaction", state: studentInteraction, setter: setStudentInteraction },
          { label: "Parent Interaction", state: parentInteraction, setter: setParentInteraction },
        ].map(({ label, state, setter }) => (
          <label key={label} className="flex items-center">
            <input
              type="checkbox"
              checked={state}
              onChange={(e) => setter(e.target.checked)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="flex items-center mt-4">
        <label className="mr-4">Available:</label>
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-1/2 py-2 px-4 rounded mt-4">
        Save Eligibility Details
      </button>
    </form>
  );
};

EligibilityForm.propTypes = {
  school: PropTypes.shape({
    id: PropTypes.string.isRequired,
    classesOffered: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EligibilityForm;
