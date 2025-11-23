import Ticket from "./Ticket";
import userTransformer from "../user/user.transformer";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ticketTransformer = (ticket: any): Ticket => {
  return {
    id: ticket.id,
    service_type: {
      id: ticket.service_type.id,
      category_id: ticket.service_type.category_id,
      name: ticket.service_type.name,
      description: ticket.service_type.description,
    },
    ticket_code: ticket.ticket_code,
    status: ticket.status,
    service_issue_id: ticket.service_issue_id,
    customer_location_id: ticket.customer_location_id,
    description: ticket.description,
    customer_id: ticket.customer_id,
    customer: userTransformer(ticket.customer),
    requested_at: ticket.requested_at,
  };
};

const ticketsTransformer = (tickets: any): Ticket[] => {
  return tickets.map((ticket: any) => ticketTransformer(ticket));
};

export { ticketsTransformer, ticketTransformer };
