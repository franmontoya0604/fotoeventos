import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const getPrepaids = async (albumId) => {
  const { data } = await axios.get(`/api/albums/${albumId}/prepaids`);
  const prepaids = data.map((prepaid) => {
    prepaid.created = "";
    prepaid.updated = "";
    return prepaid;
  });
  return prepaids;
};

export const useGetPrepaids = (albumId) => {
  return useQuery(["prepaids"], async () => await getPrepaids(albumId));
};

/*export const useGetPrepaids = (albumId) => {
    const { data, isLoading } = useQuery(
        ["getPrepaids", `${albumId}`],
        async () => {
            return await axios
                .get(`/api/albums/${albumId}/prepaids`)
                .then((response) => response.data);
        },
        {
            onError: () => {
                console.error("Failed to load quiz");
            },
        }
    );
    return {
        prepaids: data,
        isLoading,
    };


  );
};*/

export const useCreatePrepaid = (albumId) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (payload) => {
      const response = await axios.post(
        `/api/albums/${albumId}/prepaids`,
        payload
      );
      return response.data;
    },
    {
      onSuccess: (json) => {
        queryClient.invalidateQueries({ queryKey: ["prepaids"] });
        queryClient.setQueryData("prepaid", json);
      },
      onError: (e) => {
        console.error("Failed to set user password", e);
      },
    }
  );
  return {
    createPrepaid: mutate,
    isLoading,
  };
};

export const useEditAlbum = (albumId) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(
    async (payload) => {
      const response = await axios.patch(
        `/api/albums/${albumId}/prepaids`,
        payload
      );
      return response.data;
    },
    {
      onSuccess: (json) => {
        queryClient.invalidateQueries({ queryKey: ["prepaids"] });
        alert("Prepago editado con exito");
      },
      onError: (e) => {
        console.error("Failed to set user password", e);
        alert("El prepago no pudo ser editado");
      },
    }
  );
  return {
    editPrepaid: mutate,
    isLoading,
    isSuccess,
  };
};

export const useDeletePrepaid = (albumId) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    async (payload) => {
      const response = await axios.delete(`/api/albums/${albumId}/prepaids`, {
        data: { id: payload },
      });
      return response.data.deleted;
    },
    {
      onSuccess: (json) => {
        queryClient.invalidateQueries({ queryKey: ["prepaids"] });
        console.log("on remove" + json);
        alert("Prepago eliminado con exito");
      },
      onError: (e) => {
        console.error("Failed to set user password", e);
        alert("El prepago no pudo ser eliminado");
      },
    }
  );
  return {
    deletePrepaid: mutate,
    isLoading,
    isSuccess,
  };
};
