export type HarvestPeriodCardPayload = {
  exists: boolean;
  quantity: number;
  displayTime: string;
};

export type HarvestTodaySummaryPayload = {
  amHarvest: HarvestPeriodCardPayload;
  pmHarvest: HarvestPeriodCardPayload;
};

export type HarvestTodaySummaryResponse = {
  amHarvest: HarvestPeriodCardPayload;
  pmHarvest: HarvestPeriodCardPayload;
};
