import { ShieldCheck, WalletCards, Clock3 } from "lucide-react";

const reasons = [
  {
    id: 1,
    title: "Trusted & verified professionals",
    description:
      "Background-checked mechanics with expertise across auto and home services.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Pay after service",
    description:
      "No upfront charges. Pay securely only after your service is completed.",
    icon: WalletCards,
  },
  {
    id: 3,
    title: "Fast support & tracking",
    description:
      "Get quick updates, live status, and help whenever you need it.",
    icon: Clock3,
  },
];

const WhyChooseUs = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
        Why choose us?
      </h2>
      <p className="text-sm text-gray-600 font-medium">
        Built for trust, transparency and hassle-free service.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {reasons.map((reason) => {
          const Icon = reason.icon;

          return (
            <div
              key={reason.id}
              className="flex flex-col gap-3 rounded-lg bg-white px-4 py-5 border border-gray-200 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  <Icon size={18} strokeWidth={2.4} />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-gray-900">
                  {reason.title}
                </h3>
              </div>
              <p className="text-xs font-medium leading-relaxed text-gray-600">
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
