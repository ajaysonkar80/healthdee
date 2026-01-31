import { Card } from "@/components/ui/card";

export default function AboutDoctor() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-2">About Dr. Rajesh</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Dr. Rajesh Sharma is a highly skilled Cardiologist with over 15 years of
        experience in diagnosing and treating complex heart conditions. He
        specializes in Interventional Cardiology and has performed over 5,000
        successful procedures. He is known for his patient-first approach and
        clear communication in multiple regional languages.
      </p>
    </Card>
  );
}
