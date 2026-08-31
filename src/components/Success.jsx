import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../utils/axios";

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying"); // verifying | success | error

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const enroll = async () => {
      try {
        await API.post("/courses/verify-enroll", { sessionId });
        setStatus("success");
      } catch (err) {
        // Already enrolled ya koi issue
        console.error(err);
        setStatus("success"); // Still show success, enrollment might already exist
      }
    };

    enroll();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-28">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-4 border border-slate-100">
        {status === "verifying" && (
          <>
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Verifying Payment...</h1>
            <p className="text-sm text-slate-600">Please wait while we confirm your enrollment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h1 className="text-2xl font-black text-slate-900">Payment Successful!</h1>
            <p className="text-sm text-slate-600">
              You have been successfully enrolled. Start learning now!
            </p>
            <div className="pt-4 space-y-3">
              <Link
                to="/student/dashboard"
                className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition"
              >
                Go to My Courses
              </Link>
              <Link
                to="/courses"
                className="block w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition"
              >
                Browse More Courses
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✕
            </div>
            <h1 className="text-2xl font-black text-slate-900">Something went wrong</h1>
            <p className="text-sm text-slate-600">Could not verify your payment. Please contact support.</p>
            <Link
              to="/courses"
              className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition mt-4"
            >
              Back to Courses
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
