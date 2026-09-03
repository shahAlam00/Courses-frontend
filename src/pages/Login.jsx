import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import API from "../utils/axios.js";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
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
    let newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    // Basic email validation with inline warning
    if (!formData.email) {
      newErrors.email = "Email address is required.";
      isValid = false;
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address.";
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
        const response = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        navigate("/");
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Invalid email or password.";
        setErrors((prev) => ({ ...prev, general: errorMsg }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 sm:left-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900/80 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 shadow-lg backdrop-blur-xl transition-all hover:bg-slate-800 hover:text-white"
        >
          <FaArrowLeft size={12} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-5">
        {/* Brand Logo */}

        <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-white">
          Welcome Back to DigiCampus
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Please enter your details to sign in and continue learning.
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
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                  <FaEnvelope size={16} />
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                  <FaLock size={16} />
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          {/* Bottom Signup Toggle */}
          <div className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Create account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}