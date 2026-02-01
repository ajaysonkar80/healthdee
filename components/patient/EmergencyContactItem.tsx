import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Trash2 } from "lucide-react"

interface EmergencyContactItemProps {
  name: string
  relation: string
  isPrimary?: boolean
}

export default function EmergencyContactItem({
  name,
  relation,
  isPrimary = false,
}: EmergencyContactItemProps) {
  return (
    <Card className="flex items-center justify-between p-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{name}</p>
          {isPrimary && (
            <Badge variant="destructive">Primary</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{relation}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Phone className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </Card>
  )
}
