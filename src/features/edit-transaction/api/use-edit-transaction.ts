import { Transaction } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Transaction) => {
      const response = await fetch("/api/doc", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to edit Transactions");
      }

      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return mutation;
};
