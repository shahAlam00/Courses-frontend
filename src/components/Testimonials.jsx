import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Frontend Developer at TCS",
    course: "Frontend React Mastery",
    content: "DigiCampus Academy ne mere career ko ek nayi disha di. React aur Tailwind CSS ke practical projects ne interview crack karne mein bohot madad ki!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Full Stack Developer at Infosys",
    course: "Full Stack MERN Bootcamp",
    content: "MERN stack bootcamp ka curriculum bilkul industry-standard hai. Mentors ne har ek doubt ko live sessions mein clear kiya. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "AI Prompt Engineer",
    course: "AI Learning Course",
    content: "AI Learning course mein jo GenAI aur prompt engineering sikhaya gaya, usne meri productivity ko 3x kar diya. Best learning experience!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-indigo-600">
            Success Stories
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Hear from our graduates who successfully transformed their careers through our practical programs.
          </p>
        </div>

        {/* Testimonials Grid (3 per row) */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200/85 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white hover:shadow-xl hover:shadow-slate-950/5"
            >
              {/* Quote Icon Background Accent */}
              <div className="absolute right-6 top-6 text-indigo-100">
                <Quote size={40} />
              </div>

              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="mt-4 text-sm leading-relaxed text-slate-700 relative z-10">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Student Details & Course Badge */}
              <div className="mt-8 flex items-center gap-4 border-t border-slate-200/60 pt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-600/20"
                />
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-base font-bold text-slate-950 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs font-medium text-indigo-600 truncate">
                    {item.role}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md">
                    {item.course}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}