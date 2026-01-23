'use client'

import Link from 'next/link'
import { Search, Video } from 'lucide-react'

import { Button } from '../shared/Button'
import { Input } from '../shared/Input'
/* -------------------------------------------------------------------------- */
/*                                HERO TEXT                                   */
/* -------------------------------------------------------------------------- */

function HeroText() {
  return (
    <div className="max-w-3xl text-center">
      <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
        <span className="text-gray-900">Better Health, </span>
        <span className="text-pink-500">Simplified</span>
        <span className="text-gray-900"> for You.</span>
      </h1>

      <p className="mt-4 text-sm text-gray-500 sm:text-base">
        Find trusted doctors near you and book appointments in seconds.
        Accessible healthcare for your family.
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               HERO ACTIONS                                 */
/* -------------------------------------------------------------------------- */

function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <Link href="/login">
        <Button className="rounded-full bg-pink-500 px-6 hover:bg-pink-600">
          <Search className="mr-2 h-4 w-4" />
          Find a Doctor
        </Button>
      </Link>

      <Link href="/login">
        <Button
          
          className="rounded-full px-6"
        >
          <Video className="mr-2 h-4 w-4" />
          Consult Online
        </Button>
      </Link>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               HERO SECTION                                 */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-white px-4">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[420px] w-[420px] rounded-full bg-pink-100 blur-3xl opacity-50" />
      </div>

      <div className="flex flex-col items-center">
        <HeroText />
        <HeroActions />
      </div>
    </section>
  )
}
