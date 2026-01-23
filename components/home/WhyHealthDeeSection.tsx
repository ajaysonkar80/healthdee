import React from 'react';
import { Video, MessageSquareText, Clock, ShieldCheck } from 'lucide-react';

// Define the shape of a feature item for type safety
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

// Data extracted strictly from the provided image
const features: FeatureItem[] = [
  {
    id: 1,
    title: 'Video Consultation',
    description: 'Consult with doctors from anywhere via high-quality video calls',
    icon: Video,
  },
  {
    id: 2,
    title: 'Chat with Doctors',
    description: 'Get quick answers through our secure messaging platform',
    icon: MessageSquareText,
  },
  {
    id: 3,
    title: '24/7 Availability',
    description: 'Access healthcare services anytime, day or night',
    icon: Clock,
  },
  {
    id: 4,
    title: 'Secure & Private',
    description: 'Your health data is protected with enterprise-grade security',
    icon: ShieldCheck,
  },
];

const WhyHealthDeeSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-white" aria-labelledby="why-choose-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            id="why-choose-heading" 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Why Choose Healthdee?
          </h2>
          <p className="text-gray-500 text-lg">
            Experience healthcare like never before
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center p-6 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow duration-300 ease-in-out group"
            >
              {/* Icon Container 
                  Using Brand Secondary Color: #587CFF 
                  bg opacity is set to 10% for the light circle effect 
              */}
              <div className="w-14 h-14 rounded-full bg-accent-primary/10 flex items-center justify-center mb-6 group-hover:bg-[#587CFF]/20 transition-colors">
                <feature.icon 
                  className="w-7 h-7 text-[#fb5881]" 
                  strokeWidth={2} 
                  aria-hidden="true" 
                />
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-center text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHealthDeeSection;