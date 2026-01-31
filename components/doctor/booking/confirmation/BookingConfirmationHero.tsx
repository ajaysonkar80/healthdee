import { Check } from "lucide-react";

type BookingConfirmationHeroProps = {
  doctorName: string;
};

export default function BookingConfirmationHero({
  doctorName,
}: BookingConfirmationHeroProps) {
  return (
    <section className="flex flex-col items-center text-center py-12">
      {/* Success Icon */}
      <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="h-6 w-6 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-foreground">
        Booking Confirmed!
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground mt-2 max-w-xl">
        Your appointment with <span className="font-medium">{doctorName}</span>{" "}
        is successfully scheduled. We’ve sent the details to your phone.
      </p>
    </section>
  );
}
