import Estimate from "../estimate/Estimate";
import MechanicAssignment from "../mechanic-assignment/MechanicAssignment";
import User from "../user/User";

type Ticket = {
  id: number;
  ticket_code: string;
  service_type: {
    id: number;
    category_id: number;
    name: string;
    description: string;
  };
  estimates: Estimate[];
  assignments: MechanicAssignment[];
  status: string;
  service_issue_id: number;
  customer_location_id: number | null;
  description: string;
  customer_id: number;
  customer: User;
  requested_at: string;
};

export default Ticket;
