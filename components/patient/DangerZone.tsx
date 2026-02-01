import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function DangerZone() {
  return (
    <section>
      <Alert variant="destructive" className="border-dashed">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Dangerous Actions</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-4">
          <p>
            Downloading your medical data or closing your account cannot be
            undone. Please proceed with caution.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-destructive text-destructive">
              Request Data Download
            </Button>
            <Button variant="destructive">
              Close Account
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </section>
  )
}
