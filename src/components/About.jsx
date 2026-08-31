import { Link } from "react-router-dom";
import { FaGraduationCap, FaLaptopCode, FaUsers, FaAward, FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default function About() {
  const stats = [
    { label: "Active Learners", value: "15,000+", icon: <FaUsers className="text-indigo-400" size={24} /> },
    { label: "Expert Courses", value: "120+", icon: <FaLaptopCode className="text-violet-400" size={24} /> },
    { label: "Placement Rate", value: "94%", icon: <FaAward className="text-indigo-400" size={24} /> },
    { label: "Certified Mentors", value: "50+", icon: <FaGraduationCap className="text-violet-400" size={24} /> },
  ];

  const features = [
    "Industry-Standard Full Stack & UI/UX Curriculums",
    "Live Interactive Classes & Real-world Project Building",
    "1-on-1 Mentorship from Top Tech Professionals",
    "Comprehensive Career Support & Mock Interviews"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/0 to-slate-950/0 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            <FaGraduationCap size={16} /> About DigiCampus
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Empowering the Next Generation of <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Tech Leaders</span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            DigiCampus is a modern ed-tech ecosystem built to bridge the gap between traditional education and industry requirements through hands-on learning, practical projects, and expert guidance.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto px-5 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
              <div className="mt-1 text-xs sm:text-sm font-medium text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-6xl mx-auto px-5 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:p-10 backdrop-blur-xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4">
              Our Core Mission & Vision
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
              We believe that quality technical education should be accessible, practical, and directly aligned with modern job market trends. Our platform focuses on experiential learning where students don't just read code, they write, debug, and deploy real products.
            </p>
            
            <div className="space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                  <FaCheckCircle className="text-indigo-400 shrink-0" size={18} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card / CTA Box */}
          <div className="rounded-3xl bg-gradient-to-tr from-indigo-900/40 via-violet-900/20 to-slate-900 border border-indigo-500/30 p-8 sm:p-10 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Ready to accelerate your career?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Join thousands of ambitious learners who are transforming their technical skills and building stellar portfolios with DigiCampus.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-600/50"
              >
                Get Started Now <FaArrowRight size={14} />
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950/40 px-6 py-3.5 text-sm font-bold text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
              >
                Sign In
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}