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

type DailySizeProduction = {
  date: string; // YYYY-MM-DD
  small: number;
  medium: number;
  large: number;
};

const dailyProductionData: DailySizeProduction[] = [
  { date: "2026-07-01", small: 8, medium: 10, large: 11 },
  { date: "2026-07-05", small: 9, medium: 11, large: 12 },
  { date: "2026-07-10", small: 10, medium: 12, large: 11 },
  { date: "2026-07-15", small: 11, medium: 13, large: 12 },
  { date: "2026-07-20", small: 11, medium: 14, large: 13 },
  { date: "2026-07-25", small: 12, medium: 13, large: 14 },
  { date: "2026-07-30", small: 13, medium: 15, large: 16 },
  { date: "2026-06-01", small: 7, medium: 9, large: 10 },
  { date: "2026-06-05", small: 8, medium: 10, large: 9 },
  { date: "2026-06-10", small: 8, medium: 9, large: 10 },
  { date: "2026-06-15", small: 9, medium: 10, large: 11 },
  { date: "2026-06-20", small: 10, medium: 11, large: 12 },
  { date: "2026-06-25", small: 10, medium: 12, large: 11 },
  { date: "2026-06-30", small: 11, medium: 12, large: 13 },
];

const EggProductionBySizeDashboard = () => {
  const defaultMonth = dailyProductionData[0]?.date.slice(0, 7) ?? ""; // get the first month from the data
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth); // state for the selected month

  // filter the data for the selected month and sort it by date
  const monthRows = useMemo(() => {
    return dailyProductionData
      .filter((row) => row.date.startsWith(selectedMonth))
      .sort((a, b) => a.date.localeCompare(b.date)); // sort the data by date
  }, [selectedMonth]);

  // map the data to the chart rows, useMemo to avoid unnecessary re-renders for the chart when the selected month changes
  //below is the expected output of the map function
  // {
  //   date: "2026-07-01",
  //   small: 8,
  //   medium: 10,
  //   large: 11,
  //   dayLabel: "01"
  // }
  const chartRows = useMemo(
    () =>
      monthRows.map((row) => ({
        ...row, // spread the row object
        dayLabel: row.date.slice(-2), // get the day from the date
      })),
    [monthRows], // dependencies for the useMemo hook
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
          <Text fontWeight="semibold">Egg Production by Size</Text>
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
          {chartRows.length > 0 ? ( // if there is data to display, display the chart
            <ResponsiveContainer width="100%" height="100%">
              {/* the chart */}
              <LineChart
                data={chartRows} // data for the chart
                margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
              >
                {/* the grid */}
                <CartesianGrid strokeDasharray="3 3" />
                {/* the x axis */}
                <XAxis
                  dataKey="dayLabel" // data key for the x axis
                  label={{ value: "Day", position: "insideBottom", offset: -4 }} // label for the x axis
                />
                {/* the y axis */}
                <YAxis />
                <Tooltip /> // tooltip for the chart
                <Legend /> // legend for the chart
                {/* the small line */}
                <Line
                  type="monotone"
                  dataKey="small" // data key for the small line
                  name="Small" // name for the line
                  stroke="#3182ce" // stroke color for the line
                  strokeWidth={2}
                  dot
                />
                <Line
                  type="monotone"
                  dataKey="medium" // data key for the medium line
                  name="Medium" // name for the line
                  stroke="#38a169" // stroke color for the line
                  strokeWidth={2}
                  dot
                />
                <Line
                  type="monotone"
                  dataKey="large" // data key for the large line
                  name="Large" // name for the line
                  stroke="#dd6b20" // stroke color for the line
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <HStack h="full" justify="center" align="center">
              <Text color="fg.muted">No production data for this month.</Text>
            </HStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default EggProductionBySizeDashboard;
