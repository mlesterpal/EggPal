import { useNavigate } from "react-router-dom";
import type { EggHarvestPayload } from "../entity/payload/EggHarvestPayload";
import { useLogHarvest } from "../hooks/EggHarvestRepository";
import { toaster } from "../components/ui/toaster";

export type EggSizeKey = "S" | "M" | "L" | "XL" | "Cracked";

export type LogHarvestFormValues = Record<EggSizeKey, string>;

export type EggSizeOption = {
  key: EggSizeKey;
  label: string;
};

export const eggSizeOptions: ReadonlyArray<EggSizeOption> = [
  { key: "S", label: "Small (S)" },
  { key: "M", label: "Medium (M)" },
  { key: "L", label: "Large (L)" },
  { key: "XL", label: "Extra Large (XL)" },
  { key: "Cracked", label: "Cracked" },
];

export const initialValues: LogHarvestFormValues = {
  S: "0",
  M: "0",
  L: "0",
  XL: "0",
  Cracked: "0",
};

export const sanitizeCount = (value: string): number => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) return 0;
  return Math.max(0, parsed);
};

export const computeTotalEggs = (
  values: Partial<LogHarvestFormValues>,
): number => {
  return eggSizeOptions.reduce(
    (total, size) => total + sanitizeCount(values[size.key] ?? "0"),
    0,
  );
};

const formatLocalDateTime = (date: Date): string => {
  const pad = (value: number) => value.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const buildHarvestPayload = (
  values: LogHarvestFormValues,
  dateIso = formatLocalDateTime(new Date()),
): EggHarvestPayload => {
  const sanitizedCounts = {
    S: sanitizeCount(values.S),
    M: sanitizeCount(values.M),
    L: sanitizeCount(values.L),
    XL: sanitizeCount(values.XL),
    Cracked: sanitizeCount(values.Cracked),
  };

  return {
    HarvestDate: dateIso,
    ...sanitizedCounts,
    TotalEggs: computeTotalEggs({
      S: String(sanitizedCounts.S),
      M: String(sanitizedCounts.M),
      L: String(sanitizedCounts.L),
      XL: String(sanitizedCounts.XL),
      Cracked: String(sanitizedCounts.Cracked),
    }),
  };
};

export const useSubmitHarvest = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogHarvest();

  const submitHarvest = (payload: EggHarvestPayload) => {
    mutate(payload, {
      onSuccess: (message) => {
        toaster.create({
          type: "success",
          title: "Harvest saved",
          description: message || "Harvest record saved successfully.",
        });
        navigate("/");
      },
      onError: (error) => {
        toaster.create({
          type: "error",
          title: "Unable to save harvest",
          description: error.message || "Please try again.",
        });
      },
    });
  };

  return {
    submitHarvest,
    isPending,
  };
};
