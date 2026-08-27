import type { ExpenseCategoryPayload } from "../entity/payload/ExpenseCategoryPayload";
import type { LogExpensesPayload } from "../entity/payload/LogExpensesPayload";
import { axiosInstance } from "./apiClient";

const base = "/expenses";

export const logExpenses = async (expense: LogExpensesPayload) => {
  const response = await axiosInstance.post(`${base}/log-expenses`, expense);
  //data is the response from the server .message is the specific property in the response object that we want to return
  return response.data.message;
};

export const getExpenseCategories = async (): Promise<
  ExpenseCategoryPayload[]
> => {
  const response = await axiosInstance.get(`${base}/get-expense-categories`);
  return response.data;
};
