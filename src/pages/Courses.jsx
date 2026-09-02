import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaSearch, FaStar, FaUserGraduate, FaClock, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import API from "../utils/axios";

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const coursesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/courses/all")
      .then((res) => {
        const mapped = res.data.data
          .filter((c) => c.status === "Published")
          .map((c) => ({
          id: c._id,
          title: c.title,
          category: c.category,
          level: c.level,
          price: `₹${c.price}`,
          duration: `${c.duration} Hours`,
          image: c.thumbnail,
          description: c.shortDescription,
          rating: "-",
          reviews: "-",
          students: "-",
        }));
        setAllCourses(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(allCourses.map((c) => c.category))];

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-600 selection:text-white pt-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <FaGraduationCap size={16} /> Explore DigiCampus Catalog
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Level Up Your Skills with <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Expert Courses</span>
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Choose from industry-vetted curriculums designed to help you build production-ready projects and accelerate your tech & marketing career.
          </p>

          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
              <FaSearch size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search courses (e.g., React, SEO, Marketing, Node.js)..."
              className="w-full rounded-2xl bg-white border border-slate-200 pl-11 pr-4 py-4 text-sm text-slate-900 placeholder-slate-400 shadow-xl shadow-slate-200/50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {loading ? (
          <div className="flex items-center justify-center gap-2.5 animate-pulse">
            <div className="h-10 w-16 bg-slate-200 rounded-xl" />
            <div className="h-10 w-24 bg-slate-200 rounded-xl" />
            <div className="h-10 w-20 bg-slate-200 rounded-xl" />
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  selectedCategory === category
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between h-[420px]">
                <div>
                  <div className="h-48 bg-slate-200 w-full" />
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <div className="h-4 bg-slate-200 rounded w-16" />
                      <div className="h-4 bg-slate-200 rounded w-16" />
                    </div>
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0 flex gap-2">
                  <div className="h-10 bg-slate-200 rounded-xl flex-1" />
                  <div className="h-10 bg-slate-200 rounded-xl flex-1" />
                </div>
              </div>
            ))}
          </div>
        ) : currentCourses.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-slate-200 bg-slate-50">
            <h3 className="text-xl font-bold text-slate-800">No courses found</h3>
            <p className="text-sm text-slate-500 mt-2">Try searching with a different keyword or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCourses.map((course) => (
              <div 
                key={course.id} 
                className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xl shadow-slate-100 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
              >
                <div>
                  {/* Course Image - Clickable to open Course Details */}
                  <div 
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold border border-slate-200 shadow-sm">
                        {course.price}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <FaStar size={13} /> {course.rating} <span className="text-slate-400 font-normal">({course.reviews})</span>
                      </span>
                      <span className="text-indigo-600 font-bold">{course.level}</span>
                    </div>

                    {/* Course Title - Clickable Link to Details Page */}
                    <Link to={`/courses/${course.id}`}>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-6">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-indigo-600 shrink-0" size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUserGraduate className="text-violet-600 shrink-0" size={14} />
                        <span>{course.students}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer / View Details or Enroll Button */}
                <div className="px-6 pb-6 pt-0 flex gap-2">
                  <Link
                    to={`/courses/${course.id}`}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-100 border border-slate-200 py-3 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-200 shadow-sm"
                  >
                    View Details
                  </Link>
            
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                currentPage === 1
                  ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
              }`}
            >
              <FaChevronLeft size={12} /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all border ${
                  currentPage === number
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                currentPage === totalPages
                  ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
              }`}
            >
              Next <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}