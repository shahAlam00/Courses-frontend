import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      const { data } = await API.put("/auth/profile", editData);
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
      <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Banner Skeleton */}
          <div className="rounded-3xl bg-slate-200 p-8 sm:p-10 h-44 w-full shadow-lg" />

          {/* Main Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1 space-y-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl space-y-3">
                <div className="h-12 bg-slate-200 rounded-2xl w-full" />
                <div className="h-12 bg-slate-100 rounded-2xl w-full" />
                <div className="h-12 bg-slate-100 rounded-2xl w-full" />
                <div className="h-12 bg-slate-100 rounded-2xl w-full" />
              </div>
            </div>

            {/* Content Area Skeleton */}
            <div className="lg:col-span-3 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="h-32 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm" />
                <div className="h-32 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm" />
                <div className="h-32 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm" />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-slate-200 rounded-md w-48" />
                  <div className="h-4 bg-slate-200 rounded-md w-16" />
                </div>
                <div className="h-24 bg-slate-100 rounded-2xl w-full" />
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8 selection:bg-indigo-600 selection:text-white">
      <div className="max-w-7xl mx-auto">

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Top Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white font-black text-2xl sm:text-3xl shadow-xl backdrop-blur-md">
                {profile?.avatar || profile?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                  Student Portal
                </span>
                <h1 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">
                  Welcome back, {profile?.name}! 👋
                </h1>
                <p className="text-sm text-indigo-200/80 mt-1">
                  Student {profile?.joinedDate ? `• Member since ${profile.joinedDate}` : ""}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600/20 border border-red-500/30 text-red-200 text-sm font-bold hover:bg-red-600 hover:text-white transition-all shadow-lg"
            >
              <FaSignOutAlt size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-100 space-y-1">
              {[
                { id: "overview", icon: FaUserGraduate, label: "Overview & Stats" },
                { id: "courses", icon: FaBookOpen, label: "My Purchased Courses" },
                { id: "profile", icon: FaUser, label: "Profile Details" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={16} /> {label}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
              >
                <FaSignOutAlt size={16} /> Logout Account
              </button>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-3 space-y-8">

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <StatCard label="Enrolled Courses" value={purchasedCourses.length} icon={<FaBookOpen size={22} />} color="indigo" />
                  <StatCard label="Completed" value={completedCount} icon={<FaCheckCircle size={22} />} color="emerald" />
                  <StatCard label="Certificates" value={completedCount} icon={<FaCertificate size={22} />} color="amber" />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-slate-900">Continue Learning</h3>
                    <button onClick={() => setActiveTab("courses")} className="text-xs font-bold text-indigo-600 hover:underline">
                      View All
                    </button>
                  </div>

                  {purchasedCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <FaBookOpen size={40} className="mx-auto text-slate-200 mb-4" />
                      <p className="text-sm text-slate-500 font-semibold">No courses enrolled yet.</p>
                      <Link to="/courses" className="mt-4 inline-block px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition">
                        Browse Courses
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
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6">
                  My Purchased Courses ({purchasedCourses.length})
                </h3>

                {purchasedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <FaBookOpen size={40} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-sm text-slate-500 font-semibold mb-4">You have not purchased any courses yet.</p>
                    <Link to="/courses" className="inline-block px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition">
                      Browse Courses
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

            {/* TAB 3: PROFILE */}
            {activeTab === "profile" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Profile Information</h3>
                  <div className="flex items-center gap-2">
                    {editMode ? (
                      <>
                        <button
                          onClick={() => setEditMode(false)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                        >
                          <FaTimes size={12} /> Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                          <FaSave size={12} /> {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
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
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    amber: "bg-amber-50 border-amber-100 text-amber-600",
  };
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{value}</h3>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function CourseRow({ course }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition">
      <div className="flex items-center gap-4">
        <img
          src={course.thumbnail || "https://placehold.co/64x64/e2e8f0/94a3b8?text=Course"}
          alt={course.title}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100">
            {course.category || "General"}
          </span>
          <h4 className="text-sm font-bold text-slate-900 mt-1">{course.title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">by {course.instructor}</p>
        </div>
      </div>

      <div className="w-full sm:w-48 flex flex-col gap-2">
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span>Progress</span>
          <span>{course.progress || 0}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${course.progress || 0}%` }} />
        </div>
      </div>

      <Link
        to={`/watch/${course._id}`}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 transition shrink-0"
      >
        <FaPlay size={10} /> {course.progress > 0 ? "Resume" : "Start"}
      </Link>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <div className="relative h-40 bg-slate-100">
          <img
            src={course.thumbnail || "https://placehold.co/400x160/e2e8f0/94a3b8?text=Course"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              {course.category || "General"}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h4 className="text-base font-bold text-slate-900 mb-1">{course.title}</h4>
          <p className="text-xs text-slate-500 mb-4">by {course.instructor}</p>

          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>{course.completedLessons || 0}/{course.totalLessons || 0} Lessons</span>
            <span>{course.progress || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${course.progress || 0}%` }} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0">
        <Link
          to={`/watch/${course._id}`}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-50 border border-indigo-100 py-3 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
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
        className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none border transition-all ${
          editable
            ? "bg-white border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            : "bg-slate-50 border-slate-200"
        }`}
      />
    </div>
  );
}