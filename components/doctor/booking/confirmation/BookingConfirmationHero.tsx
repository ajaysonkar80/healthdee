import { Check, Clock, XCircle } from "lucide-react";

type BookingConfirmationHeroProps = {
  doctorName: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
};

export default function BookingConfirmationHero({
  doctorName,
  status,
}: BookingConfirmationHeroProps) {
  const isPending = status === "PENDING";
  const isConfirmed = status === "CONFIRMED";
  const isCancelled = status === "CANCELLED";

  return (
    <section className="flex flex-col items-center text-center py-12">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        {isPending && (
          <Clock className="h-10 w-10 text-yellow-500" />
        )}
        {isConfirmed && (
          <Check className="h-10 w-10 text-green-500" />
        )}
        {isCancelled && (
          <XCircle className="h-10 w-10 text-red-500" />
        )}
      </div>

      <h1 className="text-3xl font-semibold">
        {isPending && "Booking Pending"}
        {isConfirmed && "Booking Confirmed"}
        {isCancelled && "Booking Cancelled"}
      </h1>

      <p className="text-muted-foreground mt-2 max-w-xl">
        Your appointment with{" "}
        <span className="font-medium">
          {doctorName}
        </span>{" "}
        {isPending && "is awaiting doctor approval."}
        {isConfirmed && "has been successfully confirmed."}
        {isCancelled && "has been cancelled."}
      </p>
    </section>
  );
}