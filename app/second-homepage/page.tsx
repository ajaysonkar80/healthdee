import Link from 'next/link'
import {
  Search,
  Video,
  Stethoscope,
  Smile,
  Baby,
  Tooth,
  Heart,
  Brain,
  CheckCircle,
  Shield,
  ThumbsUp,
  CalendarCheck,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* ---------------------------------------------------------------- */}
      {/* NAVBAR */}
      {/* ---------------------------------------------------------------- */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-pink-500 text-white">
            +
          </div>
          HealSimple
        </div>

        <nav className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
          <Link href="#">Find Doctors</Link>
          <Link href="#">Consult Online</Link>
          <Link href="#">About</Link>
          <Link href="#">Help</Link>
        </nav>

        <Link href="/login">
          <Button className="rounded-full bg-pink-500 px-6 hover:bg-pink-600">
            Book Appointment
          </Button>
        </Link>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* HERO */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="absolute -z-10 h-[420px] w-[420px] rounded-full bg-pink-100 blur-3xl opacity-60" />

        <h1 className="text-4xl font-extrabold sm:text-5xl">
          <span className="text-gray-900">Better Health, </span>
          <span className="text-pink-500">Simplified</span>
          <span className="text-gray-900"> for You.</span>
        </h1>

        <p className="mt-4 max-w-xl text-gray-500">
          Find trusted doctors near you and book appointments in seconds.
          Accessible healthcare for your family.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/login">
            <Button className="rounded-full bg-pink-500 px-6 hover:bg-pink-600">
              <Search className="mr-2 h-4 w-4" />
              Find a Doctor
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="outline" className="rounded-full px-6">
              <Video className="mr-2 h-4 w-4" />
              Consult Online
            </Button>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SPECIALTIES */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-xl font-semibold">Find Doctors by Specialty</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose from over 20+ medical departments
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {[
            ['General Physician', Stethoscope, 'bg-blue-100 text-blue-500'],
            ['Dermatologist', Smile, 'bg-pink-100 text-pink-500'],
            ['Pediatrician', Baby, 'bg-orange-100 text-orange-500'],
            ['Dentist', Tooth, 'bg-purple-100 text-purple-500'],
            ['Cardiologist', Heart, 'bg-red-100 text-red-500'],
            ['Psychiatrist', Brain, 'bg-emerald-100 text-emerald-500'],
          ].map(([label, Icon, color]) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* HOW IT WORKS */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-gray-50 py-20 text-center">
        <h2 className="text-2xl font-bold">How It Works</h2>
        <p className="mt-2 text-sm text-gray-500">
          3 simple steps to better health
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            ['Find', Search, 'Search doctors by name or specialty'],
            ['Book', CalendarCheck, 'Book your visit instantly'],
            ['Get Care', Heart, 'Visit clinic or consult online'],
          ].map(([title, Icon, desc], i) => (
            <div key={title} className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow">
                <Icon className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="mt-4 font-semibold">
                {i + 1}. {title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TRUST SECTION */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-3">
        {[
          ['Verified Doctors', CheckCircle, '100% manually checked'],
          ['Secure Data', Shield, 'Your data is safe'],
          ['50,000+ Users', ThumbsUp, 'Trusted nationwide'],
        ].map(([title, Icon, desc]) => (
          <div key={title} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
              <Icon className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CTA */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-pink-500 px-6 py-20 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to get started?</h2>
        <p className="mt-2 text-pink-100">
          Join thousands who simplified their healthcare journey.
        </p>

        <Link href="/login">
          <Button className="mt-6 rounded-full bg-white px-8 text-pink-500 hover:bg-pink-50">
            Book an Appointment Now
          </Button>
        </Link>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER */}
      {/* ---------------------------------------------------------------- */}
      <footer className="mx-auto max-w-7xl px-6 py-12 text-sm text-gray-500">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <p className="font-semibold text-gray-800">HealSimple</p>
            <p className="mt-2">
              Improving healthcare accessibility for everyone.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Company</p>
            <p>About</p>
            <p>Careers</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Support</p>
            <p>Help Center</p>
            <p>Contact</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Legal</p>
            <p>Privacy</p>
            <p>Terms</p>
          </div>
        </div>

        <p className="mt-8 text-xs">
          © 2024 HealSimple Technologies. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
