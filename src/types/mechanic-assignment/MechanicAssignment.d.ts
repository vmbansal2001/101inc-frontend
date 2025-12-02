type MechanicAssignment = {
  id: number;
  ticket_id: number;
  mechanic_id: number;
  status: string;
  ticket: {
    id: number;
    ticket_code: string;
    status: string;
    service_type_id: number;
    vehicle_id: number | null;
    customer_location_id: number | null;
    description: string;
  };
};

export default MechanicAssignment;
