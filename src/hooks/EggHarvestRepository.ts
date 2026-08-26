import type { EggHarvestPayload } from "../entity/payload/EggHarvestPayload";
import type { HarvestAnalysisSummaryPayload } from "../entity/payload/HarvestAnalysisSummaryPayload";
import type { HarvestTodaySummaryPayload } from "../entity/payload/HarvestTodaySummaryPayload";
import {
  getHarvestAnalysisSummary,
  getHarvestTodaySummary,
  logHarvest,
} from "../services/LogHarvestService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGetHarvestAnalysisSummary = () => {
  return useQuery<HarvestAnalysisSummaryPayload[], Error>({
    queryKey: ["harvest-analysis-summary"],
    queryFn: () => getHarvestAnalysisSummary(),
  });
};

export const useGetHarvestTodaySummary = () => {
  return useQuery<HarvestTodaySummaryPayload, Error>({
    queryKey: ["harvest-today-summary"],
    queryFn: () => getHarvestTodaySummary(),
  });
};
