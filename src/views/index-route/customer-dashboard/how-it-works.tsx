const steps = [
  {
    id: 1,
    title: "Choose your service",
    description: "Select service type and describe your issue.",
  },
  {
    id: 2,
    title: "Get instant quote",
    description: "Our mechanic will contact you and provide an estimate.",
  },
  {
    id: 3,
    title: "Book & track",
    description: "Approve the estimate and track your service.",
  },
  {
    id: 4,
    title: "Pay after completion",
    description: "Pay only after your service is completed.",
  },
];

const HowItWorks = () => {
  return (
    <section className="">
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
        How it works
      </h2>
      <p className="text-sm text-gray-600 font-medium">
        Book trusted services in just a few steps
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 mt-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group flex flex-col gap-3 rounded-lg bg-white px-4 py-4 border border-gray-200 transition hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                {step.id}
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-gray-900">
                {step.title}
              </h3>
            </div>
            <p className="text-xs font-medium leading-relaxed text-gray-600 max-w-[80%]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
