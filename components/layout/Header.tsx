import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">
      <div className="flex items-center gap-2 font-semibold">
        <span className="h-3 w-3 rounded bg-pink-500 inline-block" />
        HealSimple
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <Link href="/doctors">Find Doctors</Link>
        <Link href="/consult">Consult Online</Link>
        <Link href="/about">About</Link>
        <Link href="/help">Help</Link>
      </nav>

      <Link
        href="/signup"
        className="rounded-full bg-pink-500 px-4 py-2 text-sm text-white"
      >
        Book Appointment
      </Link>
    </header>
  );
}
