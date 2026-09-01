import React from "react";
import { 
  FaUserGraduate, 
  FaBookOpen, 
  FaCertificate, 
  FaCheckCircle, 
  FaStar, 
  FaArrowRight, 
  FaQuoteLeft, 
  FaFire, 
  FaTrophy, 
  FaRocket,
  FaCheck
} from "react-icons/fa";

const stories = [
  {
    name: "Aman Verma",
    role: "Frontend Developer",
    before: "HTML, CSS aur basic JavaScript",
    after: "React + API Integration",
    course: "Full Stack Web Development",
    result: "3 portfolio projects",
    duration: "4 months",
    package: "Placed @ Product Startup",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote:
      "Pehle mujhe samajh nahi aata tha ki real project kaise start karna hai. Course ke projects complete karne ke baad mujhe apna portfolio confidently build karna aaya.",
  },
  {
    name: "Neha Sharma",
    role: "Digital Marketing Executive",
    before: "Social media basics",
    after: "SEO + Meta Ads + Analytics",
    course: "Digital Marketing Mastery",
    result: "First client project",
    duration: "3 months",
    package: "Freelancing & Agency Growth",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    quote:
      "Mere liye sabse useful part practical assignments the. Sirf theory nahi thi, mujhe campaigns aur analytics ko practically samajhne ka chance mila.",
  },
  {
    name: "Rahul Singh",
    role: "Backend Developer",
    before: "Basic Node.js",
    after: "Node.js + MongoDB + REST APIs",
    course: "Backend Development with Node.js",
    result: "Job-ready API projects",
    duration: "5 months",
    package: "Software Engineer Trainee",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote:
      "Mujhe backend interesting lagta tha but production-level concepts clear nahi the. Projects ke through authentication, APIs aur database handling properly samajh aayi.",
  },
];

const stats = [
  {
    number: "50,000+",
    label: "Active Learners",
    icon: <FaUserGraduate className="text-emerald-400 text-xl" />,
  },
  {
    number: "92%",
    label: "Career Transition Rate",
    icon: <FaTrophy className="text-amber-400 text-xl" />,
  },
  {
    number: "4.9/5",
    label: "Average Rating",
    icon: <FaStar className="text-yellow-400 text-xl" />,
  },
  {
    number: "150+",
    label: "Hiring Partners",
    icon: <FaRocket className="text-cyan-400 text-xl" />,
  },
];

function SuccessStory() {
  return (
    <section className="min-h-screen bg-slate-950 px-4 pt-32 pb-24 text-white sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-600/10 via-cyan-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Badge & Title */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-400 shadow-lg shadow-emerald-950/50 mb-6 backdrop-blur-md">
            <FaFire className="text-emerald-400 animate-pulse" />
            <span>Wall of Fame & Success Stories</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-tight">
            Real learning. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary outcomes.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-400 font-medium">
            Dekhiye kaise hamare learners ne zero se shuru karke industry ke top companies mein apna mukam banaya aur apne career ko naye pankh diye.
          </p>
        </div>

        {/* Enhanced Stats Counter Grid */}
        <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-slate-900 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.number}
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-medium text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Stories Section Header */}
        <div className="mt-28">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Verified Journeys
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
                From aspirations to achievements
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400 font-medium">
              Alag backgrounds, alag sapne, lekin ek hi rasta — rigorous practical learning aur expert mentorship.
            </p>
          </div>

          {/* Stories Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {stories.map((story, idx) => (
              <article
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/40 hover:bg-slate-900 shadow-2xl flex flex-col justify-between"
              >
                {/* Top Highlight Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500" />

                <div className="p-7">
                  {/* Profile Info & Package Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="h-14 w-14 rounded-2xl object-cover ring-2 ring-emerald-400/30 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white">
                          ✓
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">
                          {story.name}
                        </h3>
                        <p className="text-xs font-medium text-emerald-400 mt-0.5">{story.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Tag */}
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    <FaTrophy size={11} className="text-emerald-400" />
                    <span>{story.package}</span>
                  </div>

                  {/* Quote / Testimonial */}
                  <div className="mt-5 relative">
                    <FaQuoteLeft className="absolute -top-2 -left-2 text-white/5 text-4xl pointer-events-none" />
                    <p className="text-sm leading-relaxed text-slate-300 relative z-10 italic">
                      "{story.quote}"
                    </p>
                  </div>

                  {/* Journey Breakdown Box */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 space-y-4 shadow-inner">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
                      <span>Transformation Path</span>
                      <span className="text-emerald-400">{story.duration} Course</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-500" />
                        <div>
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide">Pehle kya jante the</p>
                          <p className="text-xs font-semibold text-slate-300 mt-0.5">
                            {story.before}
                          </p>
                        </div>
                      </div>

                      <div className="ml-1 h-4 border-l border-dashed border-emerald-500/30" />

                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        <div>
                          <p className="text-[11px] text-emerald-400 uppercase tracking-wide">Ab kya build karte hain</p>
                          <p className="text-xs font-bold text-emerald-300 mt-0.5">
                            {story.after}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Result & Timeline Grid */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Key Project</p>
                      <p className="mt-1 text-xs font-bold text-white truncate">
                        {story.result}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
                      <p className="mt-1 text-xs font-bold text-white">
                        {story.duration}
                      </p>
                    </div>
                  </div>

                  {/* Course Enrolled Footer */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-2">
                      <FaBookOpen className="text-emerald-400" />
                      <span className="truncate max-w-[200px]">{story.course}</span>
                    </div>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">Verified <FaCheckCircle size={10} /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Featured Interactive Success Banner */}
        <div className="relative mt-28 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 shadow-2xl backdrop-blur-2xl">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold text-emerald-400">
                <FaRocket className="text-emerald-400" /> Industry Standard Curriculum
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl tracking-tight">
                Practical skills that make you <span className="text-emerald-400">hiring-ready</span>.
              </h2>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">
                Hamara focus sirf video lectures dikhane par nahi hai. Hum real-world assignments, code reviews, aur production-level projects par zor dete hain taaki aapka portfolio pehle din se strong dikhe.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "100% Hands-on Projects",
                  "1-on-1 Mentorship Support",
                  "Real-world Case Studies",
                  "Mock Interviews & Resume Building",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/[0.03] border border-white/10 p-3.5 rounded-2xl">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                      <FaCheck size={12} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Progress Tracker Simulation Card */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sample Roadmap Tracker
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Full Stack Career Track
                  </h3>
                </div>

                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-400 shadow-lg">
                  85% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Overall Course Progress</span>
                  <span className="text-emerald-400">85%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  ["Advanced HTML, CSS & Tailwind", "Completed", true],
                  ["JavaScript ES6+ & DOM Manipulation", "Completed", true],
                  ["React JS & State Management", "Completed", true],
                  ["Node.js, Express & REST APIs", "In Progress", false],
                  ["Capstone Production Project", "Upcoming", false],
                ].map(([title, status, isDone], index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                          isDone
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {isDone ? <FaCheck size={12} /> : index + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">{title}</span>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isDone
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : status === "In Progress"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse"
                          : "text-slate-500 bg-slate-900"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Section */}
        <div className="mt-28 text-center max-w-3xl mx-auto rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 via-slate-900/60 to-slate-950 p-10 sm:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            Start Your Journey Today
          </span>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl tracking-tight">
            Aapki success story yahan se shuru hoti hai.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">
            Sahi course chuniye, consistency ke sath seekhiye, aur apne technical skills ko real-world projects mein badliye.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-600/20 hover:from-emerald-400 hover:to-teal-500 transition-all duration-200 transform hover:-translate-y-0.5">
              <span>Explore All Courses</span>
              <FaArrowRight size={14} />
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-bold text-white hover:bg-white/[0.08] transition-all duration-200">
              Talk to Advisor
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default SuccessStory;