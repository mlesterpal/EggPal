import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import type { LogExpensesPayload } from "../entity/payload/LogExpensesPayload";
import { useLogExpenses } from "../hooks/EggExpensesRepository";

export type LogExpensesFormValues = {
  expenseName: string;
  amount: string;
  description: string;
};

export const initialValues: LogExpensesFormValues = {
  expenseName: "",
  amount: "",
  description: "",
};

const sanitizeAmount = (value: string): number => {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return 0;
  return Math.max(0, parsed);
};

export const buildLogExpensesPayload = (
  values: LogExpensesFormValues,
): LogExpensesPayload => {
  return {
    expenseName: values.expenseName.trim(),
    amount: sanitizeAmount(values.amount),
    description: values.description.trim(),
  };
};

export const canSubmitExpense = (values: LogExpensesFormValues): boolean => {
  return (
    values.expenseName.trim().length > 0 &&
    sanitizeAmount(values.amount) > 0
  );
};

export const useSubmitExpenses = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogExpenses();

  const submitExpenses = (payload: LogExpensesPayload) => {
    mutate(payload, {
      onSuccess: (message) => {
        toaster.create({
          type: "success",
          title: "Expense saved",
          description: message || "Expense record saved successfully.",
        });
        navigate("/");
      },
      onError: (error) => {
        toaster.create({
          type: "error",
          title: "Unable to save expense",
          description: error.message || "Please try again.",
        });
      },
    });
  };

  return {
    submitExpenses,
    isPending,
  };
};
