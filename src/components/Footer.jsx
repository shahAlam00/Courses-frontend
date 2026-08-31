import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 pb-16 border-b border-slate-800/80">
          
          {/* Column 1: Brand & About (Span 2) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30">
                <FaGraduationCap size={24} />
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white">
                  DIGICAMPUS
                </div>
                <div className="text-[10px] font-extrabold tracking-[0.25em] text-indigo-400">
                  ACADEMY
                </div>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
              Empowering the next generation of developers, designers, and marketers with industry-ready practical courses, expert mentorship, and career-focused programs.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaLinkedinIn, href: "#" },
                { icon: FaGithub, href: "#" },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-200 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white"
                  >
                    <IconComp size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {["Home", "About", "Courses", "Success Stories", "Contact"].map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <li key={item}>
                    <Link
                      to={path}
                      className="text-slate-400 transition-colors hover:text-indigo-400 flex items-center gap-2 group"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-colors group-hover:bg-indigo-400" />
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Top Courses */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Top Courses</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "AI Learning Course",
                "Website Development",
                "Frontend React Mastery",
                "Full Stack MERN",
                "Digital Marketing",
              ].map((course, idx) => (
                <li key={idx}>
                  <Link
                    to="/courses"
                    className="text-slate-400 transition-colors hover:text-indigo-400 flex items-center gap-2 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-colors group-hover:bg-indigo-400" />
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <IoLocationSharp size={18} className="text-indigo-400 shrink-0 mt-1" />
                <span>Sector 62, Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt size={15} className="text-indigo-400 shrink-0" />
                <span>+91 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope size={15} className="text-indigo-400 shrink-0" />
                <span>support@digicampus.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DigiCampus Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="transition hover:text-slate-400">Terms of Service</a>
            <a href="#" className="transition hover:text-slate-400">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}