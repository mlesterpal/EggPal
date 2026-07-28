import type { EggHarvestPayload } from "../entity/payload/EggHarvestPayload";
import { axiosInstance } from "./apiClient";

const base = "/egg-harvests";

export const logHarvest = async (harvest: EggHarvestPayload) => {
  const response = await axiosInstance.post(`${base}/log-harvest`, harvest);
  //data is the response from the server .message is the specific property in the response object that we want to return
  return response.data.message;
};
