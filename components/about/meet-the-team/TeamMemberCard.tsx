// app/about/_components/meet-the-team/TeamMemberCard.tsx
import Image from "next/image";

type TeamMemberCardProps = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export default function TeamMemberCard({
  name,
  role,
  quote,
  image,
}: TeamMemberCardProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={image}
          alt={name}
          width={192}
          height={192}
          className="h-full w-full object-cover grayscale"
        />
      </div>

      <h3 className="text-base font-semibold text-gray-900">{name}</h3>
      <p className="text-sm font-semibold text-pink-600">{role}</p>
      <p className="mt-2 text-xs italic text-gray-500">“{quote}”</p>
    </div>
  );
}
