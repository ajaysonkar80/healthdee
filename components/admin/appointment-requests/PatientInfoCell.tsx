import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PatientInfoCellProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export function PatientInfoCell({
  name,
  email,
  avatarUrl,
}: PatientInfoCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
