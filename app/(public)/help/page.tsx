import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpTopicCard from "@/components/help/HelpTopicCard";
import FAQAccordion from "@/components/help/FAQAccordion";
import {
  CalendarDays,
  CreditCard,
  FileText,
  Search,
} from "lucide-react";
import Image from "next/image";

export default function HelpCenterPage() {
  return (
    <main className="bg-[#FFF7F8] min-h-screen">
      {/* Header Spacer */}
      <Header/>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-500">
        Home / <span className="text-pink-500">Help Center</span>
      </div>

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-4 mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          How can we help you today?
        </h1>
        <p className="text-gray-500 mt-3">
          Search for help with your bookings, reports, or payments.
        </p>

        {/* Search */}
        <div className="mt-8 flex items-center bg-white rounded-full shadow-sm overflow-hidden">
          <div className="px-4 text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search for help (e.g. 'refund', 'appointment')"
            className="flex-1 py-3 text-sm outline-none"
          />
          <button className="bg-pink-500 text-white px-6 py-3 text-sm font-medium rounded-full mr-1">
            Search
          </button>
        </div>
      </section>

      {/* Topics */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-xl font-semibold mb-6">Browse by Topic</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <HelpTopicCard
            icon={<CalendarDays />}
            title="Doctor Booking Help"
            description="Book a new visit, change timings, or cancel your doctor appointment."
          />
          <HelpTopicCard
            icon={<CreditCard />}
            title="Money & Payments"
            description="Check payment status, get refund details, or ask about bills."
          />
          <HelpTopicCard
            icon={<FileText />}
            title="Medical Reports"
            description="Find your test results, health records, and doctor prescriptions."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-xl font-semibold mb-6">Common Questions</h2>

        <FAQAccordion
          items={[
            {
              question: "How do I cancel my doctor appointment?",
              answer:
                "You can cancel your appointment by going to 'My Bookings' and clicking on the 'Cancel' button. Please note that cancellations must be made at least 2 hours before the scheduled time for a full refund.",
            },
            {
              question: "When will I get my money back after a refund?",
              answer:
                "Refunds are usually processed within 5–7 business days depending on your bank or payment provider.",
            },
            {
              question: "Can I talk to a doctor late at night?",
              answer:
                "Yes, we offer 24/7 online consultations with available doctors.",
            },
          ]}
        />
      </section>

      {/* Support Box */}
      <section className="max-w-6xl mx-auto px-4 mt-20 mb-24">
  <div className="border-2 border-dashed border-pink-300 rounded-xl bg-pink-50 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="flex items-center gap-4">
      <Image
        src="https://i.pravatar.cc/47"
        alt="Support"
        width={56}
        height={56}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold text-gray-900">
          Still need more help?
        </p>
        <p className="text-sm text-gray-500">
          Our friendly team is here to help you 24/7.
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <button className="bg-green-500 text-white px-5 py-3 rounded-full text-sm font-medium">
        WhatsApp Support
      </button>
      <button className="bg-pink-500 text-white px-5 py-3 rounded-full text-sm font-medium">
        Call Expert
      </button>
    </div>
  </div>
</section>
<Footer/>
    </main>
  
  );
}
