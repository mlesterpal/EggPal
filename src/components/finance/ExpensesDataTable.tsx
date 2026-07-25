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

type ExpenseRow = {
  id: string;
  date: string;
  expenseName: string;
  cost: number;
};

// dummy data for the expenses table
const expenseRows: ExpenseRow[] = [
  { id: "exp-1", date: "2026-07-20", expenseName: "Chicken Feed", cost: 4200 },
  { id: "exp-2", date: "2026-07-21", expenseName: "Vitamins", cost: 1350 },
  { id: "exp-3", date: "2026-07-22", expenseName: "Electricity", cost: 2100 },
  { id: "exp-4", date: "2026-07-23", expenseName: "Farm Supplies", cost: 980 },
];

// php currency formatter
const phpCurrency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0, // no decimal places
});

const ExpensesDataTable = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredRows = useMemo(
    () =>
      expenseRows.filter(
        (row) =>
          (!fromDate || row.date >= fromDate) && //get the rows where the date is greater than or equal to the from date
          (!toDate || row.date <= toDate), //get the rows where the date is less than or equal to the to date
      ),
    [fromDate, toDate], // dependencies
  );

  // calculate the total expenses amount
  const totalExpensesAmount = filteredRows.reduce(
    (sum, row) => sum + row.cost,
    0,
  );

  return (
    <VStack align="stretch" gap={3}>
      <Text fontWeight="semibold">Expenses</Text>

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
                <Table.ColumnHeader>Expense Name</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">Cost</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filteredRows.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.date}</Table.Cell>
                  <Table.Cell>{row.expenseName}</Table.Cell>
                  <Table.Cell textAlign="right">
                    {phpCurrency.format(row.cost)}
                  </Table.Cell>
                </Table.Row>
              ))}
              {filteredRows.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={3} textAlign="center" color="fg.muted">
                    No expense records in this date range.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

            <Table.Footer>
              <Table.Row bg="bg.subtle">
                <Table.Cell fontWeight="semibold" colSpan={2}>
                  Total Expenses
                </Table.Cell>
                <Table.Cell textAlign="right" fontWeight="semibold">
                  {phpCurrency.format(totalExpensesAmount)}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          </Table.Root>
        </Box>
      </Box>
    </VStack>
  );
};

export default ExpensesDataTable;
