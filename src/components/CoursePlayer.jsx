import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlayCircle,
  FaCheckCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import API from "../utils/axios";

function getYoutubeEmbedUrl(url) {
  if (!url) return "";
  let embedUrl = url;
  
  if (!url.includes("youtube.com/embed")) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        embedUrl = `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      } else {
        const v = parsed.searchParams.get("v");
        if (v) embedUrl = `https://www.youtube.com/embed/${v}`;
      }
    } catch {}
  } else {
    embedUrl = url.split("?")[0];
  }

  return `${embedUrl}?modestbranding=1&rel=0&iv_load_policy=3&controls=1`;
}

export default function CoursePlayer() {
  const { courseId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const courseRes = await API.get(`/courses/${courseId}`);
        const c = courseRes.data.data;

        if (!c) { setError("Course not found."); return; }

        setCourse(c);

        if (c.modules?.length > 0 && c.modules[0].lessons?.length > 0) {
          setActiveLesson(c.modules[0].lessons[0]);
        } else if (c.youtubeUrl || c.videoFile) {
          setActiveLesson({
            _id: "main-video",
            title: c.title,
            videoUrl: c.youtubeUrl || c.videoFile,
            videoType: c.videoType || "youtube",
            duration: c.duration || "",
            isFree: false,
          });
        }

        try {
          const profileRes = await API.get("/auth/profile");
          const purchased = profileRes.data.data?.purchasedCourses || [];
          const enrollment = purchased.find(
            (pc) => pc._id?.toString() === courseId?.toString()
          );
          if (enrollment) {
            setCompletedLessons(enrollment.completedLessons || []);
          }
        } catch {}

      } catch (err) {
        console.error("Course fetch error:", err);
        setError(err.response?.data?.message || "Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleMarkComplete = async () => {
    if (!activeLesson || marking || activeLesson._id === "main-video") return;
    try {
      setMarking(true);
      const { data } = await API.post("/auth/lesson-complete", {
        courseId,
        lessonId: activeLesson._id,
      });
      setCompletedLessons(data.completedLessons || []);
    } catch (err) {
      console.error(err);
    } finally {
      setMarking(false);
    }
  };

  const hasModules = course?.modules?.length > 0 && course.modules.some(m => m.lessons.length > 0);
  const totalLessons = hasModules
    ? course.modules.reduce((s, m) => s + m.lessons.length, 0)
    : 1;
  const progress = totalLessons > 0
    ? Math.round((completedLessons.length / totalLessons) * 100)
    : 0;
  const isCompleted = (lessonId) => completedLessons.includes(lessonId?.toString());

  const videoUrl = activeLesson
    ? activeLesson.videoType === "youtube"
      ? getYoutubeEmbedUrl(activeLesson.videoUrl)
      : activeLesson.videoUrl
    : "";

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-semibold text-sm">Loading course...</p>
        </div>
      </div>
    );
  }

  // ---------- ERROR ----------
  if (error || !course) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400 text-3xl">✕</div>
          <h2 className="text-white font-black text-xl mb-2">Course Not Available</h2>
          <p className="text-slate-400 text-sm mb-6">{error || "This course could not be loaded."}</p>
          <Link to="/student/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition">
            <FaArrowLeft size={12} /> Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ---------- MAIN PLAYER ----------
  return (
    <div className="fixed inset-0 bg-slate-900 text-slate-100 flex flex-col z-50">

      {/* Header */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/student/dashboard"
            className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-bold transition"
          >
            <FaArrowLeft size={12} /> Dashboard
          </Link>
          <h1 className="text-sm font-bold text-white hidden sm:block truncate">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-400">{progress}% Complete</span>
            <div className="w-28 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 lg:hidden"
          >
            {sidebarOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* Video Area */}
        <div className="flex-1 flex flex-col overflow-y-auto min-w-0">

          {activeLesson && videoUrl ? (
            <>
              {/* Video Player */}
{/* Video Player */}
<div className="w-full bg-black flex-shrink-0 relative overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: "68vh" }}>
  {activeLesson.videoType === "youtube" ? (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Scale thoda kam kiya taaki fullscreen aur controls properly dikhein */}
      <iframe
        key={activeLesson._id}
        src={videoUrl}
        title={activeLesson.title}
        className="absolute top-1/2 left-1/2 w-[106%] h-[106%] -translate-x-1/2 -translate-y-1/2 border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {/* Sirf ek patli si transparent strip jo top title aur logo ko block karegi par controls ko nahi rokti */}
      <div className="absolute top-0 left-0 right-0 h-12 pointer-events-auto z-10 bg-transparent" onClick={(e) => e.stopPropagation()} />
    </div>
  ) : (
    <video
      key={activeLesson._id}
      src={videoUrl}
      controls
      autoPlay
      className="w-full h-full"
    />
  )}
</div>
              {/* Lesson Info Bar */}
              <div className="p-5 sm:p-6 max-w-4xl w-full mx-auto flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-800">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-white leading-snug">
                      {activeLesson.title}
                    </h2>
                    {activeLesson.duration && (
                      <p className="text-xs text-slate-500 mt-1">⏱ {activeLesson.duration}</p>
                    )}
                  </div>

                  {activeLesson._id !== "main-video" && (
                    <button
                      onClick={handleMarkComplete}
                      disabled={marking || isCompleted(activeLesson._id)}
                      className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                        isCompleted(activeLesson._id)
                          ? "bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 cursor-default"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
                      }`}
                    >
                      <FaCheckCircle size={13} />
                      {isCompleted(activeLesson._id) ? "Completed ✓" : marking ? "Saving..." : "Mark as Complete"}
                    </button>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>📚 {course.category}</span>
                  <span>👨‍🏫 {course.instructor}</span>
                  {course.level && <span>📊 {course.level}</span>}
                  {course.language && <span>🌐 {course.language}</span>}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-4xl">📭</div>
              <p className="text-slate-300 font-bold text-lg">No video available</p>
              <p className="text-slate-500 text-sm mt-2">
                The instructor hasn't added any video content yet.
              </p>
              <Link to="/student/dashboard" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition">
                <FaArrowLeft size={11} /> Back to Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className={`
          absolute lg:static right-0 top-0 h-full w-72 xl:w-80
          bg-slate-950 border-l border-slate-800 flex flex-col z-20
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Course Content</h3>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
              {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">

            {!hasModules && activeLesson && (
              <button
                onClick={() => {}}
                className="w-full text-left px-4 py-4 flex items-start gap-3 bg-indigo-600/15 border-l-2 border-indigo-500"
              >
                <FaPlayCircle className="text-indigo-400 mt-0.5 shrink-0" size={15} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white leading-snug truncate">{course.title}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Full Course Video</p>
                </div>
              </button>
            )}

            {hasModules && course.modules?.map((mod, mIdx) => (
              <div key={mod._id}>
                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Section {mIdx + 1}
                  </p>
                  <p className="text-xs font-bold text-slate-300 mt-0.5 leading-snug">{mod.title}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">
                    {mod.lessons.length} lesson{mod.lessons.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="divide-y divide-slate-800/40">
                  {mod.lessons.map((lesson, lIdx) => {
                    const active = activeLesson?._id === lesson._id;
                    const done = isCompleted(lesson._id);
                    return (
                      <button
                        key={lesson._id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors border-l-2 ${
                          active
                            ? "bg-indigo-600/15 border-indigo-500"
                            : "hover:bg-slate-900/60 border-transparent"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {done ? (
                            <FaCheckCircle className="text-emerald-500" size={14} />
                          ) : active ? (
                            <FaPlayCircle className="text-indigo-400" size={14} />
                          ) : (
                            <div className="w-[14px] h-[14px] rounded-full border border-slate-600 flex items-center justify-center text-[9px] text-slate-500 font-bold">
                              {lIdx + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold leading-snug truncate ${active ? "text-white" : "text-slate-400"}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {lesson.duration && (
                              <span className="text-[10px] text-slate-600">{lesson.duration}</span>
                            )}
                            {lesson.isFree && (
                              <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">FREE</span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!hasModules && !activeLesson && (
              <div className="p-6 text-center">
                <p className="text-xs text-slate-500">No content added yet.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}