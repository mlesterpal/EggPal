import {
  Box,
  Button,
  Drawer,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

interface AdminSidebarProps {
  isCollapsed: boolean;
  isMobileDrawerOpen: boolean;
  onMobileDrawerOpenChange: (isOpen: boolean) => void;
  onNavigate: () => void;
}

interface NavItem {
  label: string;
  to: string;
}

// Map the route to the label
const navItems: NavItem[] = [
  { label: "Dashboard", to: "/admin" },
  { label: "Settings", to: "/admin/settings" },
];

interface SidebarNavContentProps {
  isCollapsed: boolean;
  onNavigate: () => void;
}

// Sidebar navigation content
function SidebarNavContent({
  isCollapsed,
  onNavigate,
}: SidebarNavContentProps) {
  const location = useLocation();

  return (
    <Stack gap={1} align="stretch">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to; // Check if the current path matches the item's to

        return (
          <Button
            key={item.to}
            asChild
            variant={isActive ? "subtle" : "ghost"}
            justifyContent={isCollapsed ? "center" : "flex-start"}
            px={isCollapsed ? 2 : 3}
            onClick={onNavigate}
            title={isCollapsed ? item.label : undefined}
          >
            <NavLink to={item.to}>
              {isCollapsed ? item.label.charAt(0) : item.label} // If collapsed,
              show only the first character of the label
            </NavLink>
          </Button>
        );
      })}
    </Stack>
  );
}

// Admin sidebar component
export function AdminSidebar({
  isCollapsed,
  isMobileDrawerOpen,
  onMobileDrawerOpenChange,
  onNavigate,
}: AdminSidebarProps) {
  return (
    <>
      <Flex
        display={{ base: "none", md: "flex" }} // Hide on mobile, show on medium screens and larger
        direction="column"
        w={isCollapsed ? "16" : "60"} // If collapsed, set the width to 16, otherwise set it to 60
        flexShrink={0}
        overflow="hidden"
        borderRightWidth="1px"
        borderColor="border"
        bg="bg.subtle"
        transition="width 0.2s ease" // Smooth transition for the width
      >
        <Flex
          align="center"
          justify={isCollapsed ? "center" : "flex-start"}
          p={4}
        >
          <Heading size="md">{isCollapsed ? "EP" : "EggPal"}</Heading>
        </Flex>

        <Box px={2} py={2} flex="1">
          <SidebarNavContent
            isCollapsed={isCollapsed}
            onNavigate={onNavigate}
          />
        </Box>
      </Flex>

      <Drawer.Root
        open={isMobileDrawerOpen} // Open the mobile drawer if it is open
        onOpenChange={(details) => onMobileDrawerOpenChange(details.open)} // When the mobile drawer is opened or closed, update the state
        placement="start"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                <Text fontWeight="bold">EggPal</Text>
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <SidebarNavContent isCollapsed={false} onNavigate={onNavigate} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}
