import Ticket from "./Ticket";
import { userTransformer } from "../user/user.transformer";
import { serviceTypeTransformer } from "../service-type/service-type.transformer";
import { estimatesTransformer } from "../estimate/estimate.transformer";
import { mechanicAssignmentsTransformer } from "../mechanic-assignment/mechanic-assignment.transformer";
import { paymentsTransformer } from "../payment/payment.transformer";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ticketTransformer = (ticket: any): Ticket => {
  return {
    id: ticket.id,
    service_type: serviceTypeTransformer(ticket.service_type),
    ticket_code: ticket.ticket_code,
    estimates: estimatesTransformer(ticket.estimates),
    payments: paymentsTransformer(ticket.payments),
    assignments: mechanicAssignmentsTransformer(ticket.assignments),
    status: ticket.status,
    service_issue_id: ticket.service_issue_id,
    customer_location_id: ticket.customer_location_id,
    description: ticket.description,
    customer_id: ticket.customer_id,
    photo_url: ticket.photo_url,
    customer: userTransformer(ticket.customer),
    requested_at: ticket.requested_at,
    location_url: ticket.location_url,
  };
};

const ticketsTransformer = (tickets: any): Ticket[] => {
  return tickets.map((ticket: any) => ticketTransformer(ticket));
};

export { ticketsTransformer, ticketTransformer };
