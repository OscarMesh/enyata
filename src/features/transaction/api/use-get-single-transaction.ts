import { useQuery } from "@tanstack/react-query";

export const useGetSingleTransaction = (id: string) => {
  const query = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/doc?id=${id}`);
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
