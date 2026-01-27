// app/about/_components/meet-the-team/MeetTheTeam.tsx
import Link from "next/link";
import TeamMemberCard from "./TeamMemberCard";

const team = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Chief Medical Officer",
    quote: "Healthcare is a right, not a luxury.",
    image: "/indian.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    quote: "Empowering Bharat with digital health.",
    image: "/japanese.jpg",
  },
  {
    name: "Amit Varma",
    role: "Chief Technology Officer",
    quote: "Tech that feels human and simple.",
    image: "/indian2.jpg",
  },
  {
    name: "Dr. Ananya Roy",
    role: "Head of Community Care",
    quote: "Reaching the last mile with love.",
    image: "/european.jpg",
  },
];

export default function MeetTheTeam() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Meet the Team
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-600">
              Led by experienced doctors and technology pioneers who
              understand the unique challenges of rural healthcare.
            </p>
          </div>

          <Link
            href="/advisory-board"
            className="text-sm font-semibold text-pink-600 hover:underline"
          >
            View Advisory Board →
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {team.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
