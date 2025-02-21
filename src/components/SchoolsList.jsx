import React, { useCallback, useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import schoolApi from '../services/schoolApi';
import SchoolEditor from './SchoolEditor';
import { useAuth } from "../context/AuthContext";

const SchoolsList = ({ onEditSchool }) => {
    const { token } = useAuth();

    const [schools, setSchools] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSchool, setCurrentSchool] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [pageNumber, setPageNumber] = useState(0)
    const [totalSchools , setTotalSchools] = useState(0)
    const pageSize = 10;

    const fetchSchools = useCallback(async () => {
        try {
            if (!token) {
                console.error("No token found! Please login.");
                alert('You are not permitted to access this page');
                return;
            }
            const response = await schoolApi.getAllSchools(token, pageSize, pageNumber);
            if (response.code === 200 && Array.isArray(response.data)) {
                setSchools(response.data);
                setTotalSchools(response.totalElements);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            console.error("Failed to fetch schools", error);
        }
    }, [token, pageNumber]);

    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

    const handleSchoolUpdated = () => {
        setRefresh(prev => !prev);
    };

    const handleDeleteSchool = async (schoolId) => {
        if (window.confirm('Are you sure you want to delete this school?')) {
            setSchools(prevSchools => prevSchools.filter(school => school.id !== schoolId));
            try {
                await schoolApi.deleteSchoolById(token, schoolId);
                handleSchoolUpdated();
            } catch (error) {
                console.error("Failed to delete school", error);
                fetchSchools();
            }
        }
    };

    return (
        <div className="container w-full mx-auto p-4">
            <div className='w-full flex justify-between'>
                <h2 className="text-2xl font-bold">Schools</h2>
                <button
                    onClick={() => onEditSchool({})}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Add New School
                </button>
            </div>
            <h1 className='text-xl'>Total Schools: {totalSchools}</h1>
            <br />
            {schools.length === 0 ? (
                <div className="text-center text-gray-500">No schools found</div>
            ) : (
                <div className="flex flex-col gap-2">
                    {schools.map((school, index) => (
                        <div key={school.id}
                             className="bg-white border flex gap-8 w-full h-fit rounded-md p-4 shadow-sm">
                            <h3 className="text-lg font-semibold">{(pageNumber * pageSize) + index + 1}. {school.schoolName}</h3>
                            <div className="flex justify-between gap-4 items-center">
                                <button
                                    onClick={() => onEditSchool(school)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteSchool(school.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-between mt-4 items-center">
                <button
                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 0))}
                    disabled={pageNumber === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">Page {pageNumber + 1} of {Math.ceil(totalSchools / pageSize)}</span>
                <button
                    onClick={() => setPageNumber(prev => prev + 1)}
                    disabled={(pageNumber + 1) * pageSize >= totalSchools}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SchoolsList;
