import React from "react";
import { Search, CalendarCheck, Video } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  bg: string;
  color: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Search Specialist",
    description:
      "Browse through our verified doctors by specialty or search by name",
    icon: Search,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    number: 2,
    title: "Book Appointment",
    description:
      "Choose a convenient time slot and book your appointment instantly",
    icon: CalendarCheck,
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    number: 3,
    title: "Get Consultation",
    description:
      "Connect via video call or chat and receive expert medical advice",
    icon: Video,
    bg: "bg-teal-50",
    color: "text-teal-600",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section
      className="w-full bg-white py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            id="how-it-works-heading"
            className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            How It Works
          </h2>
          <p className="text-lg text-gray-500">
            Book your consultation in 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center"
            >
              {/* Arrow (desktop only) */}
              {index < steps.length - 1 && (
                <div
                  className="absolute right-[-36px] top-12 hidden md:block"
                  aria-hidden="true"
                >
                  <svg
                    width="72"
                    height="24"
                    viewBox="0 0 72 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-300"
                  >
                    <path
                      d="M0 12H64M64 12L56 4M64 12L56 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`mb-6 flex h-20 w-20 flex-col items-center justify-center rounded-full ${step.bg} ${step.color} shadow-sm ring-1 ring-black/5`}
              >
                <step.icon className="h-6 w-6 mb-1" />
                <span className="text-sm font-semibold">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="max-w-xs text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
