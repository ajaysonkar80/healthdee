import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "Privacy Policy | HealthCare",
  description:
    "Privacy Policy explaining how HealthDee collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
    <Header/>
    <main className="min-h-screen bg-[#F6F7FB]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Privacy <span className="text-pink-500">Policy</span>
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Last Updated: January 2026
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-gray-100 space-y-10">
          {/* 1 */}
          <Section
            title="1. Introduction"
            content="HealthDee (“we,” “us,” or “our”) is committed to protecting your privacy. This policy explains how we collect, use, store, share, and protect your information when you use the HealthDee platform."
          />

          {/* 2 */}
          <Section
            title="2. Information We Collect"
            content="Personal information such as name, contact details, and location. Health-related information shared for appointment booking. Doctor and clinic information for service facilitation. Device and usage data such as IP address and logs. Payment transaction data (no card or UPI storage)."
          />

          {/* 3 */}
          <Section
            title="3. Purpose of Data Collection"
            content="To enable appointment booking, improve services, communicate updates, and comply with legal obligations."
          />

          {/* 4 */}
          <Section
            title="4. Data Sharing"
            content="We do not sell data. Information is shared only with healthcare providers, service partners, and authorities where legally required."
          />

          {/* 5 */}
          <Section
            title="5. Security & Retention"
            content="Data is protected using encryption and access controls and retained only as long as required."
          />

          {/* 6 */}
          <Section
            title="6. User Rights"
            content="Users may access, update, delete data, withdraw consent, or request data export."
          />

          {/* 7 */}
          <Section
            title="7. Children’s Privacy"
            content="HealthDee does not knowingly collect data from children under 18 without guardian consent."
          />

          {/* 8 */}
          <Section
            title="8. Third-Party Services"
            content="External services have independent privacy practices."
          />

          {/* 9 */}
          <Section
            title="9. Policy Updates"
            content="We may update this policy and notify users via the platform."
          />

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              10. Contact Us
            </h2>
            <p className="mt-3 text-gray-600">
              For any questions regarding this Privacy Policy, please contact:
            </p>
            <p className="mt-2 font-medium text-pink-500">
              hello@healthdee.in
            </p>
            <p className="text-gray-600">HealthDee, India</p>
          </section>
        </div>
      </div>
    </main>
    <Footer/>
    </div>
  );
}

function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-3 text-gray-600 leading-relaxed">{content}</p>
    </section>
  );
}
