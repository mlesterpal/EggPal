import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { LuMenu, LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

interface AdminTopNavProps {
  isMobile: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobileMenu: () => void;
}

// Map the route to the title
const routeTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/settings": "Settings",
};

export function AdminTopNav({
  isMobile,
  isCollapsed,
  onToggleCollapse,
  onOpenMobileMenu,
}: AdminTopNavProps) {
  const location = useLocation();
  const title = routeTitles[location.pathname] ?? "Admin";

  return (
    <Flex
      align="center"
      justify="space-between"
      px={4}
      py={3}
      borderBottomWidth="1px"
      borderColor="border"
      bg="bg"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex align="center" gap={3}>
        <IconButton
          aria-label={
            isMobile
              ? "Open menu"
              : isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
          }
          variant="ghost"
          size="sm"
          onClick={isMobile ? onOpenMobileMenu : onToggleCollapse} // If mobile, open the mobile menu, otherwise toggle the collapse
        >
          {isMobile ? (
            <LuMenu />
          ) : isCollapsed ? (
            <LuPanelLeftOpen />
          ) : (
            <LuPanelLeftClose />
          )}
        </IconButton>
        <Heading size="md">{title}</Heading>
      </Flex>
      <Text color="fg.muted" fontSize="sm" fontWeight="medium">
        Admin
      </Text>
    </Flex>
  );
}
