import type { LogSalesPayload } from "../entity/payload/LogSalespayload";
import { axiosInstance } from "./apiClient";

const base = "/egg-sales";

export const logSales = async (sales: LogSalesPayload) => {
  const response = await axiosInstance.post(`${base}/log-sales`, sales);
  //data is the response from the server .message is the specific property in the response object that we want to return
  return response.data.message;
};

export const getTotalSales = async () => {
  const response = await axiosInstance.get(`${base}/get-total-sales`);
  return response.data.totalSales;
};
