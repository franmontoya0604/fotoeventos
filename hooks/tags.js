import axios from "axios";
import { useMutation } from "react-query";

export const useUpdatePhotoTags = () => {
  const { mutate, isLoading } = useMutation(
    async (payload) => {
      const formData = buildFormData(payload);
      return await axios
        .post("/api/admin/tag", payload)
        .then((response) => response.data);
    },
    {
      onSuccess: () => {},
      onError: (e) => {
        console.error("Failed to add tag to photo", e);
      },
    }
  );

  return {
    UpdatePhotoTags: mutate,
    isLoading,
  };
};

export const useSavePhoto = () => {
  const { mutate, isLoading } = useMutation(
    async (payload) => {
      const formData = buildFormData(payload);
      return await axios
        .post("/api/admin/photo", payload)
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        console.log("Success subscribe user to campaign");
      },
      onError: (e) => {
        console.error("Failed to save photo", e);
      },
    }
  );

  return {
    SavePhoto: mutate,
    isLoading,
  };
};

function buildFormData(payload) {
  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));
  return formData;
}
