import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = () => {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        console.log("here");
        const res = await fetch(`/api/docs`);
        if (res.ok) {
          const { data } = await res.json();

          return data;
        }
      } catch (error) {
        throw new Error("Failed to fetch transactions");
      }
    },
  });

  return query;
};
