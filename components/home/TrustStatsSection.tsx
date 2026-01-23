const STATS = [
  "Verified Doctors",
  "Secure Data",
  "50,000+ Happy Users",
];

export default function TrustStatsSection() {
  return (
    <section className="bg-white px-6 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {STATS.map((item) => (
          <div key={item} className="text-sm font-medium">
            ✅ {item}
          </div>
        ))}
      </div>
    </section>
  );
}
