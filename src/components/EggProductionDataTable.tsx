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
import { useState } from "react";

type HarvestDetails = {
  small: number;
  medium: number;
  large: number;
};

type HarvestRow = {
  id: string;
  harvestDate: string;
  harvestedBy: string;
  details: HarvestDetails;
};

const harvestRows: HarvestRow[] = [
  {
    id: "h-2026-07-23-am",
    harvestDate: "2026-07-23: 8:00 AM",
    harvestedBy: "Mark Lester",
    details: { small: 11, medium: 12, large: 14 },
  },
  {
    id: "h-2026-07-22-pm",
    harvestDate: "2026-07-22: 4:00 PM",
    harvestedBy: "A. Rivera",
    details: { small: 8, medium: 10, large: 9 },
  },
  {
    id: "h-2026-07-21-am",
    harvestDate: "2026-07-21: 8:00 AM",
    harvestedBy: "J. Santos",
    details: { small: 6, medium: 9, large: 7 },
  },
];

// format the harvest details to show the small, medium, large eggs in the format S<small> M<medium> L<large> in single column
const formatHarvestDetails = ({ small, medium, large }: HarvestDetails) =>
  `S${small} M${medium} L${large}`;

const getTotalEggs = ({ small, medium, large }: HarvestDetails) => small + medium + large;

const EggProductionDataTable = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [harvestedBy, setHarvestedBy] = useState("");

  return (
    <VStack align="stretch" gap={4}>
      {/* Filter Box */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg="bg.panel"
        borderColor="border.muted"
      >
        <HStack
          align={{ base: "stretch", md: "end" }}
          flexDirection={{ base: "column", md: "row" }} // if mobile show the fields in column else show the fields in row
          justify={{ base: "stretch", md: "flex-end" }} // in desktop show the fields at the end of the box
          gap={3}
          w="full"
        >
          <Field.Root w={{ base: "full", md: "180px" }} flexShrink={0}>
            <Field.Label>From</Field.Label>
            <Input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
          </Field.Root>
          <Field.Root w={{ base: "full", md: "180px" }} flexShrink={0}>
            <Field.Label>To</Field.Label>
            <Input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
          </Field.Root>
          <Field.Root w={{ base: "full", md: "220px" }} flexShrink={0}>
            <Field.Label>Harvested By</Field.Label>
            <Input
              placeholder="e.g. Mark Lester"
              value={harvestedBy}
              onChange={(event) => setHarvestedBy(event.target.value)}
            />
          </Field.Root>
          <HStack
            w={{ base: "full", md: "auto" }}
            justify={{ base: "flex-end", md: "flex-start" }}
            gap={2}
          >
            <Button size="sm">Filter</Button>
            <Button size="sm" variant="outline">
              Clear
            </Button>
          </HStack>
        </HStack>
      </Box>

      {/* Table Box */}
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box overflowX="auto">
          <Table.Root variant="line" size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Harvest Date</Table.ColumnHeader>
                <Table.ColumnHeader>Harvested By</Table.ColumnHeader>
                <Table.ColumnHeader>Harvest Details</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">
                  Total Eggs
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {harvestRows.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.harvestDate}</Table.Cell>
                  <Table.Cell>{row.harvestedBy}</Table.Cell>
                  <Table.Cell>
                    <Text fontFamily="mono" fontSize="sm">
                      {formatHarvestDetails(row.details)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {getTotalEggs(row.details)}
                  </Table.Cell>
                  <Table.Cell>
                    <HStack justify="flex-end" gap="2">
                      <Button size="xs" variant="outline">
                        View
                      </Button>
                      <Button size="xs">Edit</Button>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </VStack>
  );
};

export default EggProductionDataTable;
