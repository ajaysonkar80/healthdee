import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F26A8D] flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Healthdee</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              Your trusted healthcare companion. Connect with top doctors and get quality care from anywhere.
            </p>

            {/* Social Icons (using Link) */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' }
              ].map(({ Icon, label }) => (
                <Link 
                  key={label}
                  href="/" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#F26A8D] hover:text-white transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Find Doctors', 'Hospitals', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href="/" 
                    className="text-gray-400 hover:text-[#587CFF] transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Specialties</h3>
            <ul className="space-y-4">
              {['Cardiology', 'Neurology', 'Dermatology', 'Pediatrics', 'Orthopedics'].map((item) => (
                <li key={item}>
                  <Link 
                    href="/" 
                    className="text-gray-400 hover:text-[#587CFF] transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#F26A8D] mt-1 shrink-0" />
                <span className="text-gray-400 text-sm font-medium leading-relaxed">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#F26A8D] mt-1 shrink-0" />
                <span className="text-gray-400 text-sm font-medium leading-relaxed">
                  support@healthdee.com
                </span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#F26A8D] mt-1 shrink-0" />
                <span className="text-gray-400 text-sm font-medium leading-relaxed">
                  123 Healthcare Ave, Medical District, NY 10001
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Healthdee. All rights reserved.
          </p>
          
          <div className="flex gap-8">
            <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;