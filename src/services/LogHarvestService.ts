import type { EggHarvestPayload } from "../entity/payload/EggHarvestPayload";
import type { HarvestAnalysisSummaryPayload } from "../entity/payload/HarvestAnalysisSummaryPayload";
import type { HarvestTodaySummaryPayload } from "../entity/payload/HarvestTodaySummaryPayload";
import { axiosInstance } from "./apiClient";

const base = "/egg-harvests";

export const logHarvest = async (harvest: EggHarvestPayload) => {
  const response = await axiosInstance.post(`${base}/log-harvest`, harvest);
  //data is the response from the server .message is the specific property in the response object that we want to return
  return response.data.message;
};

export const getHarvestAnalysisSummary = async (): Promise<
  HarvestAnalysisSummaryPayload[]
> => {
  const response = await axiosInstance.get(
    `${base}/get-harvest-analysis-summary`,
  );
  return response.data;
};

export const getHarvestTodaySummary = async (): Promise<HarvestTodaySummaryPayload> => {
  const response = await axiosInstance.get(`${base}/get-harvest-today-summary`);
  return response.data;
};
