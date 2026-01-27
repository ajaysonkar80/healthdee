import React from "react";
import {
  Video,
  MessageSquareText,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  bg: string;
  color: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "Video Consultation",
    description:
      "Consult with doctors from anywhere via high-quality video calls",
    icon: Video,
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    id: 2,
    title: "Chat with Doctors",
    description:
      "Get quick answers through our secure messaging platform",
    icon: MessageSquareText,
    bg: "bg-teal-50",
    color: "text-teal-600",
  },
  {
    id: 3,
    title: "24/7 Availability",
    description:
      "Access healthcare services anytime, day or night",
    icon: Clock,
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
  {
    id: 4,
    title: "Secure & Private",
    description:
      "Your health data is protected with enterprise-grade security",
    icon: ShieldCheck,
    bg: "bg-indigo-50",
    color: "text-indigo-600",
  },
];

const WhyHealthDeeSection: React.FC = () => {
  return (
    <section
      className="w-full bg-white py-16"
      aria-labelledby="why-choose-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            id="why-choose-heading"
            className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            Why Choose Healthdee?
          </h2>
          <p className="text-lg text-gray-500">
            Experience healthcare like never before
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(
            ({ id, title, description, icon: Icon, bg, color }) => (
              <div
                key={id}
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center"
              >
                {/* Icon */}
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full ${bg} ${color}`}
                >
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>

                {/* Text */}
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyHealthDeeSection;
