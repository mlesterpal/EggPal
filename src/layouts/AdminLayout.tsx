import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/admin/AdminLayout/AdminSidebar";
import { AdminTopNav } from "../components/admin/AdminLayout/AdminTopNav";

export function AdminLayout() {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false; // Whether the screen is mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // Whether the sidebar is collapsed
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false); // Whether the mobile drawer is open

  // When the screen size changes, set the collapsed state and mobile drawer open state
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
      setIsMobileDrawerOpen(false);
      return;
    }

    setIsMobileDrawerOpen(false);
  }, [isMobile]);

  return (
    <Flex h="100dvh" overflow="hidden" bg="bg">
      <AdminSidebar
        isCollapsed={isCollapsed}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onMobileDrawerOpenChange={setIsMobileDrawerOpen}
        onNavigate={() => setIsMobileDrawerOpen(false)} // When navigating, close the mobile drawer
      />

      <Flex flex="1" direction="column" minW={0}>
        <AdminTopNav
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
          onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        />
        <Box as="main" flex="1" overflowY="auto" p={{ base: 4, md: 6 }}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
