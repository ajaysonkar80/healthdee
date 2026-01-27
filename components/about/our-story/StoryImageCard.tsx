// app/about/_components/our-story/StoryImageCard.tsx
import Image from "next/image";

export default function StoryImageCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-3xl bg-pink-100/40 blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
        <Image
          src="/water-flask.png"
          alt="Healthcare product"
          width={500}
          height={500}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
