import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "./invoice.service";

export const useGetInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
    staleTime: 200000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
  });
};