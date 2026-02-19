import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "Terms and Conditions | HealthCare",
  description:
    "Terms and Conditions governing the use of the HealthDee platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <div>
    <Header/>
    <main className="min-h-screen bg-[#F6F7FB]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Terms & <span className="text-pink-500">Conditions</span>
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Last Updated: January 2026
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-gray-100 space-y-10">
          {/* 1 */}
          <Section
            title="1. Introduction and Acceptance"
            content="Welcome to HealthDee. These Terms and Conditions constitute a legally binding agreement between you and HealthDee governing your use of the HealthDee platform."
          />

          {/* 2 */}
          <Section
            title="2. Services"
            content="HealthDee provides a platform to discover healthcare providers and book appointments. HealthDee does not provide medical advice or treatment."
          />

          {/* 3 */}
          <Section
            title="3. Eligibility"
            content="Users must be at least 18 years old and capable of entering into a legally binding agreement."
          />

          {/* 4 */}
          <Section
            title="4. Account Registration"
            content="Users are responsible for maintaining accurate information and safeguarding account credentials."
          />

          {/* 5 */}
          <Section
            title="5. Medical Disclaimer"
            content="HealthDee is not a substitute for professional medical advice. In emergencies, contact local emergency services immediately."
          />

          {/* 6 */}
          <Section
            title="6. Fees and Payments"
            content="Applicable fees will be disclosed prior to booking. Payments are processed via third-party gateways."
          />

          {/* 7 */}
          <Section
            title="7. User Conduct"
            content="Users must not misuse the platform or provide false information."
          />

          {/* 8 */}
          <Section
            title="8. Intellectual Property"
            content="All platform content is owned by HealthDee and protected by applicable laws."
          />

          {/* 9 */}
          <Section
            title="9. Limitation of Liability"
            content="HealthDee is not liable for indirect or consequential damages. Liability is capped as permitted by law."
          />

          {/* 10 */}
          <Section
            title="10. Governing Law"
            content="These Terms are governed by the laws of India."
          />

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              11. Contact
            </h2>
            <p className="mt-3 text-gray-600">
              For any questions regarding these Terms and Conditions, please
              contact:
            </p>
            <p className="mt-2 font-medium text-pink-500">
              hello@healthdee.in
            </p>
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
