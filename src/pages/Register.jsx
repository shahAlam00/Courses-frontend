import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import API from "../utils/axios.js";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    general: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear inline error as user types
    if (errors[name] || errors.general) {
      setErrors({ ...errors, [name]: "", general: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { name: "", email: "", phone: "", password: "", general: "" };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
      isValid = false;
    }

    // Email validation with inline warning
    if (!formData.email) {
      newErrors.email = "Email address is required.";
      isValid = false;
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Phone validation with inline warning
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    }

    // Password validation with inline warning
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        setLoading(true);
        const response = await API.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        localStorage.setItem("token", response.data.token);
        navigate("/student/dashboard");
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Registration failed. Try again.";
        setErrors((prev) => ({ ...prev, general: errorMsg }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-5">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30">
            <FaGraduationCap size={26} />
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-white">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Join DigiCampus Academy and start your learning journey today.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-5">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          
          {errors.general && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center text-xs font-medium text-red-400">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate autoComplete="off">
            
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Full Name
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                  <FaUser size={15} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Rahul Sharma"
                  className={`w-full rounded-xl bg-slate-950/60 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none ${
                    errors.name 
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                  <FaEnvelope size={15} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="you@example.com"
                  className={`w-full rounded-xl bg-slate-950/60 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none ${
                    errors.email 
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Phone Number
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                  <FaPhone size={15} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="9876543210"
                  className={`w-full rounded-xl bg-slate-950/60 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none ${
                    errors.phone 
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                  <FaLock size={15} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={`w-full rounded-xl bg-slate-950/60 pl-11 pr-12 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none ${
                    errors.password 
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-600/50 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Bottom Login Toggle */}
          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}