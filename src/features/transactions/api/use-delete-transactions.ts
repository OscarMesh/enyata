import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (ids: []) => {
      const response = await fetch("/api/docs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete Transactions");
      }

      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });

  return mutation;
};
