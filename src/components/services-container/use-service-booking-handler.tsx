import useUserData from "@/src/components/use-user-data/use-user-data";
import { usePostTicketMutation } from "@/src/services/tickets/tickets.query";
import ServiceType from "@/src/types/service-type/ServiceType";
import toast from "react-hot-toast";

const useServiceBookingHandler = () => {
  const { userData } = useUserData();
  const [postTicket] = usePostTicketMutation();

  const handleBookService = async (
    serviceType: ServiceType,
    issueText: string,
    photo_url: string | null,
    sharableLocationLink: string
  ) => {
    const payloadBody = {
      service: serviceType.name,
      description: issueText,
      user_id: userData.id,
      photo_url: photo_url,
      location_url: sharableLocationLink,
    };

    const postTicketPromise = postTicket({ body: payloadBody });
    toast.promise(postTicketPromise, {
      loading: "Booking service...",
      success: "Service booked successfully",
      error: "Failed to book service",
    });

    await postTicketPromise;
  };

  return {
    handleBookService,
  };
};

export default useServiceBookingHandler;
