"use client";

import ServiceType from "@/src/types/service-type/ServiceType";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import useServiceBookingHandler from "../../use-service-booking-handler";
import Button from "@/src/components/buttons/common-button";
import usePhotoUploadHook from "../../use-photo-upload";
import Image from "next/image";
import LocationPicker from "@/src/components/location-picker/location-picker";

type Props = {
  serviceType: ServiceType;
  handleClose: () => void;
};

const MAX_ATTACHMENTS = 3;

const LOCATION_REQUIRED_MESSAGE = "Location is required.";

const HomeServiceBookingModalContainer = ({
  serviceType,
  handleClose,
}: Props) => {
  const { handleBookService } = useServiceBookingHandler();

  const [buttonLoading, setButtonLoading] = useState(false);

  const [formData, setFormData] = useState({
    issueDescription: "",
    attachments: [] as string[],
    sharableLocationLink: "",
  });

  const [formErrors, setFormErrors] = useState({
    issueDescription: "",
    attachments: "",
    sharableLocationLink: "",
  });

  const addPhotoAttachment = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, url],
    }));
  };

  const { handleUploadMedia, isUploadingMedia } =
    usePhotoUploadHook(addPhotoAttachment);

  const attachmentsLimitReached =
    formData.attachments.length >= MAX_ATTACHMENTS;

  const handleAttachmentInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (attachmentsLimitReached) {
      toast.error(`You can add up to ${MAX_ATTACHMENTS} images per request.`);
      event.target.value = "";
      return;
    }

    await handleUploadMedia(event);
  };

  const removeAttachment = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((attachment) => attachment !== url),
    }));
  };

  const handleLocationSelection = (locationLink: string) => {
    setFormData((prev) => ({
      ...prev,
      sharableLocationLink: locationLink,
    }));

    if (locationLink) {
      setFormErrors((prev) => ({
        ...prev,
        sharableLocationLink: "",
      }));
    }
  };

  const bookServiceHandler = async () => {
    if (formData.issueDescription.trim() === "") {
      setFormErrors((prev) => ({
        ...prev,
        issueDescription: "Issue description is required",
      }));
      return;
    }

    if (!formData.sharableLocationLink) {
      setFormErrors((prev) => ({
        ...prev,
        sharableLocationLink: LOCATION_REQUIRED_MESSAGE,
      }));
      toast.error(LOCATION_REQUIRED_MESSAGE);
      return;
    }

    const photo_url =
      formData.attachments.length > 0 ? formData.attachments.join(",") : null;

    setButtonLoading(true);

    const issueText = `${formData.issueDescription}`;

    await handleBookService(
      serviceType,
      issueText,
      photo_url,
      formData.sharableLocationLink
    );

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

        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-gray-900 tracking-tight">
            Attachments
          </h2>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Attach up to {MAX_ATTACHMENTS} photos (PNG, JPG, WEBP).
            </p>

            <div className="flex flex-wrap gap-3">
              {formData.attachments.map((attachment) => (
                <div
                  key={attachment}
                  className="relative h-24 w-24 rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <Image
                    src={attachment}
                    alt="Attachment preview"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />

                  <button
                    type="button"
                    aria-label="Remove attachment"
                    onClick={() => removeAttachment(attachment)}
                    className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white text-xs font-semibold hover:bg-black transition"
                  >
                    &times;
                  </button>
                </div>
              ))}

              {!attachmentsLimitReached && (
                <label
                  className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-gray-400 hover:bg-gray-100"
                  aria-label="Add attachment"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-700"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {isUploadingMedia ? "Uploading..." : "Add photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAttachmentInputChange}
                    disabled={isUploadingMedia}
                  />
                </label>
              )}
            </div>

            {attachmentsLimitReached && (
              <p className="text-xs text-gray-500">
                You&apos;ve added the maximum number of images.
              </p>
            )}

            {formErrors.attachments && (
              <p className="text-sm text-red-500">{formErrors.attachments}</p>
            )}
          </div>

          <div className="space-y-2">
            <LocationPicker setSelectedLocation={handleLocationSelection} />
            {formErrors.sharableLocationLink ? (
              <p className="text-sm text-red-500">
                {formErrors.sharableLocationLink}
              </p>
            ) : null}
          </div>
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

export default HomeServiceBookingModalContainer;
