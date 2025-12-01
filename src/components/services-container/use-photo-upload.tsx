import { useState } from "react";
import toast from "react-hot-toast";

const usePhotoUploadHook = () => {
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const handleUploadMenteeProfilePhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsUploadingMedia(true);
    if (
      e.target.files &&
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png"
    ) {
      toast.error("Please upload a valid image file");
      e.target.value = "";
    } else if (e.target.files) {
      // setFileLoading(true);
      const formData = new FormData();

      const photoName = `attachment-${Date.now()}.${e.target.files[0].name
        .split(".")
        .pop()}`;
      formData.append("file", e.target.files[0], photoName);

      const response = await fetch(
        "https://common-api.preplaced.in/upload/file?filepath=tickets/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const uploadResponseUrl = `${data.url}?alt=media&token=${data.token}`;
      console.log(uploadResponseUrl);
    }
  };

  return {
    isUploadingMedia,
    handleUploadMenteeProfilePhoto,
  };
};

export default usePhotoUploadHook;
