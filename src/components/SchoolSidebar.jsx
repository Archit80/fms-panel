import React from 'react';

const SchoolSidebar = ({ sections, activeSection, onSelect }) => {
  return (
    <div className="bg-gray-200 w-64 p-4">
      {/* <h2 className="text-lg font-semibold mb-4"> </h2> */}
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onSelect(section.id)}
              className={`w-full text-left p-2 rounded ${activeSection === section.id ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolSidebar;
