import axios from "axios";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const getAlbums = async () => {
  const { data } = await axios.get("/api/albums");

  const albums = data.map((album) => {
    album.eventDate = dayjs(album.eventDate).format("DD/MM/YYYY");
    album.created = "";
    album.updated = "";
    return album;
  });
  return albums;
};

export const useGetAlbums = () => {
  return useQuery(["albums"], async () => await getAlbums());
};

export const useCreateAlbum = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, reset } = useMutation(
    async (payload) => {
      const response = await axios.post("/api/albums", payload);
      return response.data.album;
    },
    {
      onSuccess: (json) => {
        queryClient.invalidateQueries({ queryKey: ["albums"] });
        queryClient.setQueryData("album", json);
      },
      onError: (e) => {
        console.error("Album not created", e);
      },
    }
  );
  return {
    createAlbum: mutate,
    isLoading,
    isError,
    reset,
  };
};

export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    async (payload) => {
      const response = await axios.put("/api/albums", { id: payload });
      return response.data.deleted;
    },
    {
      onSuccess: (json) => {
        queryClient.invalidateQueries({ queryKey: ["albums"] });
        alert("Album eliminado con exito");
      },
      onError: (e) => {
        alert("El album no pudo ser eliminado");
      },
    }
  );
  return {
    deleteAlbum: mutate,
    isLoading,
    isSuccess,
  };
};

export const useEditAlbum = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(
    async (payload) => {
      const response = await axios.patch("/api/albums", payload);
      return response.data;
    },
    {
      onSuccess: (json) => {
        queryClient.invalidateQueries({ queryKey: ["albums"] });
      },
      onError: (e) => {
        alert("El album no pudo ser editado");
      },
    }
  );
  return {
    editAlbum: mutate,
    isLoading,
    isSuccess,
  };
};
