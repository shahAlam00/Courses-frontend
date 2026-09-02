import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock, Users } from "lucide-react";
import API from "../utils/axios";

export default function CourseAvailable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/courses/all")
      .then(({ data }) => {
        const list = data.courses || data.data || data;
        const published = Array.isArray(list)
          ? list.filter((c) => c.status === "Published").slice(0, 3)
          : [];
        setCourses(published);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="courses" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div>
            <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">
              Explore Programs
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Available Courses
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Choose from our industry-designed professional courses and start your journey today.
            </p>
          </div>
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-600/25 shrink-0"
          >
            View All Courses
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-3xl border border-slate-200 bg-white overflow-hidden">
                <div className="h-48 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-12 text-center py-16 text-slate-400 text-sm">
            No courses available yet.
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail || "https://placehold.co/800x450/1e293b/64748b?text=Course"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {course.category}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-slate-200">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-indigo-400" /> {course.duration || "—"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-indigo-400" /> {course.enrolledCount || 0}+
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span>4.8</span>
                  </div>

                  <h3 className="mt-2 text-xl font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {course.shortDescription || course.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Price</span>
                      <span className="text-2xl font-black text-slate-950">
                        ₹{Number(course.price || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                    
                    <Link
                      to={`/courses/${course._id}`}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:bg-orange-600 hover:shadow-orange-500/40"
                    >
                      Enroll
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
