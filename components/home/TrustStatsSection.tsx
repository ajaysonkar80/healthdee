import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const features = [
  "All doctors are verified and board-certified",
  "Secure and HIPAA-compliant platform",
  "Easy prescription and follow-up management",
  "AI-powered health assistant available 24/7"
];

const stats = [
  { 
    id: 1, 
    value: "50k+", 
    label: "Patients" 
  },
  { 
    id: 2, 
    value: "98%", 
    label: "Satisfaction" 
  }
];

const TrustStatsSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              Trusted Healthcare at Your Fingertips
            </h2>
            
            <ul className="space-y-5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4 ">
                  {/* Icon */}
                  <CheckCircle2 
                    className="w-6 h-6  shrink-0 opacity-90" 
                    strokeWidth={2}
                  />
                  {/* Text */}
                  <span className="text-lg font-medium opacity-90">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Stats Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-10 text-center shadow-lg transition-transform hover:scale-105"
              >
                <div className="text-3xl md:text-5xl font-bold  mb-2">
                  {stat.value}
                </div>
                <div className="text-pink-600 text-sm md:text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustStatsSection;