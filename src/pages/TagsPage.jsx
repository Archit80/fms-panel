import React from 'react';
import TagList from '../components/TagList';

const TagsPage = () => {
  return (
    <>
    <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">FindMySchool Admin</h1>
            </div>
    </header>
    
   <TagList />
    </>
  );
};

export default TagsPage;