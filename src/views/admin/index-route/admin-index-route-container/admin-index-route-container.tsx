"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import GarageToolsImage from "./assets/garage-tools.png";
import GaragesImage from "./assets/garages.png";
import AdminNavbar from "@/src/components/navbar/admin-navbar";

const adminActions = [
  {
    title: "Garage Management",
    description: "See all active garages, monitor status, and manage capacity.",
    href: "/admin/garage-management",
    image: GaragesImage,
    badge: "Garages",
    badgeClass: "text-orange-700",
  },
  {
    title: "Items Management",
    description: "Create new items for the inventory from here.",
    href: "/admin/item-management",
    image: GarageToolsImage,
    badge: "Items",
    badgeClass: "text-blue-700",
  },
] as const;

const AdminIndexRouteContainer = () => {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-orange-50/60 via-white to-white">
      <AdminNavbar />

      <div className="common-frame-box py-10 space-y-8 h-full">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Operations control
          </h1>
          <p className="text-gray-600 font-medium">
            Choose what you want to manage today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              <div className="p-6 flex flex-col gap-3 h-full">
                <span
                  className={`text-xs font-semibold w-fit uppercase tracking-[0.2em] ${action.badgeClass}`}
                >
                  {action.badge}
                </span>

                <div className="relative aspect-4/3 rounded-xl bg-linear-to-br from-orange-50 to-white border border-gray-100 overflow-hidden">
                  <Image
                    src={action.image}
                    alt={action.title}
                    fill
                    className="object-contain p-4 drop-shadow-sm"
                    sizes="(min-width: 768px) 480px, 100vw"
                    priority
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminIndexRouteContainer;
