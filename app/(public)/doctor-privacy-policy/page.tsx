import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Doctor Privacy Policy | HealthCare",
  description:
    "Doctor Privacy Policy explaining how Healthdee collects, processes, and protects professional data of registered medical practitioners.",
};

export default function DoctorPrivacyPolicyPage() {
  return (
    <div>
      <Header />

      <main className="min-h-screen bg-[#F6F7FB]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Doctor <span className="text-pink-500">Privacy Policy</span>
            </h1>
            <p className="mt-4 text-sm text-gray-500">
              Last Updated: January 2026
            </p>
          </div>

          {/* Card Container */}
          <div className="space-y-10 rounded-2xl bg-white p-10 shadow-sm ring-1 ring-gray-100">
            <Section
              title="1. Introduction"
              content="This Doctor Privacy Policy governs the collection and processing of personal and professional data of registered medical practitioners using the Healthdee platform, operated by Redytable Technologies Pvt. Ltd."
            />

            <Section
              title="2. Independent Professional Relationship"
              content="Doctors using Healthdee act as independent medical professionals. Nothing in this policy creates an employer-employee, agency, or partnership relationship between Healthdee and the doctor."
            />

            <Section
              title="3. Data Collected"
              content="Healthdee collects identity information, professional credentials, registration details, qualifications, specialization, experience, consultation metadata, communication logs, and platform usage data."
            />

            <Section
              title="4. Purpose of Processing"
              content="Doctor data is processed for credential verification, onboarding, platform functionality, compliance audits, fraud prevention, dispute resolution, and regulatory reporting."
            />

            <Section
              title="5. Professional Obligations"
              content="Doctors are responsible for maintaining confidentiality of patient information, complying with medical ethics, applicable laws, and professional standards."
            />

            <Section
              title="6. Monitoring & Logs"
              content="Healthdee may maintain system logs, audit trails, and activity records for quality assurance, legal compliance, and platform security."
            />

            <Section
              title="7. Data Sharing"
              content="Doctor data may be shared with regulators, legal authorities, accreditation bodies, or internal compliance teams where required by law or professional obligations."
            />

            <Section
              title="8. Data Retention"
              content="Professional data is retained for the duration of the doctor’s association with Healthdee and thereafter as required by law or for legitimate business purposes."
            />

            <Section
              title="9. Doctor Rights"
              content="Doctors may request access, correction, or deletion of personal data, subject to statutory, regulatory, or professional retention obligations."
            />

            <Section
              title="10. Limitation of Platform Liability"
              content="Healthdee does not interfere in clinical decision-making and is not responsible for medical outcomes arising from consultations conducted by doctors."
            />

            <Section
              title="11. Policy Updates"
              content="This policy may be amended periodically. Continued use of the platform constitutes acceptance of the updated policy."
            />

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Final Governing Statement
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                All doctor-related privacy policies, professional data handling
                practices, and compliance frameworks are under continuous
                monitoring, governance, and oversight of Healthdee.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
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
      <p className="mt-3 leading-relaxed text-gray-600">{content}</p>
    </section>
  );
}