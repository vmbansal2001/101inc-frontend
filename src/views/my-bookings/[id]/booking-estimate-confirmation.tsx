import Button from "@/src/components/buttons/common-button";
import { usePutEstimateMutation } from "@/src/services/estimate/estimate.query";
import Ticket from "@/src/types/ticket/Ticket";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import PaymentQrCodeImage from "@/src/assets/images/payment-qr.jpeg";

type Props = {
  ticket: Ticket;
};

const formatStatus = (status: string) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getStatusStyles = (status: string) => {
  if (status === "APPROVED") {
    return {
      pill: "border-emerald-200 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    };
  }

  if (status === "REJECTED") {
    return {
      pill: "border-red-200 bg-red-50 text-red-700",
      dot: "bg-red-500",
    };
  }

  if (status === "PENDING_CUSTOMER_APPROVAL") {
    return {
      pill: "border-amber-200 bg-amber-50 text-amber-700",
      dot: "bg-amber-400",
    };
  }

  return {
    pill: "border-gray-200 bg-gray-50 text-gray-700",
    dot: "bg-gray-400",
  };
};

const BookingEstimateConfirmation = ({ ticket }: Props) => {
  const [putEstimate] = usePutEstimateMutation();

  const [acceptButtonLoading, setAcceptButtonLoading] = useState(false);
  const [rejectButtonLoading, setRejectButtonLoading] = useState(false);

  const handleUpdateEstimate = async (estimateId: number, status: string) => {
    const index = ticket.estimates.findIndex(
      (estimate) => estimate.id === estimateId
    );

    const associatedEstimate = ticket.estimates[index];
    const associatedPayment = ticket.payments[index];

    const payload = {
      body: {
        id: estimateId,
        amount: associatedEstimate.amount,
        status: status,
        ticket_id: ticket.id,
        payment_id: associatedPayment.id,
      },
    };

    const putEstimatePromise = putEstimate(payload);

    toast.promise(putEstimatePromise, {
      loading: "Updating estimate...",
      success: "Estimate updated successfully",
      error: "Failed to update estimate",
    });

    await putEstimatePromise;
  };

  const handleAcceptEstimate = async (estimateId: number) => {
    setAcceptButtonLoading(true);
    await handleUpdateEstimate(estimateId, "APPROVED");
  };

  const handleRejectEstimate = async (estimateId: number) => {
    setRejectButtonLoading(true);
    await handleUpdateEstimate(estimateId, "REJECTED");
  };

  return (
    <section className="rounded-2xl space-y-6 border border-gray-100 bg-white p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
            Estimate Confirmation
          </h2>
          <p className="mt-1 text-xs font-medium text-gray-500 md:text-sm">
            Review the mechanic&apos;s estimate and choose to accept or reject
            it. Your booking will be updated instantly based on your decision.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {ticket.estimates.map((estimate) => {
          const statusStyles = getStatusStyles(estimate.status);

          return (
            <div
              key={estimate.id}
              className="group rounded-xl border border-gray-100 bg-gray-50/60 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50 md:p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-base font-semibold text-gray-900 md:text-lg">
                    {estimate.currency} {estimate.amount.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Estimate #{estimate.id}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide md:text-xs ${statusStyles.pill}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${statusStyles.dot}`}
                  />
                  {formatStatus(estimate.status)}
                </span>
              </div>

              {estimate.status === "PENDING_CUSTOMER_APPROVAL" && (
                <div className="mt-4 flex flex-col gap-2 md:flex-row">
                  <Button
                    loading={acceptButtonLoading}
                    loaderColor="#fff"
                    disabled={rejectButtonLoading}
                    onClick={() => handleAcceptEstimate(estimate.id)}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 md:w-auto"
                  >
                    Accept estimate
                  </Button>
                  <Button
                    loading={rejectButtonLoading}
                    loaderColor="#000"
                    disabled={acceptButtonLoading}
                    onClick={() => handleRejectEstimate(estimate.id)}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 md:w-auto"
                  >
                    Reject estimate
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {ticket.status === "WORK_IN_PROGRESS" && (
        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 md:p-5">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 md:text-lg">
              Payment Collection
            </h3>
            <p className="mt-1 text-xs text-gray-500 md:text-sm">
              Scan the QR code below to complete your payment
            </p>
          </div>
          <div className="flex justify-center">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <Image
                src={PaymentQrCodeImage}
                alt="Payment QR Code"
                className="h-auto w-full max-w-xs rounded-md"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingEstimateConfirmation;
