// app/about/_components/core-values/CoreValues.tsx
import { FaHeart, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import ValueCard from "./ValueCard";

const values = [
  {
    title: "Empathy",
    description:
      "We treat every patient like family. Our care goes beyond prescriptions to ensure your emotional well-being and comfort.",
    icon: <FaHeart />,
  },
  {
    title: "Transparency",
    description:
      "No hidden costs, no complex medical jargon. We provide clear advice and upfront pricing for all tests and consultations.",
    icon: <FaEye />,
  },
  {
    title: "Local Support",
    description:
      "We are present in your city with local partners you know and trust. Physical centers within 5km of your home.",
    icon: <FaMapMarkerAlt />,
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Our Core Values
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600">
          Rooted in empathy and local support, we stand for transparency in
          every step of your health journey.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {values.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}
