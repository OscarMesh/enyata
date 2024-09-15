import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useUploadTransactionImages = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (file: any) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Transactions uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      toast.error("Failed to upload Transactions");
    },
  });
  return mutation;
};
