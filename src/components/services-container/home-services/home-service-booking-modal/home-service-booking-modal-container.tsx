import ServiceType from "@/src/types/service-type/ServiceType";
import { useState } from "react";
import useServiceBookingHandler from "../../use-service-booking-handler";
import Button from "@/src/components/buttons/common-button";
// import usePhotoUploadHook from "../../use-photo-upload";

type Props = {
  serviceType: ServiceType;
  handleClose: () => void;
};

const HomeServiceBookingModalContainer = ({
  serviceType,
  handleClose,
}: Props) => {
  const { handleBookService } = useServiceBookingHandler();
  // const { handleUploadMenteeProfilePhoto, isUploadingMedia } =
  //   usePhotoUploadHook();

  const [buttonLoading, setButtonLoading] = useState(false);

  const [formData, setFormData] = useState({
    issueDescription: "",
  });

  const [formErrors, setFormErrors] = useState({
    issueDescription: "",
  });

  const bookServiceHandler = async () => {
    if (formData.issueDescription.trim() === "") {
      setFormErrors((prev) => ({
        ...prev,
        issueDescription: "Issue description is required",
      }));
      return;
    }

    setButtonLoading(true);

    const issueText = `${formData.issueDescription}`;

    await handleBookService(serviceType, issueText);

    setButtonLoading(false);
    handleClose();
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-900 tracking-tight">
          {serviceType.name} Service Booking
        </p>
        <p className="text-sm text-gray-500">{serviceType.description}</p>
      </div>

      <div className="p-4 border-y border-gray-200 space-y-6">
        <div className="flex flex-col gap-2">
          <h2
            id="issue-category-title"
            className="text-base font-semibold text-gray-900 tracking-tight"
          >
            Describe the issue
          </h2>

          <textarea
            value={formData.issueDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                issueDescription: e.target.value,
              }))
            }
            placeholder="Describe the issue in detail"
            className="w-full rounded-md border border-gray-200 p-2 text-sm text-gray-900"
            rows={4}
          />

          {formErrors.issueDescription && (
            <p className="text-sm text-red-500">
              {formErrors.issueDescription}
            </p>
          )}
        </div>

        {/* <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-gray-900 tracking-tight">
            Attachments
          </h2>

          <input type="file" onChange={handleUploadMenteeProfilePhoto} />
        </div> */}
      </div>

      <div className="p-4">
        <Button
          className="w-full bg-black text-white py-2 rounded-md shadow-md hover:shadow-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer px-10"
          onClick={bookServiceHandler}
          loading={buttonLoading}
          loaderColor="white"
        >
          Book Service &rarr;
        </Button>
      </div>
    </div>
  );
};

export default HomeServiceBookingModalContainer;
