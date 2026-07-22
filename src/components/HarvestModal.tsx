import { Box, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";
import HarvestModalStep1 from "./HarvestModalStep1";
import HarvestModalStep2 from "./HarvestModalStep2";

// Define the egg size options
const eggSizeOptions = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
] as const;

// Define the egg size key type
type EggSizeKey = (typeof eggSizeOptions)[number]["key"];
// Define the egg counts type
type EggCounts = Record<EggSizeKey, string>;

// Initialize the egg counts per size to an empty string
const emptyEggCounts: EggCounts = {
  small: "",
  medium: "",
  large: "",
};

const HarvestModal = () => {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [eggCounts, setEggCounts] = useState<EggCounts>(emptyEggCounts); // Record<"small" | "medium" | "large", string>

  // Reset the wizard to the first step
  const resetWizard = () => {
    setStep(1);
    setDirection("forward");
    setEggCounts(emptyEggCounts);
  };

  const handleOpenChange = (details: { open: boolean }) => {
    setOpen(details.open);
  };

  // Handle the forward step
  const handleStepForward = () => {
    setDirection("forward");
    setStep(2);
  };

  // Handle the back step
  const handleStepBack = () => {
    setDirection("back");
    setStep(1);
  };

  // Handle the count change
  const handleCountChange = (size: EggSizeKey, value: string) => {
    setEggCounts((prev) => ({ ...prev, [size]: value })); // Update the egg counts per size
  };

  // Parse the egg counts per size
  const parsedEggCounts = eggSizeOptions.reduce(
    (acc, { key }) => {
      const value = Number(eggCounts[key]); // get the value of the egg counts per size and convert it to a number
      acc[key] = Number.isFinite(value) && value > 0 ? value : 0; // If the value is not a number or is less than 0, set it to 0 then add it to the accumulator
      return acc;
    },
    { small: 0, medium: 0, large: 0 } as Record<EggSizeKey, number>, // Initialize the egg counts per size to 0
  );

  // Calculate the total number of eggs
  const totalEggs = Object.values(parsedEggCounts).reduce(
    (sum, value) => sum + value,
    0,
  );

  // Check if the total number of eggs is greater than 0
  const canSave = totalEggs > 0;

  // Handle the save button
  const handleSave = () => {
    if (!canSave) return;
    console.log("Harvest eggs saved:", {
      // Log the egg counts per size and the total number of eggs
      ...parsedEggCounts,
      total: totalEggs,
    });
    setOpen(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
      onExitComplete={resetWizard}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" display="none">
          Harvest
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={{ base: 4, md: 0 }}>
          {/* Set the width and maximum width for the dialog content */}
          <Dialog.Content w="full" maxW={{ base: "sm", md: "md" }}>
            <Dialog.Header>
              <Dialog.Title>Harvest</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box
                position="relative"
                overflow="hidden"
                minH={{ base: "252px", md: "236px" }} // Set the minimum height for the box
              >
                {/* Show the first step */}
                <HarvestModalStep1 step={step} direction={direction} />{" "}
                {/* Show the second step */}
                <HarvestModalStep2
                  step={step}
                  direction={direction}
                  eggSizeOptions={eggSizeOptions}
                  eggCounts={eggCounts}
                  onCountChange={handleCountChange}
                  totalEggs={totalEggs}
                />
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              {step === 1 ? ( // If the step is 1, show the no and yes buttons
                <>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">No</Button>
                  </Dialog.ActionTrigger>
                  <Button onClick={handleStepForward}>Yes</Button>
                </>
              ) : (
                // If the step is 2, show the back and save buttons
                <>
                  <Button variant="outline" onClick={handleStepBack}>
                    Back
                  </Button>
                  <Button onClick={handleSave} disabled={!canSave}>
                    Save
                  </Button>
                </>
              )}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default HarvestModal;
