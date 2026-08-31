import { useState } from "react";
import { FaGraduationCap, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaClock, FaCheckCircle } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear inline error as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { name: "", email: "", subject: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email address is required.";
      isValid = false;
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log("Contact form submitted with:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      
      {/* Header Section */}
      <div className="relative overflow-hidden py-16 sm:py-24 px-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/0 to-slate-950/0 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            <FaGraduationCap size={16} /> Get In Touch
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            We'd Love to Hear From <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">You</span>
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Have questions about our courses, admissions, or corporate training? Reach out to our team and we'll get back to you shortly.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-5 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Contact Info & Support Cards */}
          <div className="space-y-6">
            
            {/* Quick Info Box */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Chat with us</div>
                    <div className="text-sm font-semibold text-white mt-1">support@digicampus.edu</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Call us</div>
                    <div className="text-sm font-semibold text-white mt-1">+91 (800) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Office</div>
                    <div className="text-sm font-semibold text-white mt-1">Tech Park, Sector 62, Noida, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours Card */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-indigo-400 mb-3">
                <FaClock size={20} />
                <h4 className="font-bold text-white text-base">Support Hours</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monday to Saturday: 9:00 AM – 7:00 PM IST.<br />
                Sunday: Closed (Emails monitored periodically)
              </p>
            </div>

          </div>

          {/* Right Side: Interactive Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:p-10 backdrop-blur-xl shadow-2xl relative">
              
              {submitted && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-400 text-sm font-medium">
                  <FaCheckCircle size={20} className="shrink-0" />
                  <span>Thank you! Your message has been sent successfully. We will get back to you soon.</span>
                </div>
              )}

              <h3 className="text-2xl font-black text-white mb-2">Send Us a Message</h3>
              <p className="text-sm text-slate-400 mb-8">Fill out the form below and our team will respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate autoComplete="off">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Rahul Sharma"
                      className={`w-full rounded-xl bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none ${
                        errors.name 
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                          : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="you@example.com"
                      className={`w-full rounded-xl bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none ${
                        errors.email 
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                          : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs font-medium text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Course Inquiry / Technical Support"
                    className={`w-full rounded-xl bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none ${
                      errors.subject 
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs font-medium text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`w-full rounded-xl bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 border transition-all outline-none resize-none ${
                      errors.message 
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20" 
                        : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs font-medium text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-600/50 active:scale-[0.98]"
                >
                  <FaPaperPlane size={14} /> Send Message
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}