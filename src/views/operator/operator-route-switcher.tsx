"use client";

import { usePathname, useRouter } from "@/navigation";

const OperatorRouteSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  return <></>;

  const routes = [
    {
      path: "/operator/tickets",
      label: "Ticket Management",
    },
    {
      path: "/operator/inventory",
      label: "Inventory Management",
    },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path);
  };

  const handleRouteClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex sm:inline-flex gap-1 sm:gap-2 items-center bg-gray-100 p-1 rounded-full border border-gray-200 shadow-sm w-full sm:w-auto">
      {routes.map((route) => {
        const active = isActive(route.path);
        return (
          <button
            key={route.path}
            onClick={() => handleRouteClick(route.path)}
            className={`
              relative flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap
              ${
                active
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }
            `}
            aria-current={active ? "page" : undefined}
          >
            {route.label}
            {active && (
              <span
                className="absolute inset-0 rounded-full ring-2 ring-blue-500/20"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default OperatorRouteSwitcher;
