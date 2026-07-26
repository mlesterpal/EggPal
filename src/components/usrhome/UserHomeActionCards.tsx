import {
  Box,
  Button,
  Card,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaEgg, FaMoneyBillTrendUp, FaReceipt } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type UserAction = {
  id: "harvest" | "sales" | "expenses";
  title: string;
  description: string;
  icon: React.ElementType; // React.ElementType is a type that is used to create a React component
  accentColor: string;
  iconColor: string;
  iconBg: string;
  statusText: string;
};

const userActions: UserAction[] = [
  {
    id: "harvest",
    title: "Log Harvest",
    description: "Record fresh eggs gathered by size.",
    icon: FaEgg,
    accentColor: "orange.300",
    iconColor: "orange.600",
    iconBg: "orange.100",
    statusText: "Tap to start",
  },
  {
    id: "sales",
    title: "Log Sales",
    description: "Track sold eggs and total farm revenue.",
    icon: FaMoneyBillTrendUp,
    accentColor: "green.300",
    iconColor: "green.600",
    iconBg: "green.100",
    statusText: "Coming soon",
  },
  {
    id: "expenses",
    title: "Log Expenses",
    description: "Monitor feed, supplies, and farm costs.",
    icon: FaReceipt,
    accentColor: "yellow.400",
    iconColor: "yellow.700",
    iconBg: "yellow.100",
    statusText: "Coming soon",
  },
];

const UserHomeActionCards = () => {
  const navigate = useNavigate();

  const onActionTap = (actionId: UserAction["id"]) => {
    if (actionId === "harvest") {
      navigate("/log-harvest");
    }
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
      {userActions.map((action) => (
        <Card.Root
          key={action.id}
          borderWidth="1px"
          borderColor="border.muted"
          bg="bg.panel"
          borderRadius="xl"
          shadow="xs"
          transition="all 0.2s ease"
          _hover={{
            shadow: "sm",
            borderColor: action.accentColor,
            transform: "translateY(-1px)", // move the card up by 1px when the user hovers over it
          }}
        >
          <Card.Body p={4}>
            <Button
              variant="ghost"
              h="auto"
              py={2}
              px={1}
              textAlign="left"
              justifyContent="flex-start"
              w="full"
              minH="120px"
              aria-label={action.title}
              rounded="lg"
              _hover={{ bg: "blackAlpha.50" }}
              _active={{ bg: "blackAlpha.100" }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: action.accentColor,
              }}
              onClick={() => onActionTap(action.id)} // id value example: "harvest","sales","expenses"
            >
              <HStack align="start" gap={3} w="full">
                <Box
                  mt={0.5}
                  w="11"
                  h="11"
                  rounded="full"
                  bg={action.iconBg}
                  display="grid"
                  placeItems="center"
                  flexShrink={0}
                >
                  <Icon as={action.icon} boxSize={5} color={action.iconColor} />
                </Box>
                <Stack gap={1}>
                  <Text fontWeight="semibold" fontSize="lg">
                    {action.title}
                  </Text>
                  <Text fontSize="sm" color="fg.muted">
                    {action.description}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={action.iconColor}
                    fontWeight="medium"
                  >
                    {action.statusText}
                  </Text>
                </Stack>
              </HStack>
            </Button>
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
};

export default UserHomeActionCards;
