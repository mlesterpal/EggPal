import {
  Box,
  Field,
  HStack,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DailySalesRecord = {
  date: string; // YYYY-MM-DD
  revenue: number;
};

const dailySalesData: DailySalesRecord[] = [
  { date: "2026-07-01", revenue: 12450 },
  { date: "2026-07-05", revenue: 13920 },
  { date: "2026-07-10", revenue: 14680 },
  { date: "2026-07-15", revenue: 15340 },
  { date: "2026-07-20", revenue: 14990 },
  { date: "2026-07-25", revenue: 16210 },
  { date: "2026-07-30", revenue: 17180 },
  { date: "2026-06-01", revenue: 11200 },
  { date: "2026-06-05", revenue: 11950 },
  { date: "2026-06-10", revenue: 12180 },
  { date: "2026-06-15", revenue: 12820 },
  { date: "2026-06-20", revenue: 13360 },
  { date: "2026-06-25", revenue: 13750 },
  { date: "2026-06-30", revenue: 14120 },
];

// php currency formatter
//new.Intl.NumberFormat is a built-in function that formats numbers to a currency format
//en-PH is the locale for the Philippines
//style: "currency" is the style of the currency
//currency: "PHP" is the currency
//maximumFractionDigits: 0 is the maximum number of decimal places
const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

const EggSalesChartDashboard = () => {
  const defaultMonth = dailySalesData[0]?.date.slice(0, 7) ?? ""; // get the default month from the first row of the daily sales data
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth); // selected month is the month that is currently selected

  // expected output of the useMemo hook
  // {
  //   date: "2026-07-01",
  //   revenue: 12450,
  // }
  const monthRows = useMemo(() => {
    return dailySalesData
      .filter((row) => row.date.startsWith(selectedMonth)) // get the rows where the date starts with the selected month
      .sort((a, b) => a.date.localeCompare(b.date)); // sort the rows by date
  }, [selectedMonth]);

  // expected output of the useMemo hook
  // {
  //   date: "2026-07-01",
  //   revenue: 12450,
  //   dayLabel: "01"
  // }
  const chartRows = useMemo(
    () =>
      monthRows.map((row) => ({
        ...row,
        dayLabel: row.date.slice(-2), // get the day from the date, slice(-2) is used to get the last 2 characters of the date
      })),
    [monthRows],
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="bg.panel"
      borderColor="border.muted"
    >
      <VStack align="stretch" gap={4}>
        <HStack justify="space-between" flexWrap="wrap" gap={3}>
          <Text fontWeight="semibold">Egg Sales</Text>
          <Field.Root w={{ base: "full", md: "220px" }}>
            <Field.Label>Month</Field.Label>
            <InputGroup>
              <Input
                type="month"
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
              />
            </InputGroup>
          </Field.Root>
        </HStack>

        <Box h={{ base: "260px", md: "320px" }}>
          {chartRows.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartRows}
                margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="dayLabel"
                  label={{ value: "Day", position: "insideBottom", offset: -4 }}
                />
                <YAxis
                  tickFormatter={(value) =>
                    currencyFormatter.format(Number(value))
                  }
                />
                <Tooltip
                  formatter={(value) => [
                    currencyFormatter.format(Number(value ?? 0)),
                    "Sales Revenue",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Sales Revenue"
                  stroke="#805ad5"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <HStack h="full" justify="center" align="center">
              <Text color="fg.muted">No sales data for this month.</Text>
            </HStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default EggSalesChartDashboard;
