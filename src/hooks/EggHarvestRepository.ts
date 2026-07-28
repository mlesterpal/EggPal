import type { EggHarvestPayload } from "../entity/payload/EggHarvestPayload";
import { logHarvest } from "../services/LogHarvestService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogHarvest = () => {
  const queryClient = useQueryClient();
  //string message is the response from the server
  //Error is the error from the server
  //EggHarvestPayload is the data that is sent to the server
  return useMutation<string, Error, EggHarvestPayload>({
    mutationFn: (data) => logHarvest(data), //data came from the form
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["egg-harvests"] });
    },
  });
};
