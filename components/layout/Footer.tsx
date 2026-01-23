import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-10 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="font-medium text-gray-700">HealSimple</p>
          <p className="mt-2 text-xs">
            Improving healthcare accessibility for everyone.
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-700">Company</p>
          <Link href="/about">About</Link>
        </div>

        <div>
          <p className="font-medium text-gray-700">Support</p>
          <Link href="/help">Help Center</Link>
        </div>

        <div>
          <p className="font-medium text-gray-700">Legal</p>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs">
        © 2026 HealSimple. All rights reserved.
      </p>
    </footer>
  );
}
