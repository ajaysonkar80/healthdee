import { Card } from "@/components/ui/card";

type AboutDoctorProps = {
  fullName: string | null;
  bio: string | null;
};

export default function AboutDoctor({
  fullName,
  bio,
}: AboutDoctorProps) {
  if (!bio) return null;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-2">
        About {fullName ?? "Doctor"}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {bio}
      </p>
    </Card>
  );
}