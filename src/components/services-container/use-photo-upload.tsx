import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const usePhotoUploadHook = (callback: (url: string) => void) => {
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const handleUploadMedia = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      e.target.value = "";
      return;
    }

    setIsUploadingMedia(true);

    try {
      const formData = new FormData();
      const extensionFromName = file.name.split(".").pop();
      const extension =
        extensionFromName && extensionFromName.trim().length > 0
          ? extensionFromName
          : file.type.split("/").pop() ?? "jpg";

      const photoName = `attachment-${Date.now()}.${extension}`;
      formData.append("file", file, photoName);

      const response = await fetch(
        "https://common-api.preplaced.in/upload/file?filepath=tickets/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const uploadResponseUrl = `${data.url}?alt=media&token=${data.token}`;
      callback(uploadResponseUrl);
    } catch (error) {
      console.error("Failed to upload attachment", error);
      toast.error("Could not upload the image. Please try again.");
    } finally {
      setIsUploadingMedia(false);
      e.target.value = "";
    }
  };

  return {
    isUploadingMedia,
    handleUploadMedia,
  };
};

export default usePhotoUploadHook;
