import User from "@/src/types/user/User";
import { useTranslations } from "next-intl";

type Props = {
  customer: User;
};

const CustomerDetailsCard = ({ customer }: Props) => {
  const t = useTranslations("mechanicTicketId");

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:p-5 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        {t("customerDetails")}
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {t("name")}
          </p>
          <p className="font-semibold text-gray-900">
            {customer.full_name || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {t("phone")}
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
