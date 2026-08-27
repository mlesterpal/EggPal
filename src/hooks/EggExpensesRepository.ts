import type { ExpenseCategoryPayload } from "../entity/payload/ExpenseCategoryPayload";
import type { LogExpensesPayload } from "../entity/payload/LogExpensesPayload";
import {
  getExpenseCategories,
  logExpenses,
} from "../services/LogExpensesService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogExpenses = () => {
  const queryClient = useQueryClient();
  //string message is the response from the server
  //Error is the error from the server
  //LogExpensesPayload is the data that is sent to the server
  return useMutation<string, Error, LogExpensesPayload>({
    mutationFn: (data) => logExpenses(data), //data came from the form
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useGetExpenseCategories = () => {
  return useQuery<ExpenseCategoryPayload[], Error>({
    queryKey: ["expense-categories"],
    queryFn: () => getExpenseCategories(),
  });
};
