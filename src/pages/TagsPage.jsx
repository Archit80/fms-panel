import React from 'react';
import TagList from '../components/TagList';
import { useAuth } from '../context/AuthContext';

const TagsPage = () => {
  const {token} = useAuth();

  return (
    token ? (
    <>
    <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">FindMySchool Admin</h1>
            </div>
    </header>
    
   <TagList />
    </>
    ) : (
      <div className='flex h-screen w-full bg-white absolute z-20 left-0 justify-center items-center'>
         <h1 className='text-3xl font-bold'>You need to login to be able to access this page</h1>
      </div>
    )
   
  );
};

export default TagsPage;