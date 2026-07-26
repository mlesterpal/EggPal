import { Box, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { FaEgg, FaSun } from "react-icons/fa6";
import UserHomeActionCards from "../components/usrhome/UserHomeActionCards";

const UserHomePage = () => {
  return (
    <Box
      minH="100dvh"
      position="relative"
      overflow="hidden"
      bg="linear-gradient(180deg, #fff6dc 0%,rgb(244, 255, 222) 52%,rgb(243, 255, 255) 100%)"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 8 }}
      _before={{
        content: '""',
        position: "absolute",
        top: "-140px",
        right: "-80px",
        width: "320px",
        height: "320px",
        borderRadius: "full",
        bg: "orange.200",
        opacity: 0.2,
        filter: "blur(70px)",
        pointerEvents: "none",
      }}
      _after={{
        content: '""',
        position: "absolute",
        bottom: "-160px",
        left: "-100px",
        width: "360px",
        height: "360px",
        borderRadius: "full",
        bg: "green.200",
        opacity: 0.22,
        filter: "blur(75px)",
        pointerEvents: "none",
      }}
    >
      <VStack
        maxW="960px"
        mx="auto"
        align="stretch"
        gap={6}
        position="relative"
        zIndex={1}
      >
        {/* Welcome to EggPal */}
        <Box
          borderWidth="1px"
          borderColor="orange.100"
          bg="bg.panel"
          borderRadius="2xl"
          p={{ base: 4, md: 6 }}
          shadow="xs"
        >
          <HStack justify="space-between" align="start" gap={4}>
            <Stack gap={2}>
              <HStack gap={2} color="orange.700">
                <Text fontSize="sm" fontWeight="medium">
                  Good day
                </Text>
                <Icon as={FaSun} boxSize={3.5} />
              </HStack>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                lineHeight="1.1"
                fontFamily="'DM Serif Display', Georgia, serif"
                letterSpacing="0"
              >
                Welcome to EggPal
              </Text>
            </Stack>
            <Box
              display={{ base: "grid", sm: "grid" }}
              placeItems="center"
              w="14"
              h="14"
              rounded="full"
              bg="yellow.100"
              color="orange.500"
              flexShrink={0}
            >
              <Icon as={FaEgg} boxSize={6} />
            </Box>
          </HStack>
        </Box>
        {/* Action Cards */}
        <UserHomeActionCards />
      </VStack>
    </Box>
  );
};

export default UserHomePage;
