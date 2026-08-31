import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock, Users } from "lucide-react";

const COURSES = [
  {
    id: "ai-learning-course",
    title: "AI Learning Course",
    category: "Artificial Intelligence",
    description: "The course covers AI fundamentals, Generative AI, ChatGPT, AI content creation, and modern prompt engineering.",
    price: "₹3,000",
    rating: "4.9",
    students: "4.2k+",
    duration: "3 Months",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "website-development",
    title: "Website Development",
    category: "Full Stack Web",
    description: "You will learn HTML5, CSS3, JavaScript, Bootstrap, PHP, MySQL, and responsive web development principles.",
    price: "₹2,400",
    rating: "4.8",
    students: "6.5k+",
    duration: "4 Months",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "digital-marketing-masterclass",
    title: "Digital Marketing Course",
    category: "Marketing & Growth",
    description: "Master the process of promoting businesses, products, and services through online channels, SEO, and social ads.",
    price: "₹2,000",
    rating: "4.7",
    students: "5.1k+",
    duration: "2.5 Months",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop",
  },
  
];

export default function CourseAvailable() {
  return (
    <section id="courses" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* Section Header with Top-Right "View All Courses" Button */}
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

        {/* Course Cards Grid (3 per row) */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
            >
              {/* Thumbnail Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {course.category}
                </span>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-slate-200">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-indigo-400" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={13} className="text-indigo-400" /> {course.students}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="mt-2 text-xl font-black text-slate-950 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                  {course.description}
                </p>

                {/* Footer: Price & Enroll Button */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <span className="text-2xl font-black text-slate-950">{course.price}</span>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:bg-orange-600 hover:shadow-orange-500/40"
                  >
                    Enroll
                    <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}