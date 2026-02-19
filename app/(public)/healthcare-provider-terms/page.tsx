import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "Healthcare Provider Terms & Conditions | HealthCare",
  description:
    "Healthcare Provider Terms & Conditions governing the use of the HealthDee platform.",
};

export default function HealthcareProviderTermsPage() {
  return (
    <div>
    <Header/>
    <main className="min-h-screen bg-[#F6F7FB]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Healthcare Provider{" "}
            <span className="text-pink-500">Terms & Conditions</span>
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
            content="These Healthcare Provider Terms govern the use of the HealthDee platform by doctors, clinics, hospitals, and healthcare establishments."
          />

          {/* 2 */}
          <Section
            title="2. Role of HealthDee"
            content="HealthDee is a technology facilitation platform and does not practice medicine or provide medical advice."
          />

          {/* 3 */}
          <Section
            title="3. Provider Eligibility"
            content="Providers must hold valid licenses, registrations, and comply with applicable healthcare laws."
          />

          {/* 4 */}
          <Section
            title="4. Provider Account & Profile"
            content="Providers are responsible for the accuracy of information listed on HealthDee and for safeguarding account access."
          />

          {/* 5 */}
          <Section
            title="5. Appointments"
            content="HealthDee facilitates appointment requests but does not guarantee patient volume or attendance."
          />

          {/* 6 */}
          <Section
            title="6. Fees & Payments"
            content="Platform fees, if applicable, will be communicated clearly. Consultation fees are set solely by the Provider."
          />

          {/* 7 */}
          <Section
            title="7. Medical Responsibility"
            content="All diagnosis, treatment, and medical decisions are the sole responsibility of the Provider."
          />

          {/* 8 */}
          <Section
            title="8. Data Privacy"
            content="Providers must protect patient data and use it only for legitimate medical purposes."
          />

          {/* 9 */}
          <Section
            title="9. Prohibited Conduct"
            content="Misuse of the platform, patient data, or false information may result in suspension or termination."
          />

          {/* 10 */}
          <Section
            title="10. Intellectual Property"
            content="HealthDee retains all intellectual property rights related to the platform."
          />

          {/* 11 */}
          <Section
            title="11. Termination"
            content="HealthDee may terminate provider access for violations or legal reasons."
          />

          {/* 12 */}
          <Section
            title="12. Limitation of Liability"
            content="HealthDee is not liable for medical outcomes. Liability is limited as permitted by law."
          />

          {/* 13 */}
          <Section
            title="13. Governing Law"
            content="These terms are governed by the laws of India."
          />

          {/* 14 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              14. Contact
            </h2>
            <p className="mt-3 text-gray-600">
              For any questions regarding these Terms & Conditions, please
              contact us at:
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
