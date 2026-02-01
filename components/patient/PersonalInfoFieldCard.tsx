import { Card } from "@/components/ui/card"

interface InfoFieldCardProps {
  label: string
  value: string
  highlight?: boolean
}

export default function InfoFieldCard({
  label,
  value,
  highlight = false,
}: InfoFieldCardProps) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium uppercase text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 text-sm font-semibold ${
          highlight ? "text-destructive" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </Card>
  )
}
