import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoubtSupport from "../components/DoubtSupport.jsx"
import {
  FaUserGraduate,
  FaBookOpen,
  FaCertificate,
  FaSignOutAlt,
  FaUser,
  FaPlay,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes,
  FaCompass,
  FaShieldAlt,
  FaHandSparkles,
  FaCommentDots,
} from "react-icons/fa";
import API from "../utils/axios";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: "", phone: "", location: "" });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/auth/profile");
      setProfile(data.data);
      setEditData({
        name: data.data.name || "",
        phone: data.data.phone || "",
        location: data.data.location || "",
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await API.put("/auth/profile", editData);
      setProfile((prev) => ({ ...prev, ...editData }));
      setEditMode(false);
    } catch (err) {
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-16 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 h-44 w-full shadow-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-4 shadow-2xl space-y-3">
                <div className="h-12 bg-slate-800 rounded-2xl w-full" />
                <div className="h-12 bg-slate-800/50 rounded-2xl w-full" />
                <div className="h-12 bg-slate-800/50 rounded-2xl w-full" />
              </div>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="h-32 bg-slate-900/50 border border-slate-800 rounded-3xl p-6" />
                <div className="h-32 bg-slate-900/50 border border-slate-800 rounded-3xl p-6" />
                <div className="h-32 bg-slate-900/50 border border-slate-800 rounded-3xl p-6" />
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl space-y-6">
                <div className="h-6 bg-slate-800 rounded-md w-48" />
                <div className="h-24 bg-slate-800/50 rounded-2xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const purchasedCourses = profile?.purchasedCourses || [];
  const completedCount = purchasedCourses.filter((c) => c.progress === 100).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/50 border border-red-800/50 text-red-300 text-sm font-medium backdrop-blur-md">
            {error}
          </div>
        )}

        {/* Top Polished Header Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-8 sm:p-10 text-white border border-slate-800 shadow-2xl shadow-indigo-950/20 relative overflow-hidden mb-8 backdrop-blur-xl">
          <div className="absolute right-0 top-0 translate-x-16 -translate-y-16 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border border-slate-700/80 text-indigo-400 font-black text-2xl sm:text-3xl shadow-xl">
                  {profile?.avatar || profile?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide mb-2">
                  <FaHandSparkles size={10} className="text-indigo-400" />
                  <span>Student Workspace</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Welcome back, {profile?.name} 👋
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  {profile?.joinedDate ? `Academy Member since ${profile.joinedDate}` : "Ready to continue your learning journey?"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-semibold hover:bg-red-600 hover:text-white transition-all duration-200 shadow-lg shadow-red-950/20"
            >
              <FaSignOutAlt size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-3">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-xl space-y-1.5">
              {[
                { id: "overview", icon: FaUserGraduate, label: "Overview & Stats" },
                { id: "courses", icon: FaBookOpen, label: "My Purchased Courses" },
                { id: "profile", icon: FaUser, label: "Profile Settings" },
                  {
    id: "doubts",
    icon: FaCommentDots,
    label: "Doubt Support",
  },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === id
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <Icon size={16} className={activeTab === id ? "text-white" : "text-indigo-400"} /> 
                  <span>{label}</span>
                </button>
              ))}

              <div className="pt-2 mt-2 border-t border-slate-800/80">
                <Link
                  to="/courses"
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent transition-all duration-200"
                >
                  <FaCompass size={16} className="text-violet-400" />
                  <span>Explore Courses</span>
                </Link>
              </div>
            </div>

            {/* Quick Support / Status Card */}
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-b from-indigo-950/40 to-slate-900/60 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FaShieldAlt size={14} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Active Account</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your account is secure with verified institutional access. Need help? Contact support.
              </p>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-3 space-y-8">

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <StatCard label="Enrolled Courses" value={purchasedCourses.length} icon={<FaBookOpen size={20} />} color="indigo" />
                  <StatCard label="Completed" value={completedCount} icon={<FaCheckCircle size={20} />} color="emerald" />
                  <StatCard label="Certificates Earned" value={completedCount} icon={<FaCertificate size={20} />} color="amber" />
                </div>

                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Continue Learning</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Pick up right where you left off</p>
                    </div>
                    <button onClick={() => setActiveTab("courses")} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition">
                      View All ({purchasedCourses.length})
                    </button>
                  </div>

                  {purchasedCourses.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
                      <FaBookOpen size={36} className="mx-auto text-slate-700 mb-3" />
                      <p className="text-sm text-slate-400 font-medium">No courses enrolled yet.</p>
                      <Link to="/courses" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30">
                        Browse Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {purchasedCourses.slice(0, 3).map((course) => (
                        <CourseRow key={course._id} course={course} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PURCHASED COURSES */}
            {activeTab === "courses" && (
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">My Purchased Courses</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage and access all your registered learning modules</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
                    Total: {purchasedCourses.length}
                  </span>
                </div>

                {purchasedCourses.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
                    <FaBookOpen size={40} className="mx-auto text-slate-700 mb-4" />
                    <p className="text-sm text-slate-400 font-medium mb-4">You have not purchased any courses yet.</p>
                    <Link to="/courses" className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30">
                      Browse Available Courses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {purchasedCourses.map((course) => (
                      <CourseCard key={course._id} course={course} />
                    ))}
                  </div>
                )}
              </div>
            )}

          {activeTab === "doubts" && (
  <DoubtSupport
    purchasedCourses={purchasedCourses}
  />
)}
            {/* TAB 3: PROFILE */}
            {activeTab === "profile" && (
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Profile Information</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Update your personal identification details</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {editMode ? (
                      <>
                        <button
                          onClick={() => setEditMode(false)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition"
                        >
                          <FaTimes size={12} /> Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                        >
                          <FaSave size={12} /> {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
                      >
                        <FaEdit size={12} /> Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ProfileField
                      label="Full Name"
                      value={editMode ? editData.name : profile?.name}
                      editable={editMode}
                      onChange={(v) => setEditData((p) => ({ ...p, name: v }))}
                    />
                    <ProfileField label="Email Address" value={profile?.email} editable={false} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ProfileField
                      label="Phone Number"
                      value={editMode ? editData.phone : profile?.phone || "Not set"}
                      editable={editMode}
                      placeholder="+91 9876543210"
                      onChange={(v) => setEditData((p) => ({ ...p, phone: v }))}
                    />
                    <ProfileField
                      label="Location"
                      value={editMode ? editData.location : profile?.location || "Not set"}
                      editable={editMode}
                      placeholder="Delhi, India"
                      onChange={(v) => setEditData((p) => ({ ...p, location: v }))}
                    />
                  </div>
                  <ProfileField label="Member Since" value={profile?.joinedDate} editable={false} />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colors = {
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  };
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
          <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{value}</h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function CourseRow({ course }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800/60 bg-slate-950/40 hover:bg-slate-800/30 transition">
      <div className="flex items-center gap-4">
        <img
          src={course.thumbnail || "https://placehold.co/64x64/1e293b/64748b?text=Course"}
          alt={course.title}
          className="w-16 h-16 rounded-xl object-cover border border-slate-800"
        />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            {course.category || "General"}
          </span>
          <h4 className="text-sm font-bold text-slate-200 mt-1">{course.title}</h4>
          <p className="text-xs text-slate-400 mt-0.5">Instructor: {course.instructor}</p>
        </div>
      </div>

      <div className="w-full sm:w-48 flex flex-col gap-2">
        <div className="flex justify-between text-xs font-semibold text-slate-400">
          <span>Progress</span>
          <span className="text-slate-200">{course.progress || 0}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all" style={{ width: `${course.progress || 0}%` }} />
        </div>
      </div>

      <Link
        to={`/watch/${course._id}`}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition shrink-0"
      >
        <FaPlay size={10} /> {course.progress > 0 ? "Resume" : "Start"}
      </Link>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-950/40 overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition">
      <div>
        <div className="relative h-44 bg-slate-900 border-b border-slate-800/80">
          <img
            src={course.thumbnail || "https://placehold.co/400x160/1e293b/64748b?text=Course"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-indigo-500/30 shadow-lg">
              {course.category || "General"}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h4 className="text-base font-bold text-white mb-1 tracking-tight">{course.title}</h4>
          <p className="text-xs text-slate-400 mb-4">Instructor: {course.instructor}</p>

          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1.5">
            <span>{course.completedLessons || 0}/{course.totalLessons || 0} Lessons</span>
            <span className="text-slate-200">{course.progress || 0}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full" style={{ width: `${course.progress || 0}%` }} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0">
        <Link
          to={`/watch/${course._id}`}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-500/10 border border-indigo-500/20 py-3 text-xs font-bold text-indigo-300 hover:bg-indigo-600 hover:text-white transition shadow-lg shadow-indigo-950/30"
        >
          <FaPlay size={10} /> {course.progress === 100 ? "Review Course" : course.progress > 0 ? "Continue Learning" : "Start Learning"}
        </Link>
      </div>
    </div>
  );
}

function ProfileField({ label, value, editable, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{label}</label>
      <input
        type="text"
        readOnly={!editable}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none border transition-all ${
          editable
            ? "bg-slate-950 border-indigo-500 text-white focus:ring-2 focus:ring-indigo-500/20 shadow-lg"
            : "bg-slate-900/50 border-slate-800 text-slate-300"
        }`}
      />
    </div>
  );
}