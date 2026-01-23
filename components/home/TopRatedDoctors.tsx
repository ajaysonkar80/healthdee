import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';

// Interface defining the Doctor data structure
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  location: string;
  position: string;
  price: number;
  imageUrl: string;
}

// Data mocking the exact content from the screenshot
const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 342,
    experience: 15,
    location: 'City Heart Hospital',
    position: 'Senior Consultant',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 2,
    name: 'Dr. James Chen',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 289,
    experience: 12,
    location: 'Metro Neuro Center',
    position: 'Head of Neurology',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 3,
    name: 'Dr. Emily Roberts',
    specialty: 'Dermatologist',
    rating: 4.7,
    reviews: 456,
    experience: 8,
    location: 'Skin Care Clinic',
    position: 'Consultant',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 4,
    name: 'Dr. Michael Thompson',
    specialty: 'General Physician',
    rating: 4.9,
    reviews: 678,
    experience: 20,
    location: 'Community Health Center',
    position: 'Chief Medical Officer',
    price: 100,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const TopRatedDoctorsSection: React.FC = () => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Top Rated Doctors
            </h2>
            <p className="text-gray-500">
              Meet our highly qualified specialists
            </p>
          </div>
          
          {/* View All Link - Using Secondary Brand Color */}
          <Link 
            href="/doctors" 
            className="group flex items-center text-[#587CFF] font-medium hover:text-[#4665d4] transition-colors"
          >
            View All 
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              
              {/* Card Header: Image & Basic Info */}
              <div className="flex gap-4 mb-4">
                {/* Doctor Image */}
                <div className="relative w-20 h-20 shrink-0">
                  <Image 
                    src={doctor.imageUrl} 
                    alt={doctor.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="80px"
                  />
                </div>

                {/* Name, Specialty, Rating */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1" title={doctor.name}>
                    {doctor.name}
                  </h3>
                  {/* Specialty - Secondary Color */}
                  <p className="text-[#587CFF] text-sm font-medium mb-1">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">{doctor.rating}</span>
                    <span className="text-gray-400 ml-1 text-xs">({doctor.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-2 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{doctor.experience} yrs exp</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{doctor.location}</span>
                </div>
                {/* Extra line for position/role to match height */}
                <div className="text-xs text-gray-400 pl-6 truncate">
                  {doctor.position}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-auto mb-4"></div>

              {/* Price */}
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-lg font-bold text-emerald-600">
                  ${doctor.price}
                </span>
                <span className="text-xs text-gray-400">
                  / consultation
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                {/* Chat Button - Outline */}
                <button 
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>

                {/* Consult Button - Primary Brand Color */}
                <button 
                  className="py-2 px-3 bg-[#F26A8D] text-white rounded-lg font-medium text-sm hover:bg-[#d95676] transition-colors shadow-sm"
                >
                  Consult
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctorsSection;