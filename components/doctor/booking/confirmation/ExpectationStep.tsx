import { ReactNode } from "react";

type ExpectationStepProps = {
  index: number;
  icon: ReactNode;
  title: string;
  description: string;
};

export default function ExpectationStep({
  index,
  icon,
  title,
  description,
}: ExpectationStepProps) {
  return (
    <div className="flex items-start gap-4">
      {/* Step Index */}
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center font-medium">
          {index}
        </div>
        <div className="w-px flex-1 bg-green-300 mt-1" />
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-green-600">{icon}</span>
          {title}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
