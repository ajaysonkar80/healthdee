import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Search Specialist',
    description: 'Browse through our verified doctors by specialty or search by name',
  },
  {
    number: 2,
    title: 'Book Appointment',
    description: 'Choose a convenient time slot and book your appointment instantly',
  },
  {
    number: 3,
    title: 'Get Consultation',
    description: 'Connect via video call or chat and receive expert medical advice',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-white" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            id="how-it-works-heading" 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            How It Works
          </h2>
          <p className="text-gray-500 text-lg">
            Book your consultation in 3 simple steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Optional: Connecting Line for Desktop 
              (Hidden on mobile, sits behind the circles) 
          */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10" aria-hidden="true" />

          {steps.map((step) => (
            <div 
              key={step.number} 
              className="flex flex-col items-center text-center group"
            >
              {/* Number Circle 
                  Using Brand Secondary Color: #587CFF 
                  Note: If you prefer the Primary Pink here, change bg-[#587CFF] to bg-[#F26A8D]
              */}
              <div className="w-20 h-20 rounded-full bg-[#587CFF] text-white flex items-center justify-center text-2xl font-bold shadow-md mb-6 transition-transform duration-300 group-hover:scale-110">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
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