import {
  Users,
  BriefcaseBusiness,
  PlayCircle,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Students",
  },
  {
    icon: BriefcaseBusiness,
    value: "50+",
    label: "Practical Projects",
  },
  {
    icon: PlayCircle,
    value: "100+",
    label: "Lessons",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Student Rating",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-5 lg:grid-cols-4 lg:px-8">

        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-4 px-5 py-8"
          >
            <div className="hidden rounded-xl bg-white p-3 shadow-sm sm:block">
              <Icon size={22} className="text-indigo-600" />
            </div>

            <div>
              <p className="text-xl font-black text-slate-950 sm:text-2xl">
                {value}
              </p>

              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                {label}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}