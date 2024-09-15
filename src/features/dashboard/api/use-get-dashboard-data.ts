import { useQuery } from "@tanstack/react-query";

export const useGetDashboardData = () => {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      try {
        console.log("here");
        const res = await fetch(`/api/docs/dashboard`);
        if (res.ok) {
          const data = await res.json();

          return data;
        }
      } catch (error) {
        throw new Error("Failed to fetch transactions");
      }
    },
  });

  return query;
};
