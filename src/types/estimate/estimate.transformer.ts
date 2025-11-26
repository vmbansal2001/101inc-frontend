import Estimate from "./Estimate";

/* eslint-disable @typescript-eslint/no-explicit-any */
const estimatesTransformer = (estimates: any[]): Estimate[] => {
  return estimates.map((estimate: any) => estimateTransformer(estimate));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const estimateTransformer = (estimate: any): Estimate => {
  return {
    id: estimate.id,
    ticket_id: estimate.ticket_id,
    mechanic_id: estimate.mechanic_id,
    amount: estimate.amount,
    currency: estimate.currency,
    status: estimate.status,
  };
};

export { estimateTransformer, estimatesTransformer };
