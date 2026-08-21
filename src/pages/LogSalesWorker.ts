import type { LogSalesPayload } from "../entity/payload/LogSalespayload";

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

export const initialValues: LogSalesFormValues = salesRows.reduce((acc, row) => {
  acc[row.quantityName] = "0";
  acc[row.salesName] = "0";
  return acc;
}, {} as LogSalesFormValues);

export const buildLogSalesPayload = (
  values: LogSalesFormValues,
): LogSalesPayload => {
  return { ...values };
};
