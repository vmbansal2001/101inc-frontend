// {
//   "id": 25,
//   "ticket_id": 26,
//   "ticket": {
//       "id": 26,
//       "ticket_code": "JOB-20251123151050",
//       "status": "ESTIMATE_PROVIDED",
//       "service_type_id": 3,
//       "vehicle_id": null,
//       "customer_location_id": null,
//       "description": "leakages present all around"
//   },
//   "mechanic_id": 46,
//   "status": "ASSIGNED",
//   "distance_km": null
// }

type MechanicAssignment = {
  id: number;
  ticket_id: number;
  mechanic_id: number;
  status: string;
};

export default MechanicAssignment;
