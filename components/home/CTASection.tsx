import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      {/* 
        Card Container 
        - Max width constrains it (max-w-4xl)
        - White background with subtle border and shadow to match the image
      */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl p-10 md:p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of patients who trust Healthdee for their healthcare needs
        </p>

        {/* Button - Using Primary Brand Color #F26A8D */}
        <Link
          href="/signup"
          className="inline-block bg-[#F26A8D] hover:bg-[#d95676] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-sm"
        >
          Create Free Account
        </Link>
      </div>
    </section>
  );
}