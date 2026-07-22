import { Box, Presence, Text } from "@chakra-ui/react";
interface HarvestModalStep1Props {
  step: number;
  direction: "forward" | "back";
}
export function HarvestModalStep1({ step, direction }: HarvestModalStep1Props) {
  return (
    <Presence
      present={step === 1}
      unmountOnExit // Unmount the component when the step is not 1
      skipAnimationOnMount // Skip the animation when the component is mounted
      animationDuration="moderate"
      animationName={{
        _open: "slide-from-left, fade-in", // Open the component with a slide from the left and fade in animation
        _closed:
          direction === "back"
            ? "slide-to-right, fade-out" // Close the component with a slide to the right and fade out animation
            : "slide-to-left, fade-out",
      }}
      position="absolute"
      inset="0"
    >
      <Box>
        <Text>Did you harvest today?</Text>
      </Box>
    </Presence>
  );
}
export default HarvestModalStep1;
