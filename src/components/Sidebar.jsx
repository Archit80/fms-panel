import { HomeIcon, BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline"

function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <a href="#" className="text-white flex items-center space-x-2 px-4">
        <HomeIcon className="h-8 w-8" />
        <span className="text-2xl font-extrabold">FindMySchool</span>
      </a>
      <nav>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <AcademicCapIcon className="h-5 w-5 inline-block mr-2" />
          Schools
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <BookOpenIcon className="h-5 w-5 inline-block mr-2" />
          Blogs
        </a>
      </nav>
    </div>
  )
}

export default Sidebar

