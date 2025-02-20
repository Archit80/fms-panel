import { useState } from "react";
import { HomeIcon, BookOpenIcon, AcademicCapIcon, TagIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 h-screen text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-4`}
      >
        <Link to="/" className="text-white flex items-center space-x-2 px-4">
          <HomeIcon className="h-8 w-8" />
          <span className="text-2xl font-extrabold">FindMySchool</span>
        </Link>
        
        <nav>
          <Link to="/schools" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <AcademicCapIcon className="h-5 w-5 inline-block mr-2" />
            Schools
          </Link>
          <Link to="/blogs" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
            Blogs
          </Link>
          <Link to="/tags" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <TagIcon className="h-5 w-5 inline-block mr-2" />
            Tags
          </Link>
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}

export default Sidebar;
