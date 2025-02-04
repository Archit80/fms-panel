import { HomeIcon, BookOpenIcon, AcademicCapIcon, TagIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="bg-gray-800 h-screen text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <Link to="/" className="text-white flex items-center space-x-2 px-4">
        <HomeIcon className="h-8 w-8" />
        <span className="text-2xl font-extrabold">FindMySchool</span>
      </Link>
      <nav>
        <Link to="/schools" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <AcademicCapIcon className="h-5 w-5 inline-block mr-2" />
          Schools
        </Link>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
          Blogs
        </Link>
        <Link to="/tags" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <TagIcon className="h-5 w-5 inline-block mr-2" />
          Tags
        </Link>
      </nav>
    </div>  
  )
}

export default Sidebar

