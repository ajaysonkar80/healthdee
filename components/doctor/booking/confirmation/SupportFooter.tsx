import Link from "next/link";
import { Phone } from "lucide-react";

export default function SupportFooter() {
  return (
    <section className="max-w-4xl mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      {/* Help */}
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        <span>
          Need help? Call us at{" "}
          <span className="font-medium text-foreground">
            1800-123-4567
          </span>
        </span>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <Link
          href="/booking/reschedule"
          className="hover:text-foreground transition"
        >
          Reschedule
        </Link>
        <Link
          href="/booking/cancel"
          className="hover:text-foreground transition"
        >
          Cancel Booking
        </Link>
        <Link
          href="/help"
          className="hover:text-foreground transition"
        >
          Help Center
        </Link>
      </div>
    </section>
  );
}
