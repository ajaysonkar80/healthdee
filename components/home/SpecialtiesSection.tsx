import {
  FaStethoscope,
  FaHeart,
  FaSpa,
  FaBone,
  FaBrain,
  FaBaby,
  FaUserMd,
  FaVenus,
  FaEye,
  FaTooth,
} from "react-icons/fa";

const specialties = [
  {
    title: "General Physician",
    count: "120 doctors",
    icon: FaStethoscope,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    title: "Cardiology",
    count: "45 doctors",
    icon: FaHeart,
    bg: "bg-red-50",
    color: "text-red-600",
  },
  {
    title: "Dermatology",
    count: "38 doctors",
    icon: FaSpa,
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
  {
    title: "Orthopedics",
    count: "32 doctors",
    icon: FaBone,
    bg: "bg-yellow-50",
    color: "text-yellow-700",
  },
  {
    title: "Neurology",
    count: "28 doctors",
    icon: FaBrain,
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    title: "Pediatrics",
    count: "52 doctors",
    icon: FaBaby,
    bg: "bg-sky-50",
    color: "text-sky-600",
  },
  {
    title: "Psychiatry",
    count: "25 doctors",
    icon: FaUserMd,
    bg: "bg-indigo-50",
    color: "text-indigo-600",
  },
  {
    title: "Gynecology",
    count: "40 doctors",
    icon: FaVenus,
    bg: "bg-rose-50",
    color: "text-rose-600",
  },
  {
    title: "Ophthalmology",
    count: "22 doctors",
    icon: FaEye,
    bg: "bg-teal-50",
    color: "text-teal-600",
  },
  {
    title: "Dentistry",
    count: "65 doctors",
    icon: FaTooth,
    bg: "bg-cyan-50",
    color: "text-cyan-600",
  },
];

export default function SpecialtiesSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Find Doctors by Specialty
          </h2>
          <p className="mt-2 text-gray-500">
            Browse our wide range of medical specialties
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {specialties.map(
            ({ title, count, icon: Icon, bg, color }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-xl border border-gray-100 p-6 text-center"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${bg} ${color}`}
                >
                  <Icon className="text-xl" />
                </div>

                <h3 className="text-sm font-semibold text-gray-800">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {count}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
