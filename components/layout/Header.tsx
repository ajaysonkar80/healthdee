import Link from 'next/link';
import { FiHeart, FiLogIn } from 'react-icons/fi';

export default function Header() {
  const primaryColor = '#F26A8D'; // Pink
  const secondaryColor = '#587CFF'; // Blue

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div 
              className="p-2 rounded-xl transition-transform group-hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              <FiHeart className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Healthdee
            </span>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* Active Link (Home) */}
            <Link 
              href="/" 
              className="px-5 py-2 rounded-full transition-colors"
              style={{ 
                backgroundColor: `${primaryColor}15`, // 15 is roughly 10% opacity hex
                color: primaryColor 
              }}
            >
              Home
            </Link>
            
            {/* Standard Links */}
            <Link href="/doctors" className="hover:opacity-80 transition-colors" style={{ color: secondaryColor }}>
              Find Doctors
            </Link>
            <Link href="/hospitals" className="hover:opacity-80 transition-colors" style={{ color: secondaryColor }}>
              Hospitals
            </Link>
            <Link href="/about" className="hover:opacity-80 transition-colors" style={{ color: secondaryColor }}>
              About
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <Link 
              href="/signin" 
              className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:opacity-70 transition-opacity"
            >
              <FiLogIn className="w-5 h-5" />
              Sign In
            </Link>

            <button 
              className="text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              Get Started
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}