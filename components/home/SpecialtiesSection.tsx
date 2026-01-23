import { 
  FaStethoscope, 
  FaHeart, 
  FaSpa, // For Dermatology
  FaBone, 
  FaBrain, 
  FaBaby, 
  FaUserMd, // For Psychiatry/General
  FaVenus, // For Gynecology
  FaEye, 
  FaTooth 
} from 'react-icons/fa';

export default function SpecialtiesSection() {
  const primaryColor = '#F26A8D'; // Pink

  const specialties = [
    { title: 'General Physician', count: '120 doctors', icon: <FaStethoscope /> },
    { title: 'Cardiology', count: '45 doctors', icon: <FaHeart /> },
    { title: 'Dermatology', count: '38 doctors', icon: <FaSpa /> },
    { title: 'Orthopedics', count: '32 doctors', icon: <FaBone /> },
    { title: 'Neurology', count: '28 doctors', icon: <FaBrain /> },
    { title: 'Pediatrics', count: '52 doctors', icon: <FaBaby /> },
    { title: 'Psychiatry', count: '25 doctors', icon: <FaUserMd /> },
    { title: 'Gynecology', count: '40 doctors', icon: <FaVenus /> },
    { title: 'Ophthalmology', count: '22 doctors', icon: <FaEye /> },
    { title: 'Dentistry', count: '65 doctors', icon: <FaTooth /> },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Find Doctors by Specialty
          </h2>
          <p className="text-gray-500 text-base">
            Browse our wide range of medical specialties
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {specialties.map((item, index) => (
            <div 
              key={index}
              className="group flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white transition-all duration-300 hover:shadow-lg cursor-pointer"
              // Add a hover style via inline style to use the exact pink color for the border
              style={{ borderColor: 'transparent' }} 
            >
              {/* Card wrapper to handle hover border manually or via Tailwind classes. 
                  Below I use standard Tailwind for layout and inline styles for dynamic colors. */}
              <div 
                className="w-full h-full flex flex-col items-center justify-center rounded-xl border border-gray-100 transition-colors group-hover:border-[color:var(--hover-color)]"
                style={{ '--hover-color': primaryColor } as React.CSSProperties}
              >
                 {/* Icon Container */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${primaryColor}15`, // ~10% opacity pink
                    color: primaryColor 
                  }}
                >
                  <span className="text-2xl">
                    {item.icon}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-sm font-bold text-gray-800 mb-1 text-center">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}