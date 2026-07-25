import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

type SalesRow = {
  id: string;
  date: string;
  eggSize: "S" | "M" | "L" | "XL";
  eggCount: number;
  totalSales: number;
};

const salesRows: SalesRow[] = [
  {
    id: "sale-1",
    date: "2026-07-20",
    eggSize: "S",
    eggCount: 120,
    totalSales: 8400,
  },
  {
    id: "sale-2",
    date: "2026-07-21",
    eggSize: "M",
    eggCount: 138,
    totalSales: 9660,
  },
  {
    id: "sale-3",
    date: "2026-07-22",
    eggSize: "L",
    eggCount: 126,
    totalSales: 8820,
  },
  {
    id: "sale-4",
    date: "2026-07-23",
    eggSize: "XL",
    eggCount: 145,
    totalSales: 10150,
  },
];

// php currency formatter
//new.Intl.NumberFormat is a built-in function that formats numbers to a currency format
//en-PH is the locale for the Philippines
//style: "currency" is the style of the currency
//currency: "PHP" is the currency
//maximumFractionDigits: 0 is the maximum number of decimal places
const phpCurrency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

const EggSalesDataTable = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredRows = useMemo(
    () =>
      salesRows.filter(
        (row) =>
          (!fromDate || row.date >= fromDate) && //get the rows where the date is greater than or equal to the from date
          (!toDate || row.date <= toDate), //get the rows where the date is less than or equal to the to date
      ),
    [fromDate, toDate], // dependencies
  );

  // calculate the total egg count
  const totalEggCount = filteredRows.reduce(
    (sum, row) => sum + row.eggCount,
    0,
  );

  // calculate the total sales amount
  const totalSalesAmount = filteredRows.reduce(
    (sum, row) => sum + row.totalSales,
    0,
  );

  return (
    <VStack align="stretch" gap={3}>
      <Text fontWeight="semibold">Sales</Text>

      <HStack
        align={{ base: "stretch", sm: "end" }}
        flexDirection={{ base: "column", sm: "row" }}
        gap={3}
      >
        <Field.Root>
          <Field.Label>From</Field.Label>
          <Input
            type="date"
            value={fromDate}
            onChange={(event) => setFromDate(event.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>To</Field.Label>
          <Input
            type="date"
            value={toDate}
            min={fromDate || undefined}
            onChange={(event) => setToDate(event.target.value)}
          />
        </Field.Root>
        <Button
          variant="outline"
          onClick={() => {
            setFromDate("");
            setToDate("");
          }}
        >
          Clear
        </Button>
      </HStack>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box overflowX="auto">
          <Table.Root variant="line" size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
                <Table.ColumnHeader>Egg Size</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">
                  Egg Count
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">
                  Total Sales
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filteredRows.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.date}</Table.Cell>
                  <Table.Cell>{row.eggSize}</Table.Cell>
                  <Table.Cell textAlign="right">{row.eggCount}</Table.Cell>
                  <Table.Cell textAlign="right">
                    {phpCurrency.format(row.totalSales)}
                  </Table.Cell>
                </Table.Row>
              ))}
              {filteredRows.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={4} textAlign="center" color="fg.muted">
                    No sales records in this date range.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

            <Table.Footer>
              <Table.Row bg="bg.subtle">
                <Table.Cell fontWeight="semibold" colSpan={2}>
                  Total Sales
                </Table.Cell>
                <Table.Cell textAlign="right" fontWeight="semibold">
                  {totalEggCount}
                </Table.Cell>
                <Table.Cell textAlign="right" fontWeight="semibold">
                  {phpCurrency.format(totalSalesAmount)}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table.Root>
        </Box>
      </Box>
    </VStack>
  );
};

export default EggSalesDataTable;
