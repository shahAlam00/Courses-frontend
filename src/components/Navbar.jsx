import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import API from "../utils/axios.js"; // Apne axios instance ka path check kar lein

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check login status and fetch user profile name if available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const savedName = localStorage.getItem("userName");
      if (savedName) {
        setUserName(savedName);
      } else {
        // API call to fetch user details if needed
        API.get("/auth/profile")
          .then((res) => {
            const name = res.data?.name || res.data?.user?.name || "";
            if (name) {
              setUserName(name);
              localStorage.setItem("userName", name);
            }
          })
          .catch(() => {
            // Fallback agar API fail ho jaye
          });
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
    setDropdownOpen(false); // Close dropdown on route change
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setDropdownOpen(false);
    navigate("/login");
  };

  // Helper to check if a tab is active
  const isActive = (path) => location.pathname === path;

  // Get first letter of the name for avatar
  const getInitial = () => {
    if (userName && userName.trim().length > 0) {
      return userName.trim().charAt(0).toUpperCase();
    }
    return null;
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 transition-transform duration-300 group-hover:scale-105">
            <GraduationCap size={24} />
          </div>

          <div>
            <div className="text-lg font-black tracking-tight text-slate-950">
              DIGICAMPUS
            </div>
            <div className="text-[10px] font-extrabold tracking-[0.25em] text-indigo-600">
              ACADEMY
            </div>
          </div>
        </Link>

        {/* Desktop Navigation with Active State Indicator */}
        <nav className="hidden items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-100/60 p-1.5 backdrop-blur-md md:flex">
          {[
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: "Success Stories", path: "/#success" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => {
            const active = isActive(item.path);
            return item.path.startsWith("/#") ? (
              <a
                key={item.name}
                href={item.path}
                className="rounded-full px-5 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:text-indigo-600"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-white text-indigo-600 shadow-sm shadow-slate-900/5"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-white/40"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-1.5 pr-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 shadow-sm"
              >
                {/* Circular Profile Icon with First Letter */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-black text-xs shadow-inner">
                  {getInitial() ? getInitial() : <User size={15} />}
                </div>
                <span>{userName ? userName.split(" ")[0] : "Account"}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 text-slate-500 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/student/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-bold text-slate-700 transition-colors hover:text-indigo-600 px-3 py-2"
            >
              Login
            </Link>
          )}

          <Link
            to="/courses"
            className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/40"
          >
            Enroll Now
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 shadow-sm md:hidden transition hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Floating Dropdown Menu */}
      {open && (
        <div className="absolute left-4 right-4 top-24 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-950/15 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">

            <Link
              onClick={() => setOpen(false)}
              to="/"
              className={`rounded-xl px-4 py-3 font-semibold transition ${
                isActive("/") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/courses"
              className={`rounded-xl px-4 py-3 font-semibold transition ${
                isActive("/courses") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Courses
            </Link>

            <a
              onClick={() => setOpen(false)}
              href="#success"
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Success Stories
            </a>

            <Link
              onClick={() => setOpen(false)}
              to="/about"
              className={`rounded-xl px-4 py-3 font-semibold transition ${
                isActive("/about") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/contact"
              className={`rounded-xl px-4 py-3 font-semibold transition ${
                isActive("/contact") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>

            <div className="my-1 border-t border-slate-100" />

            {isLoggedIn ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/profile"
                  className={`rounded-xl px-4 py-3 font-semibold transition flex items-center gap-3 ${
                    isActive("/profile") ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white font-black text-xs">
                    {getInitial() || <User size={14} />}
                  </div> 
                  Profile ({userName || "Account"})
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-red-600 hover:bg-red-50 transition text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                to="/login"
                className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition text-center"
              >
                Login
              </Link>
            )}

            <Link
              onClick={() => setOpen(false)}
              to="/courses"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-center font-bold text-white shadow-lg shadow-indigo-600/30"
            >
              Enroll Now <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}