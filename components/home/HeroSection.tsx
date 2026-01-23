import { FiShield, FiSearch, FiCalendar } from 'react-icons/fi';

export default function Hero() {
  const primaryColor = '#F26A8D'; // Pink
  const secondaryColor = '#587CFF'; // Blue

  return (
    <section className="bg-white pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* 1. Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
          style={{ 
            backgroundColor: `${secondaryColor}15`, // Light Blue background (15 = ~10% opacity)
            color: secondaryColor 
          }}
        >
          <FiShield className="w-4 h-4" />
          <span>Trusted by 100,000+ patients</span>
        </div>

        {/* 2. Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          Your Health, Our <span style={{ color: primaryColor }}>Priority</span>
        </h1>

        {/* 3. Subtext */}
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">
          Connect with top doctors, book appointments instantly, and get quality healthcare from the comfort of your home.
        </p>

        {/* 4. Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
          <button 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white font-bold text-base shadow-lg shadow-pink-100 hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: primaryColor }}
          >
            <FiSearch className="w-5 h-5" />
            Find a Doctor
          </button>
          
          <button 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-gray-200 bg-white text-gray-800 font-bold text-base hover:bg-gray-50 transition-colors"
          >
            <FiCalendar className="w-5 h-5" />
            Book Appointment
          </button>
        </div>

        {/* 5. Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-24 w-full border-t border-gray-100 pt-10 md:border-none md:pt-0">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold mb-1" style={{ color: primaryColor }}>500+</span>
            <span className="text-gray-500 font-medium">Expert Doctors</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold mb-1" style={{ color: primaryColor }}>50k+</span>
            <span className="text-gray-500 font-medium">Happy Patients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold mb-1" style={{ color: primaryColor }}>4.9</span>
            <span className="text-gray-500 font-medium">Average Rating</span>
          </div>
        </div>

      </div>
    </section>
  );
}