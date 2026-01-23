const SPECIALTIES = [
  "General Physician",
  "Dermatologist",
  "Pediatrician",
  "Dentist",
  "Cardiologist",
  "Psychiatrist",
];

export default function SpecialtiesSection() {
  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-xl font-semibold text-center">
        Find Doctors by Specialty
      </h2>

      <p className="text-center text-sm text-gray-500 mt-1">
        Choose from over 20 medical departments
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {SPECIALTIES.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-gray-50 p-4 text-center text-sm shadow-sm"
          >
            <div className="mb-2 text-pink-500">❤️</div>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
