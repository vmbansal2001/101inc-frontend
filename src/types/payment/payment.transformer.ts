import Payment from "./Payment";

/* eslint-disable @typescript-eslint/no-explicit-any */
const paymentTransformer = (payment: any): Payment => {
  return {
    id: payment.id,
    ticket_id: payment.ticket_id,
    amount: payment.amount,
    status: payment.status,
  };
};

const paymentsTransformer = (payments: any): Payment[] => {
  return payments.map((payment: any) => paymentTransformer(payment));
};

export { paymentTransformer, paymentsTransformer };
