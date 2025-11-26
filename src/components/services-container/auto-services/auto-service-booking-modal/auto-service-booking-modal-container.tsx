import { useState } from "react";
import ServiceType from "@/src/types/service-type/ServiceType";
import IssueCategorySelector from "./issue-category-selector";
import Button from "@/src/components/buttons/common-button";
import useServiceBookingHandler from "../../use-service-booking-handler";

type Props = {
  serviceType: ServiceType;
  handleClose: () => void;
};

const AutoServiceBookingModalContainer = ({
  serviceType,
  handleClose,
}: Props) => {
  const { handleBookService } = useServiceBookingHandler();

  const [buttonLoading, setButtonLoading] = useState(false);

  const [formData, setFormData] = useState({
    issueCategories: [] as string[],
    issueDescription: "",
  });

  const [formErrors, setFormErrors] = useState({
    issueCategories: "",
    issueDescription: "",
  });

  const handleIssueCategoryChange = (value: string) => {
    if (formData.issueCategories.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        issueCategories: prev.issueCategories.filter(
          (category) => category !== value
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        issueCategories: [...prev.issueCategories, value],
      }));
    }

    if (formErrors.issueCategories) {
      setFormErrors((prev) => ({
        ...prev,
        issueCategories: "",
      }));
    }
  };

  const bookServiceHandler = async () => {
    if (formData.issueCategories.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        issueCategories: "At least one issue is required",
      }));
      return;
    }

    setButtonLoading(true);

    const issueText = `Issue Categories: ${formData.issueCategories.join(", ")}.
${formData.issueDescription}`;

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
        <IssueCategorySelector
          value={formData.issueCategories}
          onChange={handleIssueCategoryChange}
          error={formErrors.issueCategories}
        />

        <div className="flex flex-col gap-2">
          <h2
            id="issue-category-title"
            className="text-base font-semibold text-gray-900 tracking-tight"
          >
            Describe the issue (Optional)
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
        </div>
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

export default AutoServiceBookingModalContainer;
