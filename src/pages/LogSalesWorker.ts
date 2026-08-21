import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import type { LogSalesPayload } from "../entity/payload/LogSalespayload";
import { useLogSales } from "../hooks/EggSalesRepository";
export const salesRows = [
  {
    id: "small",
    label: "Small (S)",
    quantityName: "smallquantity",
    salesName: "smallSales",
  },
  {
    id: "medium",
    label: "Medium (M)",
    quantityName: "mediumquantity",
    salesName: "mediumSales",
  },
  {
    id: "large",
    label: "Large (L)",
    quantityName: "largequantity",
    salesName: "largeSales",
  },
  {
    id: "xlarge",
    label: "Extra Large (XL)",
    quantityName: "xlargequantity",
    salesName: "xlargeSales",
  },
] as const;

export type SalesQuantityField = (typeof salesRows)[number]["quantityName"];
export type SalesAmountField = (typeof salesRows)[number]["salesName"];
export type SalesFieldName = SalesQuantityField | SalesAmountField;
export type LogSalesFormValues = Record<SalesFieldName, string>;

export const initialValues: LogSalesFormValues = salesRows.reduce(
  (acc, row) => {
    acc[row.quantityName] = "0";
    acc[row.salesName] = "0";
    return acc;
  },
  {} as LogSalesFormValues,
);

export const buildLogSalesPayload = (
  values: LogSalesFormValues,
): LogSalesPayload => {
  return { ...values };
};

export const hasAnySalesValue = (values: LogSalesFormValues): boolean => {
  return salesRows.some((row) => {
    const saleValue = Number.parseFloat(values[row.salesName] ?? "0");
    return Number.isFinite(saleValue) && saleValue > 0;
  });
};

export const useSubmitSales = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogSales();

  const submitSales = (payload: LogSalesPayload) => {
    mutate(payload, {
      onSuccess: (message) => {
        toaster.create({
          type: "success",
          title: "Sales saved",
          description: message || "Sales record saved successfully.",
        });
        navigate("/");
      },
      onError: (error) => {
        toaster.create({
          type: "error",
          title: "Unable to save sales",
          description: error.message || "Please try again.",
        });
      },
    });
  };

  return {
    submitSales,
    isPending,
  };
};
