"use client";

import InventoryGarage from "@/src/types/inventory-garage/InventoryGarage";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  garages: InventoryGarage[];
  isLoading?: boolean;
  isError?: boolean;
};

const ExistingGaragesList = ({
  title,
  subtitle,
  garages,
  isLoading,
  isError,
}: Props) => {
  const renderBadge = (type: string) => {
    const isPublic = type === "Public";
    const classes = isPublic
      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
      : "bg-amber-50 text-amber-700 ring-1 ring-amber-100";

    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${classes}`}
      >
        {isPublic ? "Public" : "Private"}
      </span>
    );
  };

  const renderLoading = () =>
    Array.from({ length: 3 }).map((_, idx) => (
      <div
        key={idx}
        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm animate-pulse space-y-3"
      >
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    ));

  const renderEmpty = () => (
    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
      No garages found in this group.
    </div>
  );

  return (
    <section className="space-y-3">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {garages.length} {garages.length === 1 ? "garage" : "garages"}
          </div>
        </div>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          Unable to load garages. Please try again.
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-3 md:grid-cols-2">{renderLoading()}</div>
      ) : garages.length === 0 ? (
        renderEmpty()
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {garages.map((garage) => (
            <div
              key={garage.id}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {garage.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {garage.phone || "N/A"}
                  </p>
                </div>
                {renderBadge(garage.type)}
              </div>

              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-500">ID: {garage.id}</p>
                <Link
                  href={`/admin/garage-management/${garage.id}`}
                  className="text-gray-900 font-semibold hover:underline"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExistingGaragesList;
