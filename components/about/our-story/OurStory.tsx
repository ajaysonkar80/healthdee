// app/about/_components/our-story/OurStory.tsx
import StoryContent from "./StoryContent";
import StoryImageCard from "./StoryImageCard";

export default function OurStory() {
  return (
      <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <StoryContent />
        <StoryImageCard />
      </div>
    </div>
  );
}
