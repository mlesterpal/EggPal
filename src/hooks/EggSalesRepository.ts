import type { LogSalesPayload } from "../entity/payload/LogSalespayload";
import { logSales } from "../services/LogSalesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogSales = () => {
  const queryClient = useQueryClient();
  //string message is the response from the server
  //Error is the error from the server
  //LogSalesPayload is the data that is sent to the server
  return useMutation<string, Error, LogSalesPayload>({
    mutationFn: (data) => logSales(data), //data came from the form
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["egg-sales"] });
    },
  });
};
