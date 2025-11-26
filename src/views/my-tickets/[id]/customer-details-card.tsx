import User from "@/src/types/user/User";
import React from "react";

type Props = {
  customer: User;
};

const CustomerDetailsCard = ({ customer }: Props) => {
  return (
    <div className="border md:p-5 p-3 rounded-xl border-gray-200 bg-white space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Customer Details</h2>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Name
          </p>
          <p className="font-semibold text-gray-900">
            {customer.full_name || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Phone
          </p>
          <p className="font-semibold text-gray-900">
            {customer.phone ? (
              <a href={`tel:${customer.phone}`} className="hover:underline">
                {customer.phone}
              </a>
            ) : (
              "N/A"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsCard;
