import Ticket from "@/src/types/ticket/Ticket";
import Button from "@/src/components/buttons/common-button";
import { usePostEstimateMutation } from "@/src/services/estimate/estimate.query";
import { useState } from "react";
import useUserData from "@/src/components/use-user-data/use-user-data";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

type Props = {
  ticket: Ticket;
};

const AddMechanicEstimates = ({ ticket }: Props) => {
  const t = useTranslations("mechanicTicketId");

  const [addEstimate] = usePostEstimateMutation();
  const [buttonLoading, setButtonLoading] = useState(false);

  const [estimateAmount, setEstimateAmount] = useState("");

  const { userData } = useUserData();

  const handleAddEstimate = async () => {
    const amount = Number(estimateAmount);
    if (isNaN(amount)) {
      toast.error("Please enter a valid amount");
      setEstimateAmount("");
      return;
    }

    if (!amount) {
      toast.error("Please enter an amount");
      setEstimateAmount("");
      return;
    }

    setButtonLoading(true);

    const addEstimatePromise = addEstimate({
      body: {
        amount,
        ticket_id: ticket.id,
        mechanic_id: userData.id,
      },
    });

    toast.promise(addEstimatePromise, {
      loading: "Adding estimate...",
      success: "Estimate added successfully",
      error: "Failed to add estimate",
    });

    await addEstimatePromise;

    setButtonLoading(false);
  };

  return (
    <div className="border rounded-lg px-3 py-3.5 bg-gray-50 space-y-3 h-full w-full">
      <div className="space-y-3">
        <div className="space-y-1">
          <label
            htmlFor="estimate-amount"
            className="block text-xs font-medium text-gray-700"
          >
            {t("estimatedAmount")}
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-xs font-medium text-gray-500">NPR</span>
              </div>
              <input
                id="estimate-amount"
                type="number"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-12 pr-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. 1,500"
                value={estimateAmount}
                onChange={(e) => setEstimateAmount(e.target.value)}
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            {t("estimateDescription")}
          </p>
        </div>

        <Button
          loading={buttonLoading}
          loaderColor="#fff"
          className="w-full rounded-md bg-black text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleAddEstimate}
        >
          {t("addEstimate")}
        </Button>
      </div>
    </div>
  );
};

export default AddMechanicEstimates;
