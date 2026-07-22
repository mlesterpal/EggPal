import {
  Box,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEgg, FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const HarvestTodayDashboard = () => {
  const [isAMHarvest] = useState(true); // show today's AM harvest data if true else show the plus icon
  const [isPMHarvest] = useState(false); // show today's PM harvest data if true else show the plus icon

  return (
    <Box width="full" maxW="520px">
      {" "}
      {/* maxW is the maximum width of the box */}
      <Heading
        textAlign="center"
        size="xl"
        fontWeight="semibold"
        color="fg.default"
        mb={4}
      >
        Harvest Today
      </Heading>
      {/*if mobile show the boxes in column else show the boxes in row */}
      <Stack direction={{ base: "column", md: "row" }} gap={{ base: 3, md: 0 }}>
        {/* AM Harvest Box */}
        <Box
          textAlign="center"
          border="1px solid"
          borderColor="border.muted"
          borderRadius="xl"
          bg="bg.panel"
          p={5}
          w="full"
          minW={{ base: "auto", md: "220px" }} // in mobile show the box full width else show the box width 220px
          minH={{ base: "150px", md: "160px" }}
          flex="1" // flex 1 to make the flex item take up the full height of the container
          display="flex"
          flexDirection="column"
          shadow="xs"
          transition="all 0.2s ease"
          _hover={{ shadow: "sm", borderColor: "border.subtle" }}
          position="relative"
        >
          <Heading size="md" fontWeight="semibold" mb={3}>
            AM Harvest
          </Heading>
          <Text position="absolute" top="0" right="3">
            <Icon as={FaPencil} boxSize={3.5} color="fg.muted" />
          </Text>
          {/* if isAMHarvest is true show the AM harvest data else show the plus icon */}
          {isAMHarvest ? (
            <Flex
              flex="1" // flex 1 to make the flex item take up the full height of the container
              direction="column"
              justify="center"
              align="center"
              mt="-11px"
            >
              <HStack justify="center" gap="2" mb={2}>
                <Text fontSize="3xl" fontWeight="bold" lineHeight="1">
                  12
                </Text>
                <Icon as={FaEgg} boxSize={5} color="orange.400" />
              </HStack>
              <Text color="fg.muted" fontWeight="medium">
                8:00 AM
              </Text>
            </Flex>
          ) : (
            <Flex flex="1" justifyContent="center" alignItems="center">
              <Icon as={FaPlus} boxSize={8} color="fg.muted" />
            </Flex>
          )}
        </Box>
        {/* PM Harvest Box */}
        <Box
          textAlign="center"
          border="1px solid"
          borderColor="border.muted"
          borderRadius="xl"
          bg="bg.panel"
          p={5}
          w="full"
          minW={{ base: "auto", md: "220px" }}
          minH={{ base: "150px", md: "160px" }}
          flex="1" // flex 1 to make the flex item take up the full height of the container
          display="flex"
          flexDirection="column"
          shadow="xs"
          transition="all 0.2s ease"
          _hover={{ shadow: "sm", borderColor: "border.subtle" }}
          position="relative"
        >
          {/* if isPMHarvest is true show the PM harvest data else show the plus icon */}
          {isPMHarvest ? (
            <Flex
              flex="1" // flex 1 to make the flex item take up the full height of the container
              direction="column"
              justify="center"
              align="center"
              mt="-11px"
            >
              <Heading size="md" fontWeight="semibold" mb={3}>
                PM Harvest
              </Heading>
              <Text position="absolute" top="0" right="3">
                <Icon as={FaPencil} boxSize={3.5} color="fg.muted" />
              </Text>
              <HStack justify="center" gap="2" mb={2}>
                <Text fontSize="3xl" fontWeight="bold" lineHeight="1">
                  22
                </Text>
                <Icon as={FaEgg} boxSize={5} color="orange.400" />
              </HStack>
              <Text color="fg.muted" fontWeight="medium">
                4:00 PM
              </Text>
            </Flex>
          ) : (
            <Flex flex="1" justifyContent="center" alignItems="center">
              <Icon as={FaPlus} boxSize={8} color="fg.muted" />
            </Flex>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default HarvestTodayDashboard;
