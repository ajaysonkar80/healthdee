import { Card } from "@/components/ui/card";
import ExpectationStep from "./ExpectationStep";
import { MessageCircle, Clock, FileText } from "lucide-react";

export default function WhatToExpect() {
  return (
    <Card className="max-w-4xl mx-auto p-6 bg-green-50 border-green-100">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
          i
        </span>
        What to expect next
      </h2>

      <div className="space-y-6">
        <ExpectationStep
          index={1}
          icon={<MessageCircle className="h-5 w-5" />}
          title="Check your SMS"
          description="A confirmation message with the booking ID has been sent to +91 98765 43210."
        />

        <ExpectationStep
          index={2}
          icon={<Clock className="h-5 w-5" />}
          title="Arrive 15 mins early"
          description="Please reach the hospital reception 15 minutes before your slot for registration."
        />

        <ExpectationStep
          index={3}
          icon={<FileText className="h-5 w-5" />}
          title="Medical Records"
          description="Carry your previous reports and a valid ID proof for a smoother consultation."
        />
      </div>
    </Card>
  );
}
