const STEPS = [
  {
    title: "Find",
    description: "Search doctors by name, specialty, or city.",
  },
  {
    title: "Book",
    description: "Pick a convenient time slot and confirm instantly.",
  },
  {
    title: "Get Care",
    description: "Visit the clinic or consult online via video call.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-20">
      <h2 className="text-xl font-semibold text-center">
        How It Works
      </h2>
      <p className="text-center text-sm text-gray-500">
        3 simple steps to better health
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className="rounded-xl bg-white p-6 text-center shadow"
          >
            <div className="text-pink-500 text-xl mb-2">
              {index + 1}
            </div>
            <h3 className="font-medium">{step.title}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
