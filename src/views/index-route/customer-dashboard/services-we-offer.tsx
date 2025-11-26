import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Home, Wrench } from "lucide-react";

import AutoServiceImage from "./assets/auto-service-category.png";
import HomeServiceImage from "./assets/home-service-category.png";

const services = [
  {
    id: "auto",
    title: "Auto Services",
    subtitle: "Bike and car repair services",
    href: "/services/auto",
    image: AutoServiceImage,
    imageAlt: "Mechanic working underneath a car in a workshop",
    icon: Wrench,
    badgeLabel: "Bike & car experts",
    bulletPoints: [
      "Engine & Mechanical",
      "Electrical Issues",
      "Brake & Suspension",
    ],
  },
  {
    id: "home",
    title: "Home Services",
    subtitle: "Professional home repair services",
    href: "/services/home",
    image: HomeServiceImage,
    imageAlt: "Professional using a drill for home repair work",
    icon: Home,
    badgeLabel: "Trusted home pros",
    bulletPoints: [
      "Plumbing & Electrical",
      "Carpentry & Handyman",
      "Construction",
    ],
  },
] as const;

const ServicesWeOffer = () => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Services we offer
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            One app for trusted auto and home repair services, whenever you need
            them.
          </p>
        </div>

        <p className="text-xs text-gray-500 font-medium">
          Tap a card to explore services in detail.
        </p>
      </div>

      <div className="mt-2 grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Link
              key={service.id}
              href={service.href}
              className="group block h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md md:flex-row">
                <div className="relative h-40 w-full overflow-hidden bg-gray-950 sm:h-48 md:h-auto md:w-5/12">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 768px) 45vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                      <Icon size={13} strokeWidth={2.4} />
                    </span>
                    <span className="truncate">{service.badgeLabel}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 md:w-7/12">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-900 tracking-tight md:text-[17px]">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-600">
                      {service.subtitle}
                    </p>
                  </div>

                  <ul className="mt-3 space-y-1.5 md:mt-2">
                    {service.bulletPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-xs font-medium text-gray-700"
                      >
                        <CheckCircle2
                          className="mt-[2px] h-4 w-4 text-rose-500"
                          strokeWidth={2.6}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>View {service.title.toLowerCase()}</span>
                    <span
                      aria-hidden="true"
                      className="translate-x-0 transition group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesWeOffer;
